import { defineType } from "sanity";

export default defineType({
    name: 'profile',
    title: 'Profile Settings',
    type: 'document',
    groups: [
        {title: 'Contact Information', name: 'contact'},
        {title: 'Settings', name: 'settings'},
    ],
    fields: [
        {
            title: 'Company Name',
            name: 'company_name',
            type: 'string',
            group: 'contact',
        },
        {
            title: 'Contact Information',
            name: 'contact_information',
            type: 'contact',
            group: 'contact'

        },
        {
            title: 'Address',
            name: 'address',
            type: 'location',
            group: 'contact'

        },
        {
            title: 'Social',
            name: 'social',
            type: 'social',
            group: 'contact'

        },
        {
            name: 'seo',
            title: 'Search Engine Optimization',
            type: 'object',
            group: 'settings',
            options: {
                collapsible: true,
                collapsed: true,
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
                    title: 'X Username',
                    name: 'xHandle',
                    type: 'string'
                },
                {
                    title: 'Sharing Image Banner',
                    name: 'sharingImageBanner',
                    type: 'image',
                    description: 'Banner used when sharing your website link'
                },
            ]
        },
        {
            title: 'Settings',
            name: 'settings',
            type: 'object',
            group: 'settings',
            options: {
                collapsible: true,
                collapsed: true
            },
            fields: [
                {
                    title: 'Website domain',
                    name: 'websiteName',
                    type: 'url',
                    description: 'Do not include trailing slash at the end. Must include the full URL',
                    validation: Rule => Rule.required().error('Needed for website configuration')
                },
                {
                    title: 'Google Analytics ID',
                    name: 'googleID',
                    type: 'string',
                    description: 'Only include the Google ID, not the code. Ex. G-4XXXXXXX'
                },
                {
                    title: 'Google Verification',
                    name: 'googleVerification',
                    type: 'string',
                    description: 'Verify with Google Console'
                },
                {
                    title: 'Facebook Pixel ID',
                    name: 'facebookPixel',
                    type: 'string',
                    description: 'Only include the facebook pixel ID, not the code. This is also the business ID'
                }, 
            ]
        }
    ],
    preview: {
        prepare(){
            return {
                title: 'Profile Settings'
            }
        }
    }
})