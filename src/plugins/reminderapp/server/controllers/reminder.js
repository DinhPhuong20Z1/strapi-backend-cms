'use strict';

module.exports={
    async getall(ctx){
        try{
            return await strapi.plugin("reminderapp").service("reminder").getall(ctx.query);
        }
        catch(err){
            ctx.trow(500,err);
        }
    },

    async deleteReminder(ctx) {
      try {
        ctx.body = await strapi
          .plugin("reminderapp").service("reminder")
          .deleteReminder(ctx.params.id);
      } catch (err) {
        ctx.throw(500, err);
      }
    },
    async deleteReminderMany(ctx) {
      try {
        ctx.body = await strapi
          .plugin("reminderapp").service("reminder")
          .deleteReminderMany();
      } catch (err) {
        ctx.throw(500, err);
      }
    },
  
    async createReminder(ctx) {
      try {
        ctx.body = await strapi
          .plugin("reminderapp").service("reminder")
          .createReminder(ctx.request.body);
      } catch (err) {
        ctx.throw(500, err);
      }
    },
  
    async updateReminder(ctx) {
      try {
        ctx.body = await strapi
          .plugin("reminderapp").service("reminder")
          .updateReminder(ctx.params.id, ctx.request.body);
      } catch (err) {
        ctx.throw(500, err);
      }
    },
    async toggle(ctx) {
        try {
          ctx.body = await strapi
            .plugin("reminderapp")
            .service("reminder")
            .toggle(ctx.params.id);
        } catch (err) {
          ctx.throw(500, err);
        }
      },
};