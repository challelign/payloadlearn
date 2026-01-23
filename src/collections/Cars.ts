import type { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
  slug: 'cars',
  labels: {
    singular: 'Car',
    plural: 'Cars',
  },
  admin: { useAsTitle: 'title' },
  hooks: {
    afterRead: [
      ({ doc }) => {
        doc.doILikeIt = doc.title.includes('Vantage ')
        return doc
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'manufacturer', type: 'relationship', relationTo: 'manufacturers' },
  ],
}
