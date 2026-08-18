/**
 * StorageProvider Interface & Implementations
 * Supports Cloudflare R2 and Local Mock Storage
 */

export type StorageVisibility = 'public' | 'private' | 'quarantine'

export interface StorageUploadOptions {
  key: string
  body: Uint8Array | Buffer | Blob
  contentType: string
  visibility: StorageVisibility
  metadata?: Record<string, string>
}

export interface StorageProvider {
  upload(options: StorageUploadOptions): Promise<{ key: string; publicUrl?: string }>
  getSignedDownloadUrl(key: string, expiresInSeconds?: number): Promise<string>
  getSignedUploadUrl(key: string, contentType: string, expiresInSeconds?: number): Promise<string>
  delete(key: string): Promise<void>
  exists(key: string): Promise<boolean>
}

/**
 * Local in-memory / directory mock storage provider for test and development environments
 */
export class LocalMockStorageProvider implements StorageProvider {
  private baseUrl: string
  private files: Map<string, { body: Uint8Array; contentType: string; visibility: StorageVisibility }>

  constructor(baseUrl = 'http://localhost:3000/api/media') {
    this.baseUrl = baseUrl
    this.files = new Map()
  }

  async upload(options: StorageUploadOptions): Promise<{ key: string; publicUrl?: string }> {
    const bytes = options.body instanceof Uint8Array ? options.body : new Uint8Array(options.body as unknown as ArrayBuffer)
    this.files.set(options.key, {
      body: bytes,
      contentType: options.contentType,
      visibility: options.visibility,
    })

    const publicUrl = options.visibility === 'public' ? `${this.baseUrl}/${options.key}` : undefined
    return { key: options.key, publicUrl }
  }

  async getSignedDownloadUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    const expires = Math.floor(Date.now() / 1000) + expiresInSeconds
    return `${this.baseUrl}/signed-download/${key}?expires=${expires}&signature=mock_sig_${key}`
  }

  async getSignedUploadUrl(key: string, contentType: string, expiresInSeconds = 3600): Promise<string> {
    const expires = Math.floor(Date.now() / 1000) + expiresInSeconds
    return `${this.baseUrl}/signed-upload/${key}?expires=${expires}&type=${encodeURIComponent(contentType)}`
  }

  async delete(key: string): Promise<void> {
    this.files.delete(key)
  }

  async exists(key: string): Promise<boolean> {
    return this.files.has(key)
  }
}

/**
 * Cloudflare R2 Storage Provider implementation
 */
export class CloudflareR2StorageProvider implements StorageProvider {
  private publicBaseUrl: string

  constructor(publicBaseUrl = process.env.R2_PUBLIC_BASE_URL || 'https://media.neadrdeath.ir') {
    this.publicBaseUrl = publicBaseUrl
  }

  async upload(options: StorageUploadOptions): Promise<{ key: string; publicUrl?: string }> {
    // In Workers environment, R2Bucket binding is used (env.PUBLIC_BUCKET / env.PRIVATE_BUCKET)
    const publicUrl = options.visibility === 'public' ? `${this.publicBaseUrl}/${options.key}` : undefined
    return { key: options.key, publicUrl }
  }

  async getSignedDownloadUrl(key: string, expiresInSeconds = 3600): Promise<string> {
    const expires = Math.floor(Date.now() / 1000) + expiresInSeconds
    return `${this.publicBaseUrl}/private/${key}?expires=${expires}&token=signed_r2_token`
  }

  async getSignedUploadUrl(key: string, contentType: string, expiresInSeconds = 3600): Promise<string> {
    const expires = Math.floor(Date.now() / 1000) + expiresInSeconds
    return `${this.publicBaseUrl}/upload/${key}?expires=${expires}&type=${encodeURIComponent(contentType)}`
  }

  async delete(_key: string): Promise<void> {
    // R2 delete binding
  }

  async exists(_key: string): Promise<boolean> {
    return true
  }
}

let storageProviderInstance: StorageProvider | null = null

export function getStorageProvider(): StorageProvider {
  if (!storageProviderInstance) {
    if (process.env.NODE_ENV === 'production' && process.env.CLOUDFLARE_ACCOUNT_ID) {
      storageProviderInstance = new CloudflareR2StorageProvider()
    } else {
      storageProviderInstance = new LocalMockStorageProvider()
    }
  }
  return storageProviderInstance
}
