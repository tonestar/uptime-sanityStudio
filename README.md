# Uptime Sanity Studio

A modern Sanity Studio implementation with an enhanced page builder approach.

## Page Builder Features

### Block Organization

Blocks are organized into semantic groups for better content management:

- Hero Sections
- Content Blocks
- Features & Benefits
- Layout Components
- Social & Testimonials
- Engagement
- Call to Action
- Media
- Lists & Grids
- Team & Events
- Help & Support

### Styling Options

Each block can be customized with:

- Background colors (White, Light Gray, Dark Gray, Primary, Secondary)
- Padding (None, Small, Medium, Large)
- Container width (Full Width, Container, Narrow)

### SEO Optimization

Content blocks include SEO fields for:

- Meta titles (max 60 characters)
- Meta descriptions (max 160 characters)
- Social media previews (OpenGraph)
  - Custom image
  - Title
  - Description

### Accessibility Features

- Required alt text for images
- ARIA labels where applicable
- Semantic HTML structure

### Preview System

- Grid view with visual previews
- List view with detailed information
- Preview images in `/static/preview-{blockName}.png`
- Status indicators for:
  - Content length
  - Style settings
  - Required fields

### Validation Rules

- Required fields clearly marked
- URL validation
- Character limits for SEO fields
- Image requirements
- Date validation for events

## Block Types

### Hero Section

A full-featured hero block with:

- Title and subtitle
- Rich text content
- Customizable CTA button
- Background image with hotspot
- Optional background video
- SEO optimization
- Style customization

[Additional block documentation to be added]

## Development

### Adding Preview Images

1. Create a preview image for your block
2. Save it as PNG in `/static/preview-{blockName}.png`
3. Image should be 16:9 ratio for consistency

### Adding New Blocks

1. Create a new file in `schemaTypes/Blocks`
2. Import common configurations:
   ```typescript
   import {defaultBlockPreview, blockStyleFields, seoFields} from '../pageBuilder.config'
   ```
3. Include style and SEO fields where appropriate
4. Add validation rules
5. Add to appropriate group in `pageBuilder.config.ts`

### Validation Rules

- Use `rule => rule.required()` for required fields
- Add `.max()` for character limits
- Use `.uri()` for URL validation
- Add custom validation where needed
