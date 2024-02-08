import { WindowPostMessageStream } from '@metamask/post-message-stream';
import { initializeProvider } from '@metamask/providers'

// MetaMask injection hack
// Due to https://github.com/MetaMask/metamask-extension/issues/3133

(() => {
  if (window.ethereum) {
    return;
  }
  if (navigator.userAgent.includes('Firefox')) {
    // setup background connection
    const metamaskStream = new WindowPostMessageStream({
      name: 'metamask-inpage',
      target: 'metamask-contentscript'
    });

    // this will initialize the provider and set it as window.ethereum
    initializeProvider({
      connectionStream: metamaskStream,
      shouldShimWeb3: true
    });
  }
})();

declare global {
  interface Window {
    ethereum: unknown
  }
}