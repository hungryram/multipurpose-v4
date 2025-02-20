import { defineType } from "sanity";

export default defineType({
    title: 'Main Colors',
    name: 'mainColors',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
    },
    fields: [
        {
            title: 'Primary Color',
            name: 'primaryColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Secondary Color',
            name: 'secondaryColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Primary Button Background Color',
            name: 'buttonBackgroundColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Primary Button Text Color',
            name: 'buttonTextColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Secondary Button Background Color',
            name: 'secondaryButtonBackgroundColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Secondary Button Text Color',
            name: 'secondaryButtonTextColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Website Background Color',
            name: 'websiteBodyColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Website Heading Color',
            name: 'websiteHeadingColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        },
        {
            title: 'Website Text Color',
            name: 'websiteTextColor',
            type: 'color',
            options: {
                disableAlpha: true
            }
        }
    ]
})