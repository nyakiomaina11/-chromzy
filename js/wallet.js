/**
 * CHROMZY - Solana wallet adapter
 * Supports Phantom, Solflare, Backpack (Wallet Standard).
 * Set DEMO_MODE true to simulate without extension.
 */

const WALLET_STATE = {
  connected: false,
  address: null,
  provider: null,
  providerName: null,
};

/** Set false for production wallet extensions */
export const DEMO_MODE = false;

const PROVIDER_DEFS = [
  {
    id: "phantom",
    label: "Phantom",
    detect: () => window.phantom?.solana,
    getWallet: () => window.phantom?.solana,
    installUrl: "https://phantom.app/download",
  },
  {
    id: "solflare",
    label: "Solflare",
    detect: () => window.solflare?.isSolflare && window.solflare,
    getWallet: () => window.solflare,
    installUrl: "https://solflare.com/download",
  },
  {
    id: "backpack",
    label: "Backpack",
    detect: () => window.backpack?.solana,
    getWallet: () => window.backpack?.solana,
    installUrl: "https://backpack.app/download",
  },
];

export function getWalletState() {
  return { ...WALLET_STATE };
}

export function initWalletUI() {
  document.querySelectorAll("[data-wallet-connect]").forEach((btn) => {
    if (!btn.dataset.walletBound) {
      btn.dataset.walletBound = "1";
      btn.addEventListener("click", handleConnectClick);
    }
    updateButton(btn);
  });

  document.addEventListener("wallet:connect", onWalletStateChange);
  document.addEventListener("wallet:disconnect", onWalletStateChange);

  if (!DEMO_MODE) {
    tryAutoReconnect();
  }
}

function getAvailableProviders() {
  return PROVIDER_DEFS.filter((p) => p.detect());
}

async function handleConnectClick() {
  if (WALLET_STATE.connected) {
    await disconnectWallet();
    return;
  }

  if (DEMO_MODE) {
    onWalletConnected("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", "demo");
    showToast("Demo wallet connected.");
    return;
  }

  const available = getAvailableProviders();

  if (available.length === 0) {
    openWalletInstallModal();
    return;
  }

  if (available.length === 1) {
    await connectProvider(available[0]);
    return;
  }

  openWalletPicker(available);
}

async function connectProvider(def) {
  const wallet = def.getWallet();
  if (!wallet) {
    showToast(`${def.label} not found. Install the extension.`);
    return;
  }

  setWalletButtonsLoading(true);

  try {
    const resp = await wallet.connect({ onlyIfTrusted: false });
    const pubkey = resp?.publicKey?.toString?.() ?? wallet.publicKey?.toString?.();

    if (!pubkey) throw new Error("No public key returned");

    bindProviderEvents(wallet, def.id);
    onWalletConnected(pubkey, def.id);
    showToast(`Connected via ${def.label}`);
  } catch (err) {
    const msg = err?.message || String(err);
    if (msg.includes("User rejected") || err?.code === 4001) {
      showToast("Connection cancelled.");
    } else {
      showToast(`Wallet error: ${msg}`);
    }
  } finally {
    setWalletButtonsLoading(false);
    closeWalletPicker();
  }
}

function bindProviderEvents(wallet, name) {
  if (wallet._chromzyBound) return;
  wallet._chromzyBound = true;

  wallet.on?.("disconnect", () => {
    resetWalletState();
    showToast("Wallet disconnected.");
  });

  wallet.on?.("accountChanged", (key) => {
    if (!key) {
      resetWalletState();
      return;
    }
    const addr = key.toString?.() ?? String(key);
    onWalletConnected(addr, name);
  });
}

async function tryAutoReconnect() {
  for (const def of getAvailableProviders()) {
    const wallet = def.getWallet();
    if (!wallet?.isConnected && !wallet?.publicKey) continue;

    try {
      if (!wallet.isConnected) {
        await wallet.connect({ onlyIfTrusted: true });
      }
      const pubkey = wallet.publicKey?.toString?.();
      if (pubkey) {
        bindProviderEvents(wallet, def.id);
        onWalletConnected(pubkey, def.id);
        return;
      }
    } catch {
      /* not trusted yet */
    }
  }
}

async function disconnectWallet() {
  if (DEMO_MODE) {
    resetWalletState();
    showToast("Wallet disconnected.");
    return;
  }

  try {
    await WALLET_STATE.provider?.disconnect?.();
  } catch {
    /* extension may already be disconnected */
  }
  resetWalletState();
  showToast("Wallet disconnected.");
}

function resetWalletState() {
  WALLET_STATE.connected = false;
  WALLET_STATE.address = null;
  WALLET_STATE.provider = null;
  WALLET_STATE.providerName = null;
  document.querySelectorAll("[data-wallet-connect]").forEach(updateButton);
  document.dispatchEvent(new CustomEvent("wallet:disconnect"));
}

