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
                            validation: (Rule) => Rule.required().error('Name your input field'),
                        },
                        {
                            title: 'Placeholder',
                            name: 'placeholder',
                            type: 'string'
                        },
                        {
                            title: 'Make Half Width',
                            name: 'half',
                            type: 'boolean'
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
                                    // { title: 'File Attachments', value: 'file' }
                                    // Add more field types as needed
                                ],
                            },
                        },
                        // {
                        //     title: 'Display Inline',
                        //     description: 'Makes button display next to field. Useful for newsletter or signups',
                        //     name: 'inlineEmail',
                        //     type: 'boolean',
                        //     hidden: ({ parent }) => parent?.type !== "email",
                        // },
                        {
                            title: 'Hide Label',
                            name: 'hideLabel',
                            type: 'boolean',
                        },
                        {
                            title: 'Required',
                            name: 'required',
                            type: 'boolean'
                        },
                        {
                            title: 'Display Stacked',
                            name: 'stacked',
                            type: 'boolean',
                            description: 'Enable this to show stacked a stacked layout',
                            hidden: ({ parent }) => parent?.type !== "radio" && parent?.type !== "checkbox",
                        },
                        {
                            title: 'Checkbox Values',
                            name: 'checkBoxValue',
                            type: 'array',
                            hidden: ({ parent }) => parent?.type !== "checkbox",
                            of: [
                                { type: 'string' }
                            ]
                        },
                        {
                            title: 'Radio Values',
                            name: 'radioValue',
                            type: 'array',
                            hidden: ({ parent }) => parent?.type !== "radio",
                            of: [
                                { type: 'string' }
                            ]
                        },
                        {
                            title: 'Select Dropdown Values',
                            name: 'selectValue',
                            type: 'array',
                            hidden: ({ parent }) => parent?.type !== "select",
                            of: [
                                { type: 'string' }
                            ]
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