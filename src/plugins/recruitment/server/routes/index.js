module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  // {
  //   method: 'GET',
  //   path: '/api/recruitments',
  //   handler: 'recruitment.recruitment',
  //   config: {
  //     policies: [],
  //     auth:false,
  //   },
  // },
];
