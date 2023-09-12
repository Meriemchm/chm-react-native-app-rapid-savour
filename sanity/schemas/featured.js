export default {
    name: 'featured',
    title: 'Featured',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Featured name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Featured description',
        type: 'string',
        validation: (Rule) => Rule.max(200),
      },
      {
        name: 'restaurant',
        title: 'Restaurant',
        type: 'array',
        of:[{ type: "reference" , to:[{type:"restaurants"}]}]
      },
    
    ],
  }
  