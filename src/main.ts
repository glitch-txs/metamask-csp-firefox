console.log("hello", window.ethereum)

export { }

declare global {
  interface Window {
    ethereum: unknown
  }
}