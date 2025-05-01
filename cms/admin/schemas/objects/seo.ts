import { defineType } from "sanity";

export default defineType({
    title: 'Search Engine Optimization',
    name: 'seo',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: false
    },
    fields: [
        {
            title: 'Title Tag',
            name: 'title_tag',
            type: 'string'
        },
        {
            title: 'Meta Description',
            name: 'meta_description',
            type: 'text'
        },
        {
            title: 'No Index Page',
            name: 'noIndex',
            type: 'boolean'
        }
    ]
})