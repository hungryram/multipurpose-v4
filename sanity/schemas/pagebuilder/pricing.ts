import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, primaryButton, secondaryButton, textAlign } from "../lib/classes";

export default defineType({
    title: 'Packages',
    name: 'pricing',
    type: 'object',
    groups: [
        {title: 'Content', name: 'content'},
        {title: 'Settings', name: 'settings'},
    ],
    fields: [
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content'
        },
        {
            title: 'Text Align',
            name: 'textAlign',
            type: 'string',
            options: {
                list: textAlign
            },
        },
        primaryButton,
        secondaryButton,
        {
            title: 'Packages',
            name: 'packages',
            type: 'array',
            group: 'content',
            of: [
                {
                    title: 'Package',
                    type: 'object',
                    fields: [
                        {
                            title: 'Name',
                            name: 'name',
                            type: 'string'
                        },
                        {
                            title: 'Price',
                            name: 'price',
                            type: 'string'
                        },
                        {
                            title: 'Discount Price',
                            name: 'Discountprice',
                            type: 'string'
                        },
                        {
                            title: 'Package Type',
                            name: 'packageType',
                            type: 'string',
                            description: 'Displays after the pricing. identify if monthly, annually, etc.'
                        },
                        {
                            title: 'Content',
                            name: 'content',
                            type: 'text',
                        },
                        {
                            title: 'Button Text',
                            name: 'buttonText',
                            type: 'string',
                        },
                        {
                            title: 'Link',
                            name: 'link',
                            type: 'string',
                        },
                        {
                            title: 'Details',
                            name: 'details',
                            type: 'array',
                            of: [{
                                type: 'string'
                            }]
                        }
                    ]
                }
            ]
        },
        {
            title: 'Number of Columns',
            name: 'columnNumber',
            type: 'number',
            validation: Rule => Rule.min(1).max(4),
            group: 'settings'
        },
        {
            title: 'Package Background Color',
            name: 'packageBackground',
            type: 'color',
            group: 'settings',
        },
        {
            title: 'Package Text Color',
            name: 'packageTextColor',
            type: 'color',
            group: 'settings',
        },
        colorOptions,
        paddingTop,
        paddingBottom,
    ],
    preview: {
        select: {
          content: 'content',
        },
        prepare({ content }) {
          const hasContent = content && content[0]?.children?.length > 0;
      
          return {
            title: hasContent ? content[0].children[0].text : 'Packages Section',
          };
        },
      },
})