import { defineType } from "sanity";

export default defineType({
    name: 'contact',
    title: 'Contact',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true
    },
    fields: [
        {
            title: 'Phone Number',
            name: 'phone_number',
            type: 'string'
        },
        {
            title: 'Office Number',
            name: 'office_number',
            type: 'string'
        },
        {
            title: 'Email',
            name: 'email',
            type: 'string'
        },
    ]
})