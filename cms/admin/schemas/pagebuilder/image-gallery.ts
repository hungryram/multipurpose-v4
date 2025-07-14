import {defineType} from 'sanity'
import React from 'react'
import {
  colorOptions,
  paddingBottom,
  paddingTop,
  primaryButton,
  secondaryButton,
  textAlign,
} from '../lib/classes'

export default defineType({
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
  groups: [
    {title: 'Content', name: 'content'},
    {title: 'Settings', name: 'settings'},
  ],
  fields: [
    {
      title: 'Layout Type',
      name: 'layoutType',
      type: 'string',
      options: {
        list: [
          {title: 'Slider', value: 'slider'},
          {title: 'Grid', value: 'grid'},
          {title: 'Masonry', value: 'masonry'},
        ],
      },
      initialValue: 'masonryGallery',
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
      options: {
        list: textAlign,
      },
    },
    primaryButton,
    secondaryButton,
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          title: 'Image',
          name: 'image',
          type: 'image',
        },
      ],
      options: {
        layout: 'grid',
      },
    },
    {
      title: 'Disable Navigation Arrows',
      name: 'disableNavigation',
      hidden: ({parent}) => parent?.layoutType === 'masonryGallery',
      type: 'boolean',
      group: 'settings',
    },
    {
      title: 'Autoplay',
      name: 'autoplay',
      hidden: ({parent}) => parent?.layoutType !== 'slider',
      type: 'boolean',
      group: 'settings',
    },
    {
      title: 'Autoplay Speed',
      name: 'autoplaySpeed',
      hidden: ({parent}) => parent?.layoutType !== 'slider',
      type: 'number',
      group: 'settings',
      description: 'Change the speed of slider by milliseconds.',
    },
    {
      title: 'Navigation Arrow Colors',
      name: 'navigationColors',
      hidden: ({parent}) => parent?.layoutType === 'masonryGallery',
      type: 'color',
      group: 'settings',
    },
    {
      title: 'Duration',
      name: 'duration',
      type: 'number',
      hidden: ({parent}) => parent?.layoutType !== 'slider',
      group: 'settings',
      description: 'Change the speed of slider. Higher number slows slider',
    },
    {
      title: 'Number of Slides',
      name: 'slideNumber',
      type: 'number',
      validation: (Rule) => Rule.error().min(1).max(5),
      hidden: ({parent}) => parent?.layoutType === 'masonryGallery',
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
    prepare({content}) {
      const hasContent = content && content[0]?.children?.length > 0

      return {
        title: hasContent ? content[0].children[0].text : 'Image Gallery',
      }
    },
  },
})
