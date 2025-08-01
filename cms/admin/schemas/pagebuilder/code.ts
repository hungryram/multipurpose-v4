import { defineType } from "sanity";

export default defineType({
  title: 'Code Block',
  name: 'codeBlock',
  type: 'object',
  fields: [
    {
      title: 'Code',
      name: 'code',
      type: 'text',
      description: 'Paste in your code.',
    },
  ],
  preview: {
    select: {
      code: 'code',
    },
    prepare({ code }) {
      return {
        title: 'Code Block',
        subtitle: code || '',
      }
    },
  },
})
