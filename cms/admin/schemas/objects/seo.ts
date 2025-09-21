import { defineType } from "sanity";
import SeoTitleInput from '../components/SeoTitleInput'
import SeoDescriptionInput from '../components/SeoDescriptionInput'

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
            type: 'string',
            description: 'The title that appears in search engine results and browser tabs',
            components: {
                input: SeoTitleInput
            },
            validation: Rule => Rule.max(70).warning('Title tags longer than 70 characters may be truncated in search results')
        },
        {
            title: 'Meta Description',
            name: 'meta_description',
            type: 'text',
            description: 'A brief description that appears under the title in search engine results',
            components: {
                input: SeoDescriptionInput
            },
            validation: Rule => Rule.max(200).warning('Meta descriptions longer than 200 characters may be truncated in search results')
        },
        {
            title: 'No Index Page',
            name: 'noIndex',
            type: 'boolean'
        }
    ]
})