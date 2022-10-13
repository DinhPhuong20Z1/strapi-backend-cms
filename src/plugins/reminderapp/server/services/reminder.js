'use strict';


module.exports = ({ strapi }) => ({
 async getall(query){
  strapi.db.query('plugin::reminderapp.reminder').updateMany({
    where:{
      datetime:{
        $lt:new Date()
      }
    },
    data:{
      isdatepassed:true
    }
  })
    const q=strapi.entityService.findMany("plugin::reminderapp.reminder",{
      filters:{
        isdatepassed:{
          $eq:false
        }
      }
    });
    return await q;
 } ,
  async deleteReminder(id) {
    return await strapi.entityService.delete("plugin::reminderapp.reminder", id);
  },
  async deleteReminderMany() {
    const q=strapi.entityService.deleteMany("plugin::reminderapp.reminder", {
      where:{
        date:{
          $lt:Date()
        }
      }
    });
    return await q
  },

  async createReminder(data) {
    return await strapi.entityService.create("plugin::reminderapp.reminder", data);
  },

  async updateReminder(id, data) {
    return await strapi.entityService.update("plugin::reminderapp.reminder", id, data);
  },
});
