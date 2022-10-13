

module.exports = {
  beforeCreate(event) {
    // console.log("event",event);
    const { data } = event.params;

    // let's do a 20% discount everytime
    // event.params.data.price = event.params.data.price * 0.8;
  },

  async  afterCreate(event) {
  // afterCreate(event) {
    const { result, params } = event;
    try{

      // Lay truong RECRUITMENT_EMAIL_NOTI_HTML trong env dat ten la raw
      // Decode base64 tu raw sang s
      //


      // Noty to HR
      await strapi.plugins['email'].services.email.send({
        to: 'phuongdd@volio.vn',
        from: 'info@volio.vn', // e.g. single sender verification in SendGrid
        cc: 'info@volio.vn',
        bcc: 'info@volio.vn',
        replyTo: 'info@volio.vn',
        subject: '"Ứng viên gửi Jobs"',
        text:`Bạn vừa nhận được Jobs của ${result.Name} ứng tuyển ${result.CareerTitle} vị trí ${result.CareerType}`,
      })

      // Thank you letter
      await strapi.plugins['email'].services.email.send({
        to: result.Email,
        from: 'info@volio.vn', // e.g. single sender verification in SendGrid
        cc: 'info@volio.vn',
        bcc: 'info@volio.vn',
        replyTo: 'info@volio.vn',
        subject: 'Công ty TNHH Volio Việt Nam',
        text:`Cảm ơn bạn ${result.Name} đã ứng tuyển job ${result.CareerTitle}. Chúng tôi sẽ phản hồi thông tin sớm nhất với bạn.`,
      })

  } catch(err) {
      console.log("err nay",err);
  }

    // do something to the result;
  },
};
