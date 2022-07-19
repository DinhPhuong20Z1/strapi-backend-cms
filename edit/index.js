"use strict";

const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

module.exports = {
  init(providerOptions = {}, settings = {}) {
    //var client = nodeSES.createClient({ ...providerOptions });
    var client = new SESClient({
      region: providerOptions.region,
      credentials: {
        accessKeyId: providerOptions.key,
        secretAccessKey: providerOptions.secret,
      },
    });

    return {
      send(options) {
        // return new Promise((resolve, reject) => {
        const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } =
          options;

        let msg = {
          from: from || settings.defaultFrom,
          to,
          cc,
          bcc,
          replyTo: replyTo || settings.defaultReplyTo,
          subject,
          altText: text || "",
          message: html || "",
          ...rest,
        };

        // Set the parameters
        const params = {
          Destination: {
            /* required */
            /*
            BccAddresses: [
                msg.bcc
            ],
            CcAddresses: [
                msg.cc
            ],
            */
            ToAddresses: [msg.to],
          },
          Message: {
            /* required */
            Body: {
              /* required */
              Html: {
                Charset: "UTF-8",
                Data: msg.message,
              },
              Text: {
                Charset: "UTF-8",
                Data: msg.altText,
              },
            },
            Subject: {
              Charset: "UTF-8",
              Data: msg.subject,
            },
          },
          Source: msg.from, // SENDER_ADDRESS
          ReplyToAddresses: [msg.replyTo],
        };
        var command = new SendEmailCommand(params);

        return client.send(command);
        /*.(removeUndefined(msg), function(err) {
        if (err) {
          if (err.Message) {
            reject(`${err.Message} ${err.Detail ? err.Detail : ''}`);
          }
          reject(err);
        } else {
          resolve();
        }

      });

    });*/
      },
    };
  },
};
