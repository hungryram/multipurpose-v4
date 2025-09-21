import {defineType} from 'sanity'
import {AiOutlineFontColors, AiOutlineFontSize, AiOutlineCode} from 'react-icons/ai'
import CodeBlockPreview from '../components/CodeBlockPreview'

export default defineType({
  title: 'Content Editor',
  name: 'contentEditor',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
        {
          title: 'Code Block', 
          value: 'codeHighlight',
          component: CodeBlockPreview
        },
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
        ],
        annotations: [
          {name: 'color', title: 'Color', type: 'color', icon: AiOutlineFontColors},
          {
            title: 'Font Size',
            name: 'fontSize',
            type: 'object',
            icon: AiOutlineFontSize,
            fields: [
              {
                title: 'Size (px)',
                name: 'size',
                type: 'string',
                options: {
                  list: Array.from({length: 32}, (_, i) => {
                    const pxValue = i * 2 + 10 // Generates 10px, 12px, ..., 40px
                    return {title: `${pxValue}px`, value: `${pxValue}px`}
                  }),
                },
              },
            ],
          },
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'Button Link',
                name: 'buttonLink',
                type: 'links',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      fields: [
        {
          title: 'Image Width',
          name: 'imageWidth',
          type: 'number',
          validation: (Rule) =>
            Rule.min(50).max(2000).error('Width must be between 50px and 2000px'),
        },
        {
          title: 'Image Align',
          name: 'imageAlign',
          type: 'string',
          options: {
            list: [
              {title: 'Left', value: 'left'},
              {title: 'Center', value: 'center'},
              {title: 'Right', value: 'right'},
            ],
          },
        },
        {
          title: 'Alt Tag',
          name: 'altTag',
          type: 'string',
          description: 'Describe your image',
          validation: (Rule) => Rule.required().error('Alt tag is required for accessibility'),
        },
      ],
    },
    {type: 'youtube'},
    {type: 'coding'},
    {
      title: 'BreadCrumb',
      name: 'breadCrumb',
      type: 'object',
      fields: [
        {
          title: 'Enable Breadcrumbs',
          name: 'enableBreadCrumb',
          type: 'boolean',
        },
        {
          title: 'Color',
          name: 'color',
          type: 'color',
        },
        {
          title: 'Text Align',
          name: 'textAlign',
          type: 'string',
          options: {
            list: [
              {title: 'Left', value: 'left'},
              {title: 'Center', value: 'center'},
              {title: 'Right', value: 'right'},
            ],
          },
        },
      ],
    },
    {
      title: 'Icon Text Link',
      name: 'iconTextLink',
      type: 'object',
      fields: [
        {
          title: 'Text',
          name: 'text',
          type: 'string',
          validation: (Rule) => Rule.required().error('Text is required'),
        },
        {
          title: 'Link',
          name: 'link',
          type: 'string',
          validation: (Rule) => Rule.uri().error('Must be a valid URL'),
        },
        {
          title: 'Icon',
          name: 'icon',
          type: 'string',
          options: {
            list: [
              {title: 'Phone', value: 'phone'},
              {title: 'Pin', value: 'pin'},
              {title: 'Envelope', value: 'envelope'},
              {title: 'Right Caret', value: 'rightCaret'},
              {title: 'Left Caret', value: 'leftCaret'},
            ],
          },
        },
      ],
    },
    {
      title: 'Button Array',
      name: 'buttonArray',
      type: 'object',
      fields: [
        {
          title: 'Buttons',
          name: 'buttons',
          type: 'array',
          of: [
            {
              title: 'Button',
              name: 'button',
              type: 'object',
              fields: [
                {
                  title: 'Button Link',
                  name: 'buttonLink',
                  type: 'links',
                },
                {
                  title: 'Button Style',
                  name: 'buttonStyle',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Primary', value: 'primary'},
                      {title: 'Secondary', value: 'secondary'},
                      {title: 'Outline', value: 'outline'},
                      {title: 'Text Only', value: 'text'},
                    ],
                  },
                  initialValue: 'primary',
                },
                {
                  title: 'Button Background Color',
                  name: 'buttonBackground',
                  type: 'color',
                  options: {
                    disableAlpha: true,
                  },
                },
                {
                  title: 'Button Text Color',
                  name: 'buttonTextColor',
                  type: 'color',
                  options: {
                    disableAlpha: true,
                  },
                },
              ],
              preview: {
                select: {
                  title: 'buttonLink.text',
                  subtitle: 'buttonStyle',
                },
                prepare({title, subtitle}) {
                  return {
                    title: title || 'Button',
                    subtitle: subtitle ? `Style: ${subtitle}` : 'No style selected',
                  }
                },
              },
            },
          ],
        },
        {
          title: 'Button Alignment',
          name: 'buttonAlignment',
          type: 'string',
          options: {
            list: [
              {title: 'Left', value: 'left'},
              {title: 'Center', value: 'center'},
              {title: 'Right', value: 'right'},
            ],
          },
          initialValue: 'left',
        },
        {
          title: 'Button Layout',
          name: 'buttonLayout',
          type: 'string',
          options: {
            list: [
              {title: 'Horizontal', value: 'horizontal'},
              {title: 'Vertical', value: 'vertical'},
            ],
          },
          initialValue: 'horizontal',
        },
      ],
      preview: {
        select: {
          buttons: 'buttons',
          alignment: 'buttonAlignment',
        },
        prepare({buttons, alignment}) {
          const buttonCount = buttons?.length || 0
          return {
            title: 'Button Array',
            subtitle: `${buttonCount} button${buttonCount !== 1 ? 's' : ''} - ${alignment || 'left'} aligned`,
          }
        },
      },
    },
  ],
})
