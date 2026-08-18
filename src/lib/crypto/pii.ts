/**
 * Web Crypto AES-256-GCM PII Encryption Service
 * Implements envelope encryption with independent 96-bit (12-byte) IV per value.
 * Stored format: v1:<iv_hex>:<ciphertext_hex>
 */

const ALGORITHM = 'AES-GCM'
const IV_LENGTH = 12 // 96 bits for AES-GCM
const VERSION_PREFIX = 'v1'

function getEncryptionKeyHex(): string {
  const key = process.env.PII_ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef'
  if (!key || key.length < 64) {
    throw new Error('PII_ENCRYPTION_KEY must be at least 64 hex characters (256 bits)')
  }
  return key.slice(0, 64)
}

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string')
  }
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }
  return bytes
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function importCryptoKey(): Promise<CryptoKey> {
  const keyHex = getEncryptionKeyHex()
  const keyBytes = hexToBytes(keyHex)
  return await crypto.subtle.importKey('raw', keyBytes as unknown as BufferSource, { name: ALGORITHM }, false, [
    'encrypt',
    'decrypt',
  ])
}

/**
 * Encrypt sensitive plain text into versioned ciphertext.
 */
export async function encryptPII(plainText: string): Promise<string> {
  if (!plainText || typeof plainText !== 'string') {
    return ''
  }

  const key = await importCryptoKey()
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))
  const encoder = new TextEncoder()
  const data = encoder.encode(plainText)

  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: ALGORITHM,
      iv: iv as unknown as BufferSource,
    },
    key,
    data
  )

  const ciphertextHex = bytesToHex(new Uint8Array(encryptedBuffer))
  const ivHex = bytesToHex(iv)

  return `${VERSION_PREFIX}:${ivHex}:${ciphertextHex}`
}

/**
 * Decrypt versioned ciphertext back to plain text.
 */
export async function decryptPII(encryptedPayload: string): Promise<string> {
  if (!encryptedPayload || typeof encryptedPayload !== 'string') {
    return ''
  }

  const parts = encryptedPayload.split(':')
  if (parts.length !== 3 || parts[0] !== VERSION_PREFIX) {
    throw new Error('Invalid encrypted payload format')
  }

  const [, ivHex, ciphertextHex] = parts
  const iv = hexToBytes(ivHex)
  const ciphertext = hexToBytes(ciphertextHex)
  const key = await importCryptoKey()

  try {
    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: iv as unknown as BufferSource,
      },
      key,
      ciphertext as unknown as BufferSource
    )

    const decoder = new TextDecoder()
    return decoder.decode(decryptedBuffer)
  } catch {
    throw new Error('Decryption failed: corrupted data or invalid key')
  }
}

/**
 * Mask PII string for secure admin preview (e.g. j***@example.com or 0912***4567)
 */
export function maskPII(text: string): string {
  if (!text) return ''
  if (text.includes('@')) {
    const [local, domain] = text.split('@')
    if (local.length <= 2) {
      return `${local.charAt(0)}***@${domain}`
    }
    return `${local.charAt(0)}***${local.charAt(local.length - 1)}@${domain}`
  }
  if (text.length <= 4) {
    return '****'
  }
  const start = text.slice(0, 3)
  const end = text.slice(-2)
  return `${start}****${end}`
}
