import {defineField, defineType} from 'sanity'
import {ControlsIcon} from '@sanity/icons'

export default defineType({
  name: 'siteConfig',
  type: 'document',
  title: 'Settings',
  icon: ControlsIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name of the website',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Domain',
      name: 'domain',
      type: 'url',
      description:
        'The website domain without slash and protocol, e.g google.com. Used for the canonical url.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
      }
    },
  },
})
