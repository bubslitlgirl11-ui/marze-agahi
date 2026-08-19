import { describe, it, expect } from 'vitest'
import {
  getAllOrganizations,
  getFeaturedOrganizations,
  getOrganizationBySlug,
  ORGANIZATIONS,
} from '@/data/organizations'

describe('Organizations & Research Links Repository', () => {
  it('loads all organizations with mandatory fields', () => {
    const orgs = getAllOrganizations()
    expect(orgs.length).toBeGreaterThanOrEqual(6)

    for (const org of orgs) {
      expect(org.id).toBeDefined()
      expect(org.name).toBeTruthy()
      expect(org.nameFa).toBeTruthy()
      expect(org.country).toBeTruthy()
      expect(org.countryFa).toBeTruthy()
      expect(org.websiteUrl.startsWith('http')).toBe(true)
      expect(org.foundedYear).toBeGreaterThan(1900)
      expect(org.founders.length).toBeGreaterThan(0)

      for (const founder of org.founders) {
        expect(founder.name).toBeTruthy()
        expect(founder.nameFa).toBeTruthy()
        expect(founder.roleFa).toBeTruthy()
        expect(founder.bioFa).toBeTruthy()
        expect(founder.image.startsWith('/images/')).toBe(true)
      }
    }
  })

  it('includes key international organizations: IANDS (USA) and Netzwerk NDE (Germany)', () => {
    const iands = getOrganizationBySlug('iands-usa')
    expect(iands).toBeDefined()
    expect(iands?.nameFa).toContain('انجمن بین‌المللی مطالعات نزدیک به مرگ')
    expect(iands?.country).toBe('United States')
    expect(iands?.founders[0].nameFa).toContain('دکتر ریموند مودی')

    const netzwerk = getOrganizationBySlug('netzwerk-nde-germany')
    expect(netzwerk).toBeDefined()
    expect(netzwerk?.nameFa).toContain('آلمان')
    expect(netzwerk?.country).toBe('Germany')
    expect(netzwerk?.founders[0].nameFa).toContain('والتر ون لاک')
  })

  it('includes data archives and clinical research: NDERF and Horizon Research', () => {
    const nderf = getOrganizationBySlug('nderf-usa')
    expect(nderf).toBeDefined()
    expect(nderf?.category).toBe('archive_database')
    expect(nderf?.founders[0].nameFa).toContain('جفری لانگ')

    const horizon = getOrganizationBySlug('horizon-research-foundation')
    expect(horizon).toBeDefined()
    expect(horizon?.founders[0].nameFa).toContain('سام پرنیا')
  })

  it('filters featured organizations accurately', () => {
    const featured = getFeaturedOrganizations()
    expect(featured.length).toBeGreaterThan(0)
    expect(featured.every((org) => org.isFeatured)).toBe(true)
  })
})
