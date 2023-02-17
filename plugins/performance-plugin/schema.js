import {defineType} from 'sanity'
import {CustomInput} from '../../components/CustomInput'

export const performanceSchema = defineType({
  title: 'performance plugin',
  type: 'object',
  name: 'performance',
  fields: [
    {
      title: 'Link for performance',
      name: 'link',
      type: 'url',
      components: {
        input: CustomInput,
      },
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['https'],
        }),
    },
  ],
  preview: {
    // select: {
    //   body: 'body',
    // },
  },
})
