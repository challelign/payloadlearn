// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Cars } from './collections/Cars'
import { Manufacturers } from './collections/Manufacturers'
import { number, select } from 'payload/shared'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // dateFormat: 'MM/dd/yyyy',
    // dateFormat: 'dd/MM/yyyy',
  },
  cors: ['http://localhost:3000', process.env.DOMAIN_NAME || ''], //cors are used to allow requests from different origins
  csrf: ['http://localhost:3000', process.env.DOMAIN_NAME || ''], //csrf are used to prevent cross-site request forgery
  collections: [
    Users,
    Media,
    Cars,
    Manufacturers,
    {
      slug: 'posts',
      labels: {
        singular: 'Blog',
        plural: 'Blogs',
      },
      // admin: { useAsTitle: 'title' },
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            placeholder: 'This is a test placeholder',
            // rtl: true, // to put the placeholder in the right direction
            // readOnly: true,
          },
        },
        {
          name: 'email',
          type: 'email',
          unique: true,
          admin: {
            placeholder: 'Enter an email address',
          },
        },
        {
          name: 'number',
          type: 'number',
          admin: {
            placeholder: 'Enter a number',
          },
        },
        {
          name: 'select',
          type: 'select',
          options: [
            {
              label: 'Select 1',
              value: 'select1',
            },
            {
              label: 'Select 2',
              value: 'select2',
            },
            {
              label: 'Select 3',
              value: 'select3',
            },
          ],
          hasMany: true, // to select multiple options
          admin: {
            isClearable: false,
            // isClearable: true,
            isSortable: false,
          },
        },
        {
          name: 'checkbox',
          type: 'checkbox',
          admin: {
            description: 'Check this box',
          },
        },
        {
          name: 'date',
          type: 'date',
          admin: {
            description: 'Select a date',
          },
        },
        {
          name: 'time',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
              timeIntervals: 15,
            },
          },
        },
      ],
    },
  ],

  upload: {
    limits: {
      fileSize: 50000000, // 50MB
    },
  },

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [
          {
            slug: 'carHighlight',
            fields: [
              {
                name: 'car',
                type: 'relationship',
                relationTo: 'cars',
                required: true,
              },
              {
                name: 'type',
                type: 'radio',
                defaultValue: 'image',
                options: [
                  {
                    label: 'Image',
                    value: 'image',
                  },
                  { label: 'Gallery', value: 'gallery' },
                ],
              },
            ],
          },
        ],
      }),
    ],
  }),

  // editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
