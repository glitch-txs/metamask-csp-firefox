import { WindowPostMessageStream } from '@metamask/post-message-stream'
import { initializeProvider } from '@metamask/providers'

// MetaMask injection hack
// Due to https://github.com/MetaMask/metamask-extension/issues/3133

if (
  typeof window !== 'undefined' && 
  //@ts-expect-error
  !window.ethereum && 
  navigator.userAgent.includes('Firefox')) {
  // setup background connection
  const connectionStream = new WindowPostMessageStream({
    name: 'metamask-inpage',
    target: 'metamask-contentscript'
  })

  // this will initialize the provider and set it as window.ethereum
  initializeProvider({ connectionStream })
}