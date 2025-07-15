import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, textAlign } from "../lib/classes";
import blockstoText from "../lib/block-to-text"

export default defineType({
  title: 'Logos',
  name: 'logos',
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
              { title: "Grid", value: "grid" },
              { title: "Carousel", value: "slider" },
          ],
      },
      initialValue: "grid"
  },
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
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          title: 'Image',
          name: 'image',
          type: 'image',
        }
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      title: 'Number of Columns',
      name: 'columnNumber',
      type: 'number'
  },
    colorOptions,
    paddingTop,
    paddingBottom,
  ],
  preview: {
    select: {
      content: 'content',
      images: 'images',
    },
    prepare({ content, images }) {
      const plain = content ? blockstoText(content) : ''

      const mediaImage = images && images.length > 0 && images[0].asset

      return {
        title: 'Logos',
        subtitle: plain,
        media: mediaImage,
      }
    },
  },
})