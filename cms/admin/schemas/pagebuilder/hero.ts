import {defineType} from 'sanity'
import {textAlign} from '../lib/classes'
import blockstoText from '../lib/block-to-text'

export default defineType({
  title: 'Hero',
  name: 'hero',
  type: 'object',
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    {
      title: 'Layout Type',
      name: 'layoutType',
      type: 'string',
      options: {
        list: [
          {title: 'Hero', value: 'hero'},
          {title: 'Slider', value: 'slider'},
          {title: 'Full Width Full Image', value: 'fullWidthFullImage'},
          {title: 'Containered Full Image', value: 'fullImageContainer'},
          {title: 'Side by Side Carousel', value: 'sideBysideCarousel'},
        ],
      },
      initialValue: 'static',
    },
    {
      title: 'Image Height',
      name: 'imageHeight',
      type: 'string',
      options: {
        list: [
          {title: 'Large', value: 'large'},
          {title: 'Medium', value: 'medium'},
          {title: 'Small', value: 'small'},
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
      title: 'Text Align',
      name: 'textAlign',
      type: 'string',
      hidden: ({parent}) =>
        parent?.layoutType !== 'hero' || parent?.layoutType !== 'sideBysideCarousel',
      options: {
        list: textAlign,
      },
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      hidden: ({parent}) => !['sideBysideCarousel', 'slider'].includes(parent?.layoutType),
      of: [
        {
          title: 'Image',
          type: 'image',
          fields: [
            {
              title: 'Content',
              name: 'content',
              type: 'contentEditor',
            },
            {
              title: 'Primary Button',
              name: 'button',
              type: 'buttonSettings',
            },
            {
              title: 'Secondary Button',
              name: 'secondaryButton',
              type: 'secondaryButton',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      group: 'content',
      hidden: ({parent}) =>
        parent?.layoutType === 'sideBysideCarousel' || parent?.layoutType === 'slider',
    },
    {
      title: 'Priority',
      name: 'priority',
      type: 'boolean',
      description:
        'Should this image be loaded with high priority? Use only for the main above-the-fold hero.',
    },
    {
      title: 'Image Overlay Color',
      name: 'imageOverlayColor',
      hidden: ({parent}) => !['hero', 'slider'].includes(parent?.layoutType),
      type: 'color',
    },
    {
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'color',
      hidden: ({parent}) => parent?.layoutType === 'hero',
    },
    {
      title: 'Primary Button',
      name: 'button',
      type: 'buttonSettings',
      group: 'content',
      hidden: ({parent}) =>
        parent?.layoutType !== 'hero' || parent?.layoutType !== 'sideBysideCarousel',
    },
    {
      title: 'Secondary Button',
      name: 'secondaryButton',
      type: 'secondaryButton',
      group: 'content',
      hidden: ({parent}) =>
        parent?.layoutType !== 'hero' || parent?.layoutType !== 'sideBysideCarousel',
    },
    {
      title: 'Text Color',
      name: 'textColor',
      type: 'color',
      group: 'settings',
    },
    {
      title: 'Padding Top',
      name: 'paddingTop',
      type: 'string',
      group: 'settings',
      description: 'Add top padding using px, em, rem, or percentages',
      initialValue: '0', // ✅ sets default to '0'
    },
    {
      title: 'Padding Bottom',
      name: 'paddingBottom',
      type: 'string',
      group: 'settings',
      description: 'Add bottom padding using px, em, rem, or percentages',
      initialValue: '0', // ✅ sets default to '0'
    },
  ],
  preview: {
    select: {
      content: 'content',
      image: 'image',
      images: 'images',
    },
    prepare({content, image, images}) {
      const plain = content ? blockstoText(content) : ''

      const mediaImage = image?.asset || (images && images[0]?.asset)

      return {
        title: 'Hero',
        subtitle: plain,
        media: mediaImage,
      }
    },
  },
})
