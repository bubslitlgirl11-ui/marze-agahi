import '@testing-library/jest-dom'

// Mock Web Crypto if needed in older environments
if (!globalThis.crypto) {
  // @ts-ignore
  globalThis.crypto = require('crypto').webcrypto
}
