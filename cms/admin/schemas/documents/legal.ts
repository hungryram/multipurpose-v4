import { defineType } from "sanity";
import { MdOutlinePolicy } from "react-icons/md"

export default defineType({
    title: 'Legal',
    name: 'legal',
    type: 'document',
    icon: MdOutlinePolicy,
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string'
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            description: 'We recommend clicking generate. Changing URL may cause broken pages',
            options: {
              source: "title",            
            },
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor'
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo',
        }
    ]
})