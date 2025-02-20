import { defineType } from "sanity";

export default defineType({
        title: 'Button Settings',
        name: 'buttonSettings',
        type: 'object',
        options: {
            collapsible: true,
            collapsed: true
        },
        fields: [
            {
                title: 'Button',
                name: 'button',
                type: 'links',
            },
            {
                title: 'Button Background Color',
                name: 'buttonBackground',
                type: 'color',
                options: {
                    disableAlpha: true
                }
            },
            {
                title: 'Button Text Color',
                name: 'buttonTextColor',
                type: 'color',
                options: {
                    disableAlpha: true
                }
            }
        ]
})