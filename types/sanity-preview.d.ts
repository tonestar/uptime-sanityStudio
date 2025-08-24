// Sanity preview value type augmentation

// This makes icons compatible with preview media properties in Sanity
declare module 'sanity' {
  interface PreviewValue {
    title?: any
    subtitle?: any
    description?: any
    media?: any // Override to accept any, including ForwardRefExoticComponent
  }
}
