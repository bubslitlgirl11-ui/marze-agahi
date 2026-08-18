import { describe, it, expect } from 'vitest'
import { encryptPII, decryptPII, maskPII } from '@/lib/crypto/pii'

describe('Web Crypto AES-256-GCM PII Encryption', () => {
  it('encrypts and decrypts string correctly with versioned format', async () => {
    const plain = 'ali.rezaei@example.com'
    const encrypted = await encryptPII(plain)

    expect(encrypted).toMatch(/^v1:[0-9a-f]{24}:[0-9a-f]+$/)
    expect(encrypted).not.toContain(plain)

    const decrypted = await decryptPII(encrypted)
    expect(decrypted).toBe(plain)
  })

  it('generates unique ciphertexts and IVs for identical plaintexts', async () => {
    const plain = '09121234567'
    const enc1 = await encryptPII(plain)
    const enc2 = await encryptPII(plain)

    expect(enc1).not.toBe(enc2) // Different random 96-bit IV
    expect(await decryptPII(enc1)).toBe(plain)
    expect(await decryptPII(enc2)).toBe(plain)
  })

  it('fails safely on corrupted ciphertext without throwing raw content', async () => {
    const plain = 'sensitive data'
    const encrypted = await encryptPII(plain)
    const corrupted = encrypted.slice(0, -4) + 'abcd'

    await expect(decryptPII(corrupted)).rejects.toThrow(/Decryption failed/i)
  })

  it('masks email and phone for preview', () => {
    expect(maskPII('user@example.com')).toBe('u***r@example.com')
    expect(maskPII('09123456789')).toBe('091****89')
  })
})
