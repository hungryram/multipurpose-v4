import { defineType } from "sanity";
import { pageBuilder } from "../lib/classes";

export default defineType({
    title: 'Pages',
    name: 'pages',
    type: 'document',
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
      ],
    fields: [
        
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            group: 'content'
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            description: 'We recommend clicking generate. Changing URL may cause broken pages',
            options: {
              source: "title",
            },
            group: 'settings',
            validation: (Rule) => Rule.required(),
        },
        {
            title: 'Page Builder',
            name: 'pageBuilder',
            type: 'array',
            group: 'content',
            of: pageBuilder
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo',
            validation: Rule => Rule.required().error('Required for search engines'),
            group: 'settings'
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'slug.current',
            media: 'headerImage'
        },
        prepare(selection) {
            const { title, subtitle, media } = selection
            return {
                title: title,
                media: media
                
            }
        }
    }
})
