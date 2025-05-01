import { defineType } from "sanity";
import { BsLink } from 'react-icons/bs'

export default defineType({
    name: 'navigation',
    title: 'Navigation',
    type: 'document',
    icon: BsLink,
    fields: [
        {
            title: "Menu Name",
            name: "title",
            type: "string",
          },
          {
            name: "items",
            type: "array",
            title: "Navigation links",
            of: [{ type: "navigationItem" }]
          }
    ]
})