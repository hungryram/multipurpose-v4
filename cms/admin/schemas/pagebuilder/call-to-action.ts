import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, primaryButton, secondaryButton, textAlign } from "../lib/classes";

export default defineType({
    title: 'Call to Action',
    name: 'ctaSection',
    type: 'object',
    groups: [
        { title: 'Content', name: 'content' },
        { title: 'Settings', name: 'settings' },
    ],
    fields: [
        {
            title: "Layout Type",
            name: "layoutType",
            type: "string",
            options: {
                list: [
                    { title: "Text and Image", value: "text-image" },
                    { title: "Banner", value: "banner" },
                    { title: "Full Width Text & Image", value: "fullWidthTextImage" },
                ],
            },
            initialValue: "banner"
        },
        {
            title: "Column Layout",
            name: "columnLayout",
            type: "string",
            hidden: ({ parent }) => parent?.layoutType !== "text-image",
            options: {
                list: [
                    { title: "1/2 Columns", value: "half" },
                    { title: "2/5 and 3/5", value: "twoFifths" },
                    { title: "1/3 and 2/3", value: "oneThird" },
                    { title: "1/4 and 3/4", value: "oneFourth" },
                    { title: "3/5 and 2/5", value: "threeFifth" },
                    { title: "2/3 and 1/3", value: "twoThirds" },
                ],
            },
            initialValue: "half"
        },
        {
            title: 'Text',
            name: 'content',
            type: 'contentEditor',
            group: 'content',
        },
        {
            title: 'Text Align',
            name: 'textAlign',
            type: 'string',
            options: {
                list: textAlign
            },
            initialValue: "text-center mx-auto justify-center"
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            hidden: ({ parent }) => parent?.layoutType === "banner",
        },
        {
            title: 'Reverse Column',
            name: 'reverseColumn',
            type: 'boolean',
            hidden: ({ parent }) => parent?.layoutType === "banner"
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
                title: hasContent ? content[0].children[0].text : 'Call to Action',
            };
        },
    },
})