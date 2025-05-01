import { MdOutlineArticle } from 'react-icons/md'
import { defineType } from 'sanity'

import authorType from './author'

/**
 * This file is the schema definition for a post.
 *
 * Here you'll be able to edit the different fields that appear when you 
 * create or edit a post in the studio.
 * 
 * Here you can see the different schema types that are available:

  https://www.sanity.io/docs/schema-types

 */

export default defineType({
  name: 'blog',
  title: 'Blog',
  icon: MdOutlineArticle,
  type: 'document',
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      group: 'content',
      type: 'contentEditor',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      group: 'content',
      description: 'A brief introduction to your blog post.',
      type: 'text',
      validation: Rule => Rule.error().max(300)
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true
      }
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      group: 'content',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: [{ type: authorType.name }],
    },
    {
      title: 'Search Engine Optimization',
      name: 'seo',
      type: 'seo',
      group: 'settings'
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      group: 'content',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
