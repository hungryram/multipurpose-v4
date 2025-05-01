import { defineType } from "sanity";

export default defineType({
    name: 'location',
    title: 'Location',
    type: 'object',
    options: {
        collapsible: true,
        collapsed: true
    },
    fields: [
        {
            name: 'address',
            type: 'string',
            title: 'Address'
        },
        {
            name: 'city',
            type: 'string',
            title: 'City'
        },
        {
            name: 'state',
            type: 'string',
            title: 'State'
        },
        {
            name: 'zip_code',
            type: 'string',
            title: 'Zip Code'
        },
    ]
})