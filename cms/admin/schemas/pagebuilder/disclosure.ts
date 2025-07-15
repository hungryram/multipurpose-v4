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
  title: 'Disclosure Section',
  name: 'disclosureSection',
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
          {title: 'Default', value: 'default'},
          {title: 'Side Content', value: 'contentSide'},
          {title: 'Two Column', value: 'twoColumn'},
          {title: 'Sidebar', value: 'sidebar'},
          {title: 'Tabbed', value: 'tabbed'},
        ],
      },
    },
    {
      title: 'Content',
      name: 'content',
      group: 'content',
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
    {
      title: 'Disclosures',
      name: 'disclosures',
      group: 'content',
      type: 'array',
      description: 'This section works best for drop downs like FAQ',
      of: [
        {
          title: 'Disclosure Block',
          name: 'disclosureBlock',
          type: 'object',
          fields: [
            {
              title: 'Heading',
              name: 'heading',
              type: 'string',
            },
            {
              title: 'Content',
              name: 'content',
              type: 'contentEditor',
            },
          ],
        },
      ],
    },
    {
      title: 'Disclosure Background Color',
      name: 'disclosureBackgroundColor',
      type: 'color',
      hidden: ({parent}) => parent?.layoutType === 'separated',
      options: {
        disableAlpha: true,
      },
      group: 'settings',
    },
    {
      title: 'Disclosure Header Color',
      name: 'disclosureTextColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
      group: 'settings',
    },
    {
      title: 'Disclosure Content Color',
      name: 'disclosureContentColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
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
        title: 'Disclosure Section',
        subtitle: plain,
      }
    },
  },
})
