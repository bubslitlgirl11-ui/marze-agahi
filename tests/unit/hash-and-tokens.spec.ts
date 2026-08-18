import { describe, it, expect } from 'vitest'
import { generateCaseCode, generateWithdrawalToken, hashIp, sha256 } from '@/lib/crypto/hash'

describe('Cryptographic Hashes & Token Generation', () => {
  it('generates unique case code matching NDE-YYYY-XXXXXX', () => {
    const code1 = generateCaseCode()
    const code2 = generateCaseCode()
    const year = new Date().getFullYear()

    expect(code1).toMatch(new RegExp(`^NDE-${year}-[0-9A-F]{6}$`))
    expect(code2).toMatch(new RegExp(`^NDE-${year}-[0-9A-F]{6}$`))
    expect(code1).not.toBe(code2)
  })

  it('generates high entropy withdrawal token', () => {
    const token1 = generateWithdrawalToken()
    const token2 = generateWithdrawalToken()

    expect(token1.length).toBe(48) // 24 bytes in hex
    expect(token1).not.toBe(token2)
  })

  it('hashes IP address with salt and protects original IP', async () => {
    const ip = '192.168.1.100'
    const hashed = await hashIp(ip)

    expect(hashed).toMatch(/^[0-9a-f]{64}$/)
    expect(hashed).not.toContain(ip)
  })

  it('computes deterministic SHA-256 hash', async () => {
    const hash1 = await sha256('hello-world')
    const hash2 = await sha256('hello-world')
    expect(hash1).toBe('afa27b44d43b02a9fea41d13cedc2e4016cfcf87c5dbf990e593669aa8ce286d')
    expect(hash1).toBe(hash2)
  })
})
