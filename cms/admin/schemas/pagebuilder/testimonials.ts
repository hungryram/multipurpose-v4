import {defineType} from 'sanity'
import {
  colorOptions,
  paddingBottom,
  paddingTop,
  primaryButton,
  secondaryButton,
  textAlign,
} from '../lib/classes'
import blockstoText from "../lib/block-to-text"

export default defineType({
  title: 'Testimonials',
  name: 'testimonialBuilder',
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
          {title: 'Grid', value: 'gridView'},
          {title: 'Carousel', value: 'slider'},
          {title: 'Single Column', value: 'column'},
        ],
      },
      initialValue: 'gridView',
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
      title: 'Number of Slides',
      name: 'slideNumber',
      validation: (Rule) => Rule.error().min(1).max(3),
      hidden: ({parent}) => parent?.layoutType === 'gridView',
      type: 'number',
      group: 'settings',
    },
    {
      title: 'Navigation Arrow Colors',
      name: 'navigationColors',
      hidden: ({parent}) => parent?.layoutType === 'gridView',
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
    prepare({content}) {
      const plain = content ? blockstoText(content) : ''

      return {
        title: 'Testimonials',
        subtitle: plain,
      }
    },
  },
})
