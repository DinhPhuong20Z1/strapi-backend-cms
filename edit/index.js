"use strict";

module.exports = {
  init: (providerOptions = {}, settings = {}) => {
    const ses = require("node-ses");
    const client = ses.createClient(providerOptions);

    return {
      send: async (options) => {
        options.message = options.text;
        options.from = options.from || settings.defaultFrom;
        options.replyTo = options.replyTo || settings.defaultReplyTo;

        return await new Promise((resolve, reject) => {
          client.sendEmail(
            { ...options, ...settings },
            function (err, data, res) {
              if (data) {
                return resolve(data);
              }
              if (err) {
                return reject(err);
              }
            }
          );
        });
      },
    };
  },
};
