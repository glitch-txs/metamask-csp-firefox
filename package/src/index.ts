// MetaMask injection hack
// Due to https://github.com/MetaMask/metamask-extension/issues/3133
(async ()=>{
  if (
    typeof window !== 'undefined' && 
    //@ts-expect-error
    !window.ethereum && 
    navigator.userAgent.includes('Firefox')) {

    const { WindowPostMessageStream } = await import('@metamask/post-message-stream')
    const { initializeProvider } = await import('@metamask/providers')
    
    // setup background connection
    const connectionStream = new WindowPostMessageStream({
      name: 'metamask-inpage',
      target: 'metamask-contentscript'
    })
  
    // this will initialize the provider and set it as window.ethereum
    initializeProvider({ connectionStream })
  }
})()

