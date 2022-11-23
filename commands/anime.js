const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("anime")
        .setDescription("Searches for an anime title using the AniList API")
        .addStringOption((option) =>
            option
                .setName("title")
                .setDescription("What's the name of the anime?")
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.reply("yop");
    },
};
