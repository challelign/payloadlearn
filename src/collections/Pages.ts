import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
    slug: 'pages',
    admin: { useAsTitle: 'title' },
    access:{
        read:({req:{user}})=>{
            // Logged in users can read anything
            if (user) return true

            // if not logged in, only read published pages
            return {
                _status:{
                    equals:'published'
                }
            }
        }
    }
    ,versions:{
        drafts:{
            autosave:true
        }
    },
    fields: [
        { name: 'title', type: 'text', required: true },
        {
            name: 'content',
            type: 'richText',
        },
    ],


}