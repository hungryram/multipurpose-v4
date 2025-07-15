import { defineType } from "sanity";
import { colorOptions, paddingBottom, paddingTop, primaryButton, secondaryButton, textAlign } from "../lib/classes";
import blockstoText from "../lib/block-to-text"


export default defineType({
  title: 'Lead Form',
  name: 'leadForm',
  type: 'object',
  groups: [
    { title: 'Content', name: 'content' },
    { title: 'Settings', name: 'settings' },
  ],
  fields: [
    {
      title: 'Layout Type',
      name: 'layoutType',
      type: 'string',
      options: {
        list: [
          { title: 'One Column', value: 'oneColumn' },
          { title: 'Two Column', value: 'twoColumn' },
        ]
      },
      initialValue: "oneColumn"

    },
    {
      title: 'Content',
      name: 'content',
      type: 'contentEditor',
      group: 'content'
    },
    {
      title: 'Form Content',
      name: 'formContent',
      type: 'contentEditor',
      group: 'content',
      hidden: ({ parent }) => parent?.layoutType === 'oneColumn',
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
      title: 'Align Content Center',
      name: 'alignContentCenter',
      type: 'boolean',
      hidden: ({ parent }) => parent?.layoutType !== 'twoColumn',
    },
    primaryButton,
    secondaryButton,
    colorOptions,
    paddingTop,
    paddingBottom,
    {
      title: 'Form Builder',
      name: 'formBuilder',
      type: 'formBuilder'
    },
    {
      title: 'Label Color',
      name: 'labelColor',
      type: 'color'
    },
    {
      title: 'Form Background Color',
      name: 'formBackgroundColor',
      type: 'color'
    },
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({ content }) {
      const plain = content ? blockstoText(content) : ''

      return {
        title: 'Lead Form',
        subtitle: plain,
      }
    },
  },
})