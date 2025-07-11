import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {RobotIcon, RocketIcon} from '@sanity/icons'

export default defineConfig([
  {
    projectId: 'cyxit282',
    dataset: 'production',
    name: 'production-workspace',
    basePath: '/production',
    title: 'Default Workspace',
    subtitle: 'production',
    icon: RobotIcon,
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
  {
    projectId: 'cyxit282',
    dataset: 'development',
    name: 'development-workspace',
    basePath: '/development',
    title: 'Development Workspace',
    subtitle: 'development',
    icon: RocketIcon,
    plugins: [structureTool(), visionTool()],
    schema: {
      types: schemaTypes,
    },
  },
])
