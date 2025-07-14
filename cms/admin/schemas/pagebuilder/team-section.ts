import {defineType} from 'sanity'
import {
  colorOptions,
  paddingBottom,
  paddingTop,
  primaryButton,
  secondaryButton,
  textAlign,
} from '../lib/classes'
import {toPlainText} from 'next-sanity'

export default defineType({
  title: 'Team Display',
  name: 'teamDisplay',
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
          {title: 'Grid', value: 'grid'},
          {title: 'List', value: 'list'},
          {title: 'Carousel', value: 'carousel'},
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
      options: {
        list: textAlign,
      },
    },
    {
      title: 'Number of Columns',
      name: 'columnNumber',
      type: 'number',
    },
    {
      title: 'Limit Team',
      name: 'limit',
      type: 'number',
      group: 'settings',
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
    prepare({content}) {
      const plain = content ? toPlainText(content) : ''

      return {
        title: 'Team Section',
        subtitle: plain,
      }
    },
  },
})
