import { defineType } from "sanity";
import { AiOutlineHome } from "react-icons/ai"
import { pageBuilder } from "../lib/classes";

export default defineType({
    title: 'Home',
    name: 'homeDesign',
    type: 'document',
    icon: AiOutlineHome,
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
            description: 'Name your Home Page',
            validation: (Rule) => Rule.required().error('Required for referencing')
        },
        {
            title: 'Home Page ID',
            name: 'slug',
            type: 'slug',
            group: 'settings',
            description: 'Needed to generate previews',
            options: {
              source: "title",
            },
        },
        {
            title: 'Page Builder',
            name: 'pageBuilder',
            type: 'array',
            of: pageBuilder
        }
    ]
})