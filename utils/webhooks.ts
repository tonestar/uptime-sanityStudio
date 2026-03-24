/**
 * Simple webhook configuration for Sanity Studio
 *
 * Document types that should trigger webhooks
 */
export const WEBHOOK_DOCUMENT_TYPES = ['article', 'page', 'homePage', 'author', 'category'] as const

// GROQ filter for webhook triggers
export const WEBHOOK_FILTER = `_type in ["${WEBHOOK_DOCUMENT_TYPES.join('", "')}"]`

/**
 * Webhook payload structure from Sanity
 */
export interface SanityWebhookPayload {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  slug?: {
    current: string
  }
  [key: string]: any
}
