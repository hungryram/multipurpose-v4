import { defineType } from "sanity";

export default defineType({
    name: 'branding',
    title: 'Branding',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,
    },
    fields: [
        {
            title: 'Logo',
            name: 'logo',
            type: 'image'
        },
        {
            title: 'Logo on Scroll',
            name: 'logoScroll',
            type: 'image'
        },
        {   
            title: 'Logo Width',
            name: 'logoWidth',
            type: 'number'
        },
        {   
            title: 'Mobile Logo Width',
            name: 'mobileLogoWidth',
            type: 'number'
        },
        {
            title: 'Favicon',
            name: 'favicon',
            type: 'image'
        },
    ]
})