// import {SchemaTypeDefinition} from 'sanity'
import article from './article-schema'
import page from './page-schema'
import homePage from './homePage-schema'
import author from './author-schema'
import category from './category-schema'
import code from './code-schema'
import threeUpBlock from './Blocks/ThreeUpBlock'
import splitBlock from './Blocks/SplitBlock'
import Bio from './Blocks/Bio'
import CTA from './Blocks/CTA'
import BlogPostList from './Blocks/BlogPostList'
import ContactForm from './Blocks/ContactForm'
import CTAd from './Blocks/CTAd'
import EventListing from './Blocks/EventListing'
import FAQSection from './Blocks/FAQSection'
import Feature from './Blocks/Feature'
import FeatureItem from './Blocks/FeatureItem'
import FeaturesSection from './Blocks/FeaturesSection'
import Hero from './Blocks/Hero'
import ImageGallery from './Blocks/ImageGallery'
import NewsletterSignup from './Blocks/NewsletterSignup'
import PortfolioGrid from './Blocks/PortfolioGrid'
import PricingTable from './Blocks/PricingTable'
import RichTextEditor from './Blocks/RichTextEditor'
import SocialMediaLinks from './Blocks/SocialMediaLinks'
import Split from './Blocks/Split'
import StatsSection from './Blocks/StatsSection'
import TeamMembers from './Blocks/TeamMembers'
import Testimonials from './Blocks/Testimonials'
import TestimonialSlider from './Blocks/TestimonialSlider'
import VideoEmbed from './Blocks/VideoEmbed'
import Heading from './Blocks/Heading'

// Export as a flat array for Sanity v3
export const schemaTypes = [
  // Documents
  homePage,
  page,
  article,
  author,
  category,

  // Objects
  code,

  // Blocks
  threeUpBlock,
  splitBlock,
  Bio,
  CTA,
  BlogPostList,
  CTAd,
  ContactForm,
  EventListing,
  FAQSection,
  Feature,
  FeatureItem,
  FeaturesSection,
  Heading,
  Hero,
  ImageGallery,
  NewsletterSignup,
  PortfolioGrid,
  PricingTable,
  RichTextEditor,
  SocialMediaLinks,
  Split,
  StatsSection,
  TeamMembers,
  TestimonialSlider,
  Testimonials,
  VideoEmbed,
]
