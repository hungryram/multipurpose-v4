import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
      description: 'A brief description of this category'
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true
      },
      description: 'Optional image for the category page'
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'color',
      group: 'content',
      description: 'Color theme for this category'
    }),
    defineField({
      title: 'Search Engine Optimization',
      name: 'seo',
      type: 'seo',
      group: 'settings'
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      description: 'description'
    },
    prepare(selection) {
      const { title, media, description } = selection
      return {
        title,
        media,
        subtitle: description ? description.slice(0, 60) + '...' : 'No description'
      }
    },
  },
})
