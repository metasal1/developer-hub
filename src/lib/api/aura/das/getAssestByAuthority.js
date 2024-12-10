const getAssetsByAuthority = {
  description: 'Returns the list of assets given an authority address.',
  method: 'getAssetByAuthority',
  params: [
    {
      name: 'authorityAddress',
      type: 'string',
      description: 'Public key of the authority',
      placeholder: 'Public key of the authority',
      required: true,
    },
    {
      name: 'sortBy',
      type: 'object',
      description: 'Sorting criteria',
      value: {
        sortBy: {
          type: 'option',
          value: ['created', 'updated', 'recentAction', 'none'],
        },
        sortDirection: {
          type: 'option',
          value: ['asc', 'desc'],
        },
      },
    },
    {
      name: 'limit',
      type: 'number',
      description: 'Number of assets to return',
    },
    {
      name: 'page',
      type: 'number',
      description: 'The index of the "page" to retrieve.',
    },
    {
      name: 'before',
      type: 'string',
      description: 'Retrieve assets before the specified ID',
    },
    {
      name: 'after',
      type: 'string',
      description: 'Retrieve assets after the specified ID',
    },
  ],
  examples: null,
}

export default getAssetsByAuthority
