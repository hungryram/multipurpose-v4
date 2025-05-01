import { defineType } from "sanity";

export default defineType({
    title: 'Code Block',
    name: 'coding',
    type: 'object',
    fields: [
        {
            title: 'Code',
            name: 'codeEditor',
            type: 'text'
        }
    ]
})