export function onWalletConnected(address, providerName = "unknown") {
  const def = PROVIDER_DEFS.find((p) => p.id === providerName);
  WALLET_STATE.connected = true;
  WALLET_STATE.address = address;
  WALLET_STATE.providerName = providerName;
  WALLET_STATE.provider = def?.getWallet?.() ?? null;

  document.querySelectorAll("[data-wallet-connect]").forEach(updateButton);
  document.dispatchEvent(
    new CustomEvent("wallet:connect", { detail: { address, provider: providerName } })
  );
}

function onWalletStateChange() {
  syncMintUI();
  syncTxSteps();
}

function updateButton(btn) {
  if (WALLET_STATE.connected && WALLET_STATE.address) {
    const label = PROVIDER_DEFS.find((p) => p.id === WALLET_STATE.providerName)?.label;
    btn.textContent = truncateAddress(WALLET_STATE.address);
    btn.classList.add("is-connected");
    btn.setAttribute("aria-label", `Connected${label ? ` via ${label}` : ""}: ${WALLET_STATE.address}`);
    if (btn.hasAttribute("data-mint-action") || btn.closest(".mint-card__actions")) {
      /* keep mint-specific labels on mint page */
    }
  } else {
    btn.textContent = btn.dataset.mintAction ? "Connect Wallet" : "Connect Wallet";
    btn.classList.remove("is-connected");
    btn.setAttribute("aria-label", "Connect wallet");
  }
}

function syncMintUI() {
  const mintBtn = document.querySelector("[data-mint-action]");
  if (!mintBtn) return;
  mintBtn.disabled = !WALLET_STATE.connected;
  mintBtn.textContent = WALLET_STATE.connected ? "Mint Plate" : "Connect wallet first";
}

function syncTxSteps() {
  const steps = document.querySelectorAll(".tx-step");
  if (!steps.length) return;
  steps.forEach((s) => s.classList.remove("is-active", "is-done"));
  steps[0]?.classList.add("is-done");
  if (!WALLET_STATE.connected) {
    steps[1]?.classList.add("is-active");
    return;
  }
  steps[1]?.classList.add("is-done");
  steps[2]?.classList.add("is-active");
}

function setWalletButtonsLoading(loading) {
  document.querySelectorAll("[data-wallet-connect]").forEach((btn) => {
    btn.disabled = loading;
    btn.classList.toggle("is-loading", loading);
  });
}

function truncateAddress(addr) {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

/* Wallet picker modal */
function ensureWalletModal() {
  let modal = document.querySelector(".wallet-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "wallet-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="wallet-modal__backdrop" data-wallet-close></div>
    <div class="wallet-modal__panel" role="dialog" aria-modal="true" aria-labelledby="wallet-modal-title">
      <button type="button" class="wallet-modal__close" data-wallet-close aria-label="Close">&times;</button>
      <h2 class="wallet-modal__title" id="wallet-modal-title">Connect wallet</h2>
      <p class="wallet-modal__sub">Choose a Solana wallet to continue.</p>
      <div class="wallet-modal__list" data-wallet-list></div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelectorAll("[data-wallet-close]").forEach((el) => {
    el.addEventListener("click", () => closeWalletPicker());
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeWalletPicker();
  });

  return modal;
}

function openWalletPicker(providers) {
  const modal = ensureWalletModal();
  const list = modal.querySelector("[data-wallet-list]");
  list.innerHTML = providers
    .map(
      (p) => `
    <button type="button" class="wallet-modal__option" data-wallet-pick="${p.id}">
      <span class="wallet-modal__option-label">${p.label}</span>
      <span class="wallet-modal__option-arrow">&#8594;</span>
    </button>`
    )
    .join("");

  list.querySelectorAll("[data-wallet-pick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const def = providers.find((p) => p.id === btn.dataset.walletPick);
      if (def) connectProvider(def);
    });
  });

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeWalletPicker() {
  const modal = document.querySelector(".wallet-modal");
  if (modal) {
    modal.hidden = true;
    document.body.style.overflow = "";
  }
}

function openWalletInstallModal() {
  const modal = ensureWalletModal();
  modal.querySelector("#wallet-modal-title").textContent = "Install a wallet";
  modal.querySelector(".wallet-modal__sub").textContent =
    "No Solana wallet detected. Install one to mint on CHROMZY.";

  const list = modal.querySelector("[data-wallet-list]");
  list.innerHTML = PROVIDER_DEFS.map(
    (p) => `
    <a href="${p.installUrl}" class="wallet-modal__option" target="_blank" rel="noopener noreferrer">
      <span class="wallet-modal__option-label">Get ${p.label}</span>
      <span class="wallet-modal__option-arrow">&#8594;</span>
    </a>`
  ).join("");

  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4500);
}

export { showToast };
