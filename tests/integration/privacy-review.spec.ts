import { describe, it, expect } from 'vitest'
import { publishedOnlyAccess, canRevealPIICapability } from '@/lib/access'

describe('Integration: Privacy Review & Access Enforcement', () => {
  it('enforces published-only visibility for public readers while allowing editors full review', () => {
    // Public user (no auth)
    const publicQuery = (publishedOnlyAccess as any)({ req: { user: null } })
    expect(publicQuery).toEqual({
      editorialStage: {
        equals: 'published',
      },
    })

    // Staff user (authenticated)
    const editorQuery = (publishedOnlyAccess as any)({
      req: {
        user: { id: 'ed-1', role: 'editor', status: 'active' },
      },
    })
    expect(editorQuery).toBe(true)
  })

  it('restricts PII reveal capability strictly to authorized personnel', () => {
    const reviewerWithoutCap = {
      id: 'rev-1',
      role: 'reviewer' as const,
      status: 'active' as const,
      capabilities: { canRevealPII: false },
    }
    const reviewerWithCap = {
      id: 'rev-2',
      role: 'reviewer' as const,
      status: 'active' as const,
      capabilities: { canRevealPII: true },
    }
    const superAdmin = {
      id: 'admin-1',
      role: 'superAdmin' as const,
      status: 'active' as const,
    }

    expect(canRevealPIICapability(reviewerWithoutCap)).toBe(false)
    expect(canRevealPIICapability(reviewerWithCap)).toBe(true)
    expect(canRevealPIICapability(superAdmin)).toBe(true)
  })
})
