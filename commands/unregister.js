
const mongoose = require('mongoose');
const AddressSchema = require('../models/adresesSchema')
const { EmbedBuilder} = require ("discord.js");
const {BuildIN} = require("../lib/emogi")
module.exports = {
    name:"unregister",
    async execute(interaction) {
        const success = new EmbedBuilder()
        .setColor(0x00ff00)
        .setDescription(`${BuildIN.Green_check}Your address have been removed`)

        const Fail = new EmbedBuilder()
        .setColor(0xff0000)
        .setDescription(`${BuildIN.X}You Have not registered your address.`)
        const userId = interaction.user.id;
        try {
          const result = await AddressSchema.findOneAndRemove({ userID: userId });
          if (!result) {
            return await interaction.reply({embeds:[Fail],ephemeral: true });
          }
          await interaction.reply({embeds:[success],ephemeral: true });
        } catch (error) {
          console.error(error);
          await interaction.reply('An error occurred while deleting your user profile.');
        }
      },
    }