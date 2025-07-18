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
  title: 'Content Field',
  name: 'contentField',
  type: 'object',
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
          {title: 'Simple Full Width', value: 'simpleFullWidth'},
          {title: 'Two Column', value: 'twoColumn'},
          {title: 'Prose', value: 'prose'},
          {title: 'Article', value: 'article'},
        ],
      },
      initialValue: 'simpleFullWidth',
    },
    {
      title: 'Max Width',
      name: 'maxWidth',
      type: 'string',
      options: {
        list: [
          {title: 'Full Width', value: 'full'},
          {title: 'Max Width Small', value: 'sm'},
          {title: 'Max Width Medium', value: 'md'},
          {title: 'Max Width Large', value: 'lg'},
          {title: 'Max Width Extra Large', value: 'xl'},
          {title: 'Max Width 2XL', value: '2xl'},
          {title: 'Max Width 3XL', value: '3xl'},
          {title: 'Max Width 4XL', value: '4xl'},
          {title: 'Max Width 5XL', value: '5xl'},
          {title: 'Max Width 6XL', value: '6xl'},
          {title: 'Max Width 7XL', value: '7xl'},
        ],
      },
      initialValue: 'sm',
    },
    {
      title: 'Column Gap',
      name: 'columnGap',
      hidden: ({parent}) => parent?.layoutType !== 'twoColumn',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'sm'},
          {title: 'Medium', value: 'md'},
          {title: 'Large', value: 'lg'},
          {title: 'Extra Large', value: 'xl'},
        ],
      },
      initialValue: 'sm',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'contentEditor',
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
        title: 'Content Field',
        subtitle: plain,
      }
    },
  },
})
