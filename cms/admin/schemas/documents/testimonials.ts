import { defineType } from "sanity";
import { AiOutlineComment } from 'react-icons/ai'

export default defineType({
    title: 'Testimonials',
    name: 'testimonials',
    type: 'document',
    icon: AiOutlineComment,
    fields: [
        {
            title: 'Testimonial',
            name: 'testimonial',
            type: 'contentEditor',
            description: 'Testimonials are page blocks within the page builder. Choose the testimonial block in a page builder to display the testimonials'
        },
        {
            title: 'Name',
            name: 'name',
            type: 'string'
        },
        {
            title: 'Position',
            name: 'position',
            type: 'string'
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image'
        },
        {
            title: 'Stars',
            name: 'stars',
            type: 'string',
            options: {
                list: [
                    { title: '5', value: '5' },
                    { title: '4', value: '4' },
                    { title: '3', value: '3' },
                    { title: '2', value: '2' },
                    { title: '1', value: '1' },
                ]
            }
        },
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'testimonial'
        }
    }
})