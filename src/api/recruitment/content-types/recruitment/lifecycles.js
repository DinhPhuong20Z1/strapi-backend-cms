module.exports = {
  beforeCreate(event) {
    // console.log("event",event);
    const { data } = event.params;

    // let's do a 20% discount everytime
    // event.params.data.price = event.params.data.price * 0.8;
  },

  async afterCreate(event) {
    // afterCreate(event) {
    const { result, params } = event;
    try {
      // Lay truong RECRUITMENT_EMAIL_NOTI_HTML trong env dat ten la raw
      // Decode base64 tu raw sang s
      //

      let file = [];
      if (result.Files.length > 0) {
        for (let i = 0; i < result.Files.length; i++) {
          file.push(result.Files[i].URL);
        }
      }


      // Noty to HR
      if (result.CareerTitle || result.CareerType) {
        await strapi.plugins["email"].services.email.send({
          to: process.env.AWS_SES_EMAIL_TO_ADMIN,
          from: process.env.AWS_SES_EMAIL_FROM, // e.g. single sender verification in SendGrid
          cc: process.env.AWS_SES_EMAIL_TO_CC,
          bcc: process.env.AWS_SES_EMAIL_TO_BCC,
          replyTo: process.env.AWS_SES_EMAIL_REPLY,
          subject: '"Ứng viên gửi Jobs"',
          text: `Bạn vừa nhận được Jobs của ${result.Name} ứng tuyển ${
            result.CareerTitle
          } vị trí ${
            result.CareerType
          }. Xem chi tiết tại https://cms.volio.vn/admin/plugins/recruitment .Link file kèm: ${file.join(
            "+"
          )}`,
        });

        // Thank you letter
        await strapi.plugins["email"].services.email.send({
          to: result.Email,
          from: process.env.AWS_SES_EMAIL_FROM, // e.g. single sender verification in SendGrid
          subject: process.env.AWS_SES_EMAIL_SUBJECT_JOB,
          text: process.env.AWS_SES_EMAIL_TEXT_JOB,
        });
      } else {
        await strapi.plugins["email"].services.email.send({
          to: process.env.AWS_SES_EMAIL_TO_ADMIN,
          from: process.env.AWS_SES_EMAIL_FROM, // e.g. single sender verification in SendGrid
          cc: process.env.AWS_SES_EMAIL_TO_CC,
          bcc: process.env.AWS_SES_EMAIL_TO_BCC,
          replyTo: process.env.AWS_SES_EMAIL_REPLY,
          subject: '"Liên hệ volio"',
          text: `Bạn vừa nhận được đơn liên hệ của ${
            result.Name
          }. Xem chi tiết tại https://cms.volio.vn/admin/plugins/recruitment .Link file kèm: ${file.join(
            "+"
          )}`,
        });

        // Thank you letter
        await strapi.plugins["email"].services.email.send({
          to: result.Email,
          from: process.env.AWS_SES_EMAIL_FROM, // e.g. single sender verification in SendGrid
          subject: process.env.AWS_SES_EMAIL_SUBJECT_CONTACT,
          text: process.env.AWS_SES_EMAIL_TEXT_CONTACT,
        });
      }
    } catch (err) {
      console.log("err nay", err);
    }

    // do something to the result;
  },
};
