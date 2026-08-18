/**
 * Access Control Helpers & Capability Enforcers
 * Implements RBAC (superAdmin, editor, reviewer, researcher) and field-level capabilities.
 */

import type { Access } from 'payload'

export type UserRole = 'superAdmin' | 'editor' | 'reviewer' | 'researcher'

export interface UserCapabilities {
  canRevealPII?: boolean
  canManageConsent?: boolean
  canPublish?: boolean
  canManageUsers?: boolean
  canExportSensitiveData?: boolean
}

export interface AuthenticatedUser {
  id: string
  role?: UserRole | string
  capabilities?: UserCapabilities
  status?: 'active' | 'suspended' | string
}

/**
 * Check if the user is a superAdmin
 */
export const isSuperAdmin: Access = ({ req: { user } }) => {
  const u = user as unknown as AuthenticatedUser | undefined
  return Boolean(u && u.status !== 'suspended' && u.role === 'superAdmin')
}

/**
 * Check if the user has editor or superAdmin access
 */
export const isEditorOrAbove: Access = ({ req: { user } }) => {
  const u = user as unknown as AuthenticatedUser | undefined
  if (!u || u.status === 'suspended') return false
  return u.role === 'superAdmin' || u.role === 'editor'
}

/**
 * Check if the user has reviewer or above access
 */
export const isReviewerOrAbove: Access = ({ req: { user } }) => {
  const u = user as unknown as AuthenticatedUser | undefined
  if (!u || u.status === 'suspended') return false
  return u.role === 'superAdmin' || u.role === 'editor' || u.role === 'reviewer'
}

/**
 * Check if the user is authenticated (any valid internal role)
 */
export const isAuthenticated: Access = ({ req: { user } }) => {
  const u = user as unknown as AuthenticatedUser | undefined
  return Boolean(u && u.status !== 'suspended')
}

/**
 * Public read access: Allows read only for published experiences
 */
export const publishedOnlyAccess: Access = ({ req: { user } }) => {
  const u = user as unknown as AuthenticatedUser | undefined
  if (u && u.status !== 'suspended') {
    return true
  }
  return {
    editorialStage: {
      equals: 'published',
    },
  }
}

/**
 * Strict private collection access: Block public read/write, only authenticated staff
 */
export const staffOnlyAccess: Access = ({ req: { user } }) => {
  const u = user as unknown as AuthenticatedUser | undefined
  return Boolean(u && u.status !== 'suspended')
}

/**
 * Capability check for sensitive PII reveal
 */
export const canRevealPIICapability = (user?: AuthenticatedUser | null): boolean => {
  if (!user || user.status === 'suspended') return false
  if (user.role === 'superAdmin') return true
  return Boolean(user.capabilities?.canRevealPII)
}
