import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, primaryButton, secondaryButton, textAlign } from "../lib/classes";

export default defineType({
    title: 'Content Field',
    name: 'contentField',
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
                    { title: "Simple Full Width", value: "simpleFullWidth" },
                    { title: "Narrow Container", value: "narrowContainer" },
                    { title: "Two Column", value: "twoColumn" },
                ],
            },
            initialValue: "simpleFullWidth"
        },
        {
            title: 'Heading',
            name: 'heading',
            type: 'string',
            hidden: ({ parent }) => parent?.layoutType === 'simpleFullWidth' || parent?.layoutType === 'narrowContainer' || parent?.layoutType === undefined
        },
        {
          title: 'Content',
          name: 'content',
          type: 'contentEditor'
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
            title: hasContent ? content[0].children[0].text : 'Content Section',
          };
        },
      },
})