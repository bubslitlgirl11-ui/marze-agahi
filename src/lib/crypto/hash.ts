/**
 * Cryptographic Hashing Utilities
 * Used for Salted IP hashes, Case Codes, and Withdrawal Token validation.
 */

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Generate SHA-256 hash of a string
 */
export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return bytesToHex(new Uint8Array(hashBuffer))
}

/**
 * Hash IP address with salt and daily rotation to protect user anonymity while allowing rate limiting
 */
export async function hashIp(ip: string): Promise<string> {
  const salt = process.env.IP_HASH_SALT || 'default_salt_change_in_production'
  // Rotate salt daily so IP hashes cannot be tracked across days
  const today = new Date().toISOString().slice(0, 10)
  return await sha256(`${ip}:${salt}:${today}`)
}

/**
 * Generate a cryptographically secure random case code in format NDE-YYYY-XXXXXX
 */
export function generateCaseCode(): string {
  const year = new Date().getFullYear()
  const randomBytes = crypto.getRandomValues(new Uint8Array(4))
  const hex = bytesToHex(randomBytes).toUpperCase().slice(0, 6)
  return `NDE-${year}-${hex}`
}

/**
 * Generate a single-use high-entropy withdrawal token
 */
export function generateWithdrawalToken(): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(24))
  return bytesToHex(randomBytes)
}
