import { defineType } from "sanity";
import { AiOutlineTeam } from "react-icons/ai"

export default defineType({
    title: 'Team',
    name: 'team',
    type: 'document',
    icon: AiOutlineTeam,
    groups: [
        {title: 'Content', name: 'content'},
        {title: 'SEO', name: 'seo'},
        {title: 'Settings', name: 'settings'},
    ],
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            group: 'content',
            validation: Rule => Rule.required().error('Add a name')
        },
        {
            title: 'URL',
            name: 'slug',
            type: 'slug',
            group: 'settings',
            description: 'We recommend clicking generate. Changing URL may cause broken pages',
            options: {
              source: "name",
            },
            validation: (Rule) => Rule.required(),
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            group: 'content',
            options: {
                hotspot: true
            }
        },
        {
            title: 'Position',
            name: 'position',
            type: 'string',
            group: 'content',

        },
        {
            title: 'Contact Information',
            name: 'contactInformation',
            type: 'object',
            group: 'content',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    title: 'Phone Number',
                    name: 'phoneNumber',
                    type: 'string',
                },
                {
                    title: 'Email',
                    name: 'email',
                    type: 'string'
                },
            ]
        },
        {
            title: 'Social Accounts',
            name: 'socialAccounts',
            type: 'social',
            group: 'content',
        },
        {
            title: 'About',
            name: 'about',
            type: 'contentEditor'
        },
        {
            title: 'Search Engine Optimization',
            name: 'seo',
            type: 'seo',
            group: 'seo'
        }
    ]
})