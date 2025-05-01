import { defineType } from "sanity";
import { BsBriefcase } from "react-icons/bs"
import { pageBuilder } from "../lib/classes";

export default defineType({
    title: 'Services',
    name: 'services',
    type: 'document',
    icon: BsBriefcase,
    groups: [
        {name: 'content', title: 'Content'},
        {name: 'settings', title: 'Settings'},
        {name: 'seo', title: 'SEO'},
      ],
    fields: [
        
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            group: 'settings'
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
            validation: Rule => Rule.required().error('Required to create pages'),
        },
        {
            title: 'Quick Detail',
            name: 'detail',
            type: 'string',
            group: 'content',
        },
        {
            title: 'Featured Image',
            name: 'featuredImage',
            type: 'image',
            group: 'settings',
            options: {
                hotspot: false
            },
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
            group: 'seo'
        }
    ]
})