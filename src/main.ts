window.process = window.process ?? {env: {}}

console.log("hello", window.ethereum)

import { ethereum } from './metamaskInPage'

console.log("in page: ", ethereum)

export { }

declare global {
  interface Window {
    ethereum: unknown
  }
}