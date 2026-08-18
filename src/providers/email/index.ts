/**
 * EmailProvider Interface & Noop Implementation
 * Ensures no paid email API is required for local/staging operation.
 */

export interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

export interface EmailProvider {
  sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string }>
}

/**
 * Noop / Redacted Logging Email Provider
 * Logs completely redacted email notifications to console in development.
 */
export class NoopEmailProvider implements EmailProvider {
  async sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string }> {
    if (process.env.NODE_ENV !== 'production') {
      const redactedTo = options.to.replace(/(?<=.).(?=.*@)/g, '*')
      console.log(`[EmailProvider:Noop] Notification sent to: ${redactedTo} | Subject: ${options.subject}`)
    }
    return { success: true, messageId: `noop-${Date.now()}` }
  }
}

let emailProviderInstance: EmailProvider | null = null

export function getEmailProvider(): EmailProvider {
  if (!emailProviderInstance) {
    emailProviderInstance = new NoopEmailProvider()
  }
  return emailProviderInstance
}
