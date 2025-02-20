import { defineType } from "sanity";

export default defineType({
    title: 'Social',
    name: 'social',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true
    },
    fields: [
        {
            title: 'Google Business Profile',
            name: 'googleBusiness',
            type: 'url',
            description: 'Link your Google Business Profile to help your SEO. No icons are displayed'
        },
        {
            title: 'Instagram',
            name: 'instagram',
            type: 'url',
        },
        {
            title: 'Youtube',
            name: 'youtube',
            type: 'url'
        },
        {
            title: 'Facebook',
            name: 'facebook',
            type: 'url',
        },
        {
            title: 'Twitter',
            name: 'twitter',
            type: 'url',
        },
        {
            title: 'Linkedin',
            name: 'linkedin',
            type: 'url',
        },
        {
            title: 'Yelp',
            name: 'yelp',
            type: 'url',
        },
        {
            title: 'Pinterest',
            name: 'pinterest',
            type: 'url',
        },
        {
            title: 'Tiktok',
            name: 'tiktok',
            type: 'url',
        },
        {
            title: 'Reddit',
            name: 'reddit',
            type: 'url',
        },
        {
            title: 'Zillow',
            name: 'zillow',
            type: 'url',
        }
    ]
})