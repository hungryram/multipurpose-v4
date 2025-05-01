import { defineType } from "sanity";

export default defineType({
    title: 'Form Builder',
    name: 'formBuilder',
    type: 'object',
    fields: [
        {
            title: 'Subject',
            name: 'subject',
            type: 'string',
            description: 'The subject of the form',
            validation: (Rule) => Rule.required().error('Subject Required'),
        },
        {
            title: 'Send To',
            name: 'sendTo',
            type: 'string',
            description: 'What email would you like to receive these alerts to',
            validation: (Rule) => Rule.required().error('Email Required'),
        },
        {
            title: 'Google Spreadsheet ID',
            name: 'spreadsheetId',
            type: 'string',
        },
        {
            title: 'Google Sheet Name',
            name: 'sheetName',
            type: 'string',
            description: 'Allows form submissions to flow through Google Sheet'
        },
        {
            title: 'Cc',
            name: 'emailCc',
            type: 'string',
        },
        {
            title: 'Bcc',
            name: 'emailBcc',
            type: 'string',
        },
        {
            title: 'Send Email From',
            name: 'sendFrom',
            type: 'string',
            description: 'What email you want to send from. Must be verified.',
        },
        {
            title: 'Redirect To',
            name: 'redirectTo',
            type: 'string',
            description: 'Enter the URL the form redirects to after submitting',
        },
        {
            title: 'Button Label',
            name: 'buttonLabel',
            type: 'string',
        },
        {
            title: 'Button Background Color',
            name: 'buttonBackgroundColor',
            type: 'color',
        },
        {
            title: 'Button Text Color',
            name: 'buttonTextColor',
            type: 'color',
        },
        {
            title: 'Form Fields',
            name: 'fields',
            type: 'array',
            of: [
                {
                    title: 'Form Field',
                    type: 'object',
                    name: 'formField',
                    fields: [
                        {
                          title: 'Label',
                          name: 'label',
                          type: 'string',
                          description: 'The label for the form field',
                          validation: (Rule) =>
                            Rule.custom((val, context) => {
                              if (context.parent?.type !== 'description' && !val) {
                                return 'Label is required';
                              }
                              return true;
                            }),
                        },
                        {
                          title: 'Description Text',
                          name: 'descriptionText',
                          type: 'text',
                          rows: 3,
                          hidden: ({ parent }) => parent?.type !== 'description',
                        },
                        {
                          title: 'Placeholder',
                          name: 'placeholder',
                          type: 'string',
                          hidden: ({ parent }) => parent?.type === 'description',
                        },
                        {
                          title: 'Make Half Width',
                          name: 'half',
                          type: 'boolean',
                          hidden: ({ parent }) => parent?.type === 'description',
                        },
                        {
                          title: 'Type',
                          name: 'type',
                          type: 'string',
                          description: 'The type of form field (e.g., text, email, checkbox, etc.)',
                          options: {
                            list: [
                              { title: 'Text', value: 'text' },
                              { title: 'Email', value: 'email' },
                              { title: 'Phone', value: 'phone' },
                              { title: 'Checkbox', value: 'checkbox' },
                              { title: 'Select', value: 'select' },
                              { title: 'Radio Buttons', value: 'radio' },
                              { title: 'Textarea', value: 'textarea' },
                              { title: 'State', value: 'state' },
                              { title: 'Description Text', value: 'description' },
                              { title: 'Date', value: 'date' },
                            ],
                          },
                        },
                        {
                          title: 'Hide Label',
                          name: 'hideLabel',
                          type: 'boolean',
                          hidden: ({ parent }) => parent?.type === 'description',
                        },
                        {
                          title: 'Required',
                          name: 'required',
                          type: 'boolean',
                          hidden: ({ parent }) => parent?.type === 'description',
                        },
                        {
                          title: 'Display Stacked',
                          name: 'stacked',
                          type: 'boolean',
                          description: 'Enable this to show a stacked layout',
                          hidden: ({ parent }) =>
                            parent?.type !== 'radio' && parent?.type !== 'checkbox',
                        },
                        {
                          title: 'Checkbox Values',
                          name: 'checkBoxValue',
                          type: 'array',
                          of: [{ type: 'string' }],
                          hidden: ({ parent }) => parent?.type !== 'checkbox',
                        },
                        {
                          title: 'Radio Values',
                          name: 'radioValue',
                          type: 'array',
                          of: [{ type: 'string' }],
                          hidden: ({ parent }) => parent?.type !== 'radio',
                        },
                        {
                          title: 'Select Dropdown Values',
                          name: 'selectValue',
                          type: 'array',
                          of: [{ type: 'string' }],
                          hidden: ({ parent }) => parent?.type !== 'select',
                        },
                      ],
                      
                },
            ],
        },
        {
            title: 'Form Disclaimer',
            name: 'formDisclaimer',
            type: 'contentEditor',
        },
        {
            title: 'Make Stacked',
            name: 'makeStacked',
            type: 'boolean',
        },
    ],
})