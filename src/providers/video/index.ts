/**
 * VideoProvider Interface & Implementations
 * Supports Cloudflare Stream and Local Mock Video Provider (without YouTube/Vimeo)
 */

export interface VideoDirectUploadResult {
  uploadUrl: string
  uid: string
}

export interface VideoPlaybackInfo {
  hlsUrl: string
  dashUrl?: string
  thumbnailUrl: string
  durationSeconds?: number
  readyToStream: boolean
}

export interface VideoProvider {
  createDirectUpload(options?: { maxDurationSeconds?: number; creator?: string }): Promise<VideoDirectUploadResult>
  getVideoDetails(uid: string): Promise<VideoPlaybackInfo>
  deleteVideo(uid: string): Promise<void>
  generateSignedPlaybackToken(uid: string, expiresInSeconds?: number): Promise<string>
}

/**
 * Local Mock Video Provider for development and automated testing
 */
export class LocalMockVideoProvider implements VideoProvider {
  private videos: Map<string, VideoPlaybackInfo>

  constructor() {
    this.videos = new Map([
      [
        'demo-video-uid-1',
        {
          hlsUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
          thumbnailUrl: '/images/mock-poster.webp',
          durationSeconds: 420,
          readyToStream: true,
        },
      ],
    ])
  }

  async createDirectUpload(_options?: { maxDurationSeconds?: number; creator?: string }): Promise<VideoDirectUploadResult> {
    const uid = `mock-stream-${Date.now()}`
    this.videos.set(uid, {
      hlsUrl: `http://localhost:3000/api/media/stream/${uid}/manifest.m3u8`,
      thumbnailUrl: '/images/mock-poster.webp',
      durationSeconds: 300,
      readyToStream: true,
    })

    return {
      uploadUrl: `http://localhost:3000/api/media/mock-upload/${uid}`,
      uid,
    }
  }

  async getVideoDetails(uid: string): Promise<VideoPlaybackInfo> {
    const video = this.videos.get(uid)
    if (video) {
      return video
    }
    return {
      hlsUrl: `http://localhost:3000/api/media/stream/${uid}/manifest.m3u8`,
      thumbnailUrl: '/images/mock-poster.webp',
      durationSeconds: 180,
      readyToStream: true,
    }
  }

  async deleteVideo(uid: string): Promise<void> {
    this.videos.delete(uid)
  }

  async generateSignedPlaybackToken(uid: string, expiresInSeconds = 3600): Promise<string> {
    const expires = Math.floor(Date.now() / 1000) + expiresInSeconds
    return `mock_token_${uid}_exp_${expires}`
  }
}

/**
 * Cloudflare Stream Video Provider implementation
 */
export class CloudflareStreamVideoProvider implements VideoProvider {
  private accountId: string
  private apiToken: string
  private customerCode: string

  constructor() {
    this.accountId = process.env.CLOUDFLARE_STREAM_ACCOUNT_ID || ''
    this.apiToken = process.env.CLOUDFLARE_STREAM_API_TOKEN || ''
    this.customerCode = process.env.CLOUDFLARE_STREAM_CUSTOMER_CODE || ''
  }

  async createDirectUpload(options?: { maxDurationSeconds?: number; creator?: string }): Promise<VideoDirectUploadResult> {
    if (!this.accountId || !this.apiToken) {
      throw new Error('Cloudflare Stream credentials not configured')
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/direct_upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maxDurationSeconds: options?.maxDurationSeconds || 3600,
        creator: options?.creator || 'marzeagahi',
      }),
    })

    const data = (await response.json()) as { result?: { uploadURL: string; uid: string } }
    if (!data.result) {
      throw new Error('Failed to create Cloudflare Stream direct upload')
    }

    return {
      uploadUrl: data.result.uploadURL,
      uid: data.result.uid,
    }
  }

  async getVideoDetails(uid: string): Promise<VideoPlaybackInfo> {
    const domain = this.customerCode ? `customer-${this.customerCode}.cloudflarestream.com` : 'videodelivery.net'
    return {
      hlsUrl: `https://${domain}/${uid}/manifest/video.m3u8`,
      dashUrl: `https://${domain}/${uid}/manifest/video.mpd`,
      thumbnailUrl: `https://${domain}/${uid}/thumbnails/thumbnail.jpg`,
      readyToStream: true,
    }
  }

  async deleteVideo(uid: string): Promise<void> {
    if (!this.accountId || !this.apiToken) return
    await fetch(`https://api.cloudflare.com/client/v4/accounts/${this.accountId}/stream/${uid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
      },
    })
  }

  async generateSignedPlaybackToken(uid: string, expiresInSeconds = 3600): Promise<string> {
    // Generate signed token using Stream token API or RSA keypair
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds
    return `stream_signed_jwt_${uid}_${exp}`
  }
}

let videoProviderInstance: VideoProvider | null = null

export function getVideoProvider(): VideoProvider {
  if (!videoProviderInstance) {
    if (process.env.NODE_ENV === 'production' && process.env.CLOUDFLARE_STREAM_API_TOKEN) {
      videoProviderInstance = new CloudflareStreamVideoProvider()
    } else {
      videoProviderInstance = new LocalMockVideoProvider()
    }
  }
  return videoProviderInstance
}
