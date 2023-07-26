export default {
    name: 'restaurants',
    title: 'Restaurants',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Restaurant name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Restaurant description',
        type: 'string',
        validation: (Rule) => Rule.max(200),
      },
      {
        name: 'image',
        title: 'Restaurant image',
        type: 'image',
      },
      {
        name: 'address',
        title: 'Restaurant address',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'rating',
        title: 'Restaurant rating',
        type: 'number',
        validation: (Rule) =>
          Rule.required().min(1).max(5).error('Please enter a value between 1 and 5'),
      },
      {
        name: 'type',
        title: 'category',
        validation: (Rule) => Rule.required(),
        type: 'reference',
        to: [{type: 'category'}],
      },
      {
        name: 'dishes',
        title: 'Dishes',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'dish'}]}],
      },
    ],
  }
  