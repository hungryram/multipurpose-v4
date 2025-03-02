import { defineType } from "sanity";
import { AiOutlineFontColors, AiOutlineFontSize } from "react-icons/ai";

export default defineType({
  title: "Content Editor",
  name: "contentEditor",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          { name: "color", title: "Color", type: "color", icon: AiOutlineFontColors },
          {
            title: "Font Size",
            name: "fontSize",
            type: "object",
            icon: AiOutlineFontSize,
            fields: [
              {
                title: "Size (px)",
                name: "size",
                type: "string",
                options: {
                  list: Array.from({ length: 16 }, (_, i) => {
                    const pxValue = (i * 2) + 10; // Generates 10px, 12px, ..., 40px
                    return { title: `${pxValue}px`, value: `${pxValue}px` };
                  }),
                },
              },
            ],
          },
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              { title: "URL", name: "href", type: "string" },
              { title: "Open in New Tab", name: "newTab", type: "boolean" },
            ],
          },
        ],
      },
    },
    {
      type: "image",
      fields: [
        {
          title: "Image Width",
          name: "imageWidth",
          type: "number",
          validation: (Rule) => Rule.min(50).max(2000).error("Width must be between 50px and 2000px"),
        },
        {
          title: "Image Align",
          name: "imageAlign",
          type: "string",
          options: {
            list: [
              { title: "Left", value: "left" },
              { title: "Center", value: "center" },
              { title: "Right", value: "right" },
            ],
          },
        },
        {
          title: "Alt Tag",
          name: "altTag",
          type: "string",
          description: "Describe your image",
          validation: (Rule) => Rule.required().error("Alt tag is required for accessibility"),
        },
      ],
    },
    { type: "youtube" },
    { type: "coding" },
    {
      title: "Icon Text Link",
      name: "iconTextLink",
      type: "object",
      fields: [
        {
          title: "Text",
          name: "text",
          type: "string",
          validation: (Rule) => Rule.required().error("Text is required"),
        },
        {
          title: "Link",
          name: "link",
          type: "string",
          validation: (Rule) => Rule.uri().error("Must be a valid URL"),
        },
        {
          title: "Icon",
          name: "icon",
          type: "string",
          options: {
            list: [
              { title: "Phone", value: "phone" },
              { title: "Pin", value: "pin" },
              { title: "Envelope", value: "envelope" },
              { title: "Right Caret", value: "rightCaret" },
              { title: "Left Caret", value: "leftCaret" },
            ],
          },
        },
      ],
    },
  ],
});
