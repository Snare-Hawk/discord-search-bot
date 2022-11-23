const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("anime")
        .setDescription("Searches for an anime title using the AniList API"),
    async execute(interaction) {
        await interaction.reply("yop");
    },
};
