import { describe, it, expect } from 'vitest'
import { isSuperAdmin, isEditorOrAbove, isReviewerOrAbove, canRevealPIICapability } from '@/lib/access'

describe('Role & Capability Access Controls', () => {
  const superAdminUser = { id: '1', role: 'superAdmin' as const, status: 'active' as const }
  const editorUser = { id: '2', role: 'editor' as const, status: 'active' as const }
  const reviewerUser = { id: '3', role: 'reviewer' as const, status: 'active' as const }
  const researcherUser = { id: '4', role: 'researcher' as const, status: 'active' as const }
  const suspendedAdmin = { id: '5', role: 'superAdmin' as const, status: 'suspended' as const }

  it('verifies superAdmin access', () => {
    expect((isSuperAdmin as any)({ req: { user: superAdminUser } })).toBe(true)
    expect((isSuperAdmin as any)({ req: { user: editorUser } })).toBe(false)
    expect((isSuperAdmin as any)({ req: { user: suspendedAdmin } })).toBe(false)
  })

  it('verifies editor and above access', () => {
    expect((isEditorOrAbove as any)({ req: { user: superAdminUser } })).toBe(true)
    expect((isEditorOrAbove as any)({ req: { user: editorUser } })).toBe(true)
    expect((isEditorOrAbove as any)({ req: { user: reviewerUser } })).toBe(false)
    expect((isEditorOrAbove as any)({ req: { user: researcherUser } })).toBe(false)
  })

  it('verifies reviewer and above access', () => {
    expect((isReviewerOrAbove as any)({ req: { user: reviewerUser } })).toBe(true)
    expect((isReviewerOrAbove as any)({ req: { user: editorUser } })).toBe(true)
    expect((isReviewerOrAbove as any)({ req: { user: researcherUser } })).toBe(false)
  })

  it('verifies canRevealPIICapability', () => {
    expect(canRevealPIICapability(superAdminUser)).toBe(true)
    expect(canRevealPIICapability(editorUser)).toBe(false)
    expect(
      canRevealPIICapability({
        id: '6',
        role: 'editor',
        capabilities: { canRevealPII: true },
        status: 'active',
      })
    ).toBe(true)
  })
})
