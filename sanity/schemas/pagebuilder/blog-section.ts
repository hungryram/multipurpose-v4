import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, primaryButton, secondaryButton, textAlign } from "../lib/classes";


export default defineType({
    title: 'Blog Display',
    name: 'blogDisplay',
    type: 'object',
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'settings', title: 'Settings' },
    ],
    fields: [
        {
            title: "Layout Type",
            name: "layoutType",
            type: "string",
            options: {
                list: [
                    { title: "Grid", value: "grid" },
                    { title: "List", value: "list" },
                    { title: "Featured", value: "featured" },
                    { title: "Carousel", value: "carousel" },
                ],
            },
        },
        {
            title: 'Content',
            name: 'content',
            type: 'contentEditor',
            group: 'content',
        },
        {
            title: 'Limit Blog',
            name: 'limit',
            type: 'number',
            group: 'settings',
        },
        {
            title: "Number of Columns",
            name: "columnNumber",
            type: "number",
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
                title: hasContent ? content[0].children[0].text : 'Blog Section',
            };
        },
    },
})