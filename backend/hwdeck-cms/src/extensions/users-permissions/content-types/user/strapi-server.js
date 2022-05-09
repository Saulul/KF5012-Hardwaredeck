"use strict";

module.exports = {
  async find(ctx, next) {
    const { id } = ctx.params;

    return await strapi.query("plugin::users-permissions.user").findOne({
      where: { id },

      populate: ["role"],
    });
  },
};
