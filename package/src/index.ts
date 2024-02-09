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

    //@ts-expect-error
    const ethereum = window.ethereum

    // Workaround if MetaMask is not installed
    if(ethereum){
      const timeOut = new Promise((resolve) => {
        setTimeout(resolve, 1000);
      })

      const isInstalled = await Promise.race([
        timeOut, 
        // MetaMask always return the chainId even when the wallet is locked - unstable
        ethereum.request({ method: 'eth_chainId' })
      ])
      if(!isInstalled){
        //@ts-expect-error
        window.ethereum = undefined
      }
    }
  }
})()

