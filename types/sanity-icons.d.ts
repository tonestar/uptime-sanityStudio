import {ForwardRefExoticComponent, SVGProps, RefAttributes, FunctionComponent} from 'react'

// This makes Sanity icons compatible with Sanity schema icon type requirements
declare module '@sanity/icons' {
  export interface SanityIcon
    extends ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
    > {
    // Add a dummy property to avoid "interface declares no members" warning
    __sanityIconCompat?: boolean
  }
}

// This makes icons compatible with preview media properties in Sanity
declare module 'sanity' {
  interface PreviewValue {
    media?: any; // Override to accept any, including ForwardRefExoticComponent
  }
}

  // Make all icon exports compatible with Sanity's ComponentType expectation
  export const DocumentTextIcon: SanityIcon
  export const UserIcon: SanityIcon
  export const TagIcon: SanityIcon
  export const CodeBlockIcon: SanityIcon
  export const RobotIcon: SanityIcon
  export const RocketIcon: SanityIcon
  export const BlockContentIcon: SanityIcon
  export const ComponentIcon: SanityIcon
  export const ImagesIcon: SanityIcon
  export const EarthGlobeIcon: SanityIcon
  export const DesktopIcon: SanityIcon
  export const MobileDeviceIcon: SanityIcon
  export const EnvelopeIcon: SanityIcon
  export const LinkIcon: SanityIcon
  export const BulbOutlineIcon: SanityIcon
  export const StarIcon: SanityIcon
  export const UsersIcon: SanityIcon
  export const ImageIcon: SanityIcon
  export const CalendarIcon: SanityIcon
  export const PlayIcon: SanityIcon
  export const EditIcon: SanityIcon
  export const HelpCircleIcon: SanityIcon
  export const BarChartIcon: SanityIcon
  export const DocumentsIcon: SanityIcon
  export const ThLargeIcon: SanityIcon
  export const ComposeIcon: SanityIcon
  export const HomeIcon: SanityIcon
  export const CogIcon: SanityIcon
  export const TextIcon: SanityIcon

  // Add any other icons you use from @sanity/icons here
}
