# Simple Webhook Setup for Sanity Studio

This is a simple guide for setting up webhooks in your Sanity Studio that will trigger when content is published.

## Quick Setup

### 1. Create a Webhook in Sanity Dashboard

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project (`cyxit282`)
3. Navigate to **API** → **Webhooks**
4. Click **"Create webhook"**
5. Configure:
   - **Name**: "Content Update Hook"
   - **URL**: `https://your-nextjs-app.com/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: ✅ Create, ✅ Update, ✅ Delete
   - **Filter**: `_type in ["article", "page", "homePage", "author", "category"]`
   - **HTTP method**: `POST`
   - **Include drafts**: ❌ No

### 2. What the Webhook Sends

When you publish content, Sanity will send a POST request with this payload:

```json
{
  "_id": "article-123",
  "_type": "article",
  "_createdAt": "2024-01-01T12:00:00Z",
  "_updatedAt": "2024-01-01T12:00:00Z",
  "_rev": "abc123",
  "slug": {
    "current": "my-article-slug"
  }
  // ... other document fields
}
```

### 3. Document Types Included

The webhook will trigger for these content types:

- `article` - Blog posts and articles
- `page` - Static pages
- `homePage` - Homepage content
- `author` - Author profiles
- `category` - Content categories

## Files in This Project

- **`utils/webhooks.ts`** - Simple configuration and types for webhook handling
- **`.env.example`** - Environment variables template

## Next Steps

1. Set up your Next.js API route to handle the webhook
2. Test by publishing content in Sanity Studio
3. Monitor webhook delivery in the Sanity dashboard

That's it! Keep it simple and it just works.
