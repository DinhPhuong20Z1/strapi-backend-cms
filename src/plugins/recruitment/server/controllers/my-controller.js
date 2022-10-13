'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('recruitment')
      .service('myService')
      .getWelcomeMessage();
  },
});
