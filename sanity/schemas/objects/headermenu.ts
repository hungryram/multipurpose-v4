import { defineType } from "sanity";

export default defineType({
        title: 'Header Menu',
    name: 'headerMenu',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true,

    },
    fields: [
        {
            title: 'Main navigation',
            name: 'mainNav',
            description: 'Select menu for main navigation',
            type: 'reference',
            to: { type: 'navigation' },
        },
        {
            name: 'headerColor',
            title: 'Header Background Color',
            type: 'color',
            options: {
                disableAlpha: true
            },
        },
        {
            name: 'headerColorScroll',
            title: 'Header Scroll Background Color',
            type: 'color',
            options: {
                disableAlpha: true
            },
        },
        {
            name: 'navColor',
            title: 'Navigation Text Color',
            type: 'color',
            options: {
                disableAlpha: true
            },
        },
        {
            name: 'navScrollColor',
            title: 'Navigation Scroll Text Color',
            type: 'color',
            options: {
                disableAlpha: true
            },
        },
        {
            title: "Call to Action",
            name: "cta",
            type: "subMenu",
        },
        {
            title: "Hide Call to Action on Desktop",
            name: "hideCta",
            type: "boolean",
        },
    ]
})