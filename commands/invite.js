const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("send an invite link for this bot "),
    async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("primary")
                .setLabel("Invite me!")
                .setStyle(
                    ButtonStyle.Primary
                    // (url =
                    //     "https://discordapp.com/oauth2/authorize?client_id=883945081856479252&scope=bot&permissions=8")
                )
        );
        await interaction.reply({
            content: "I think you should,",
            components: [row],
        });
    },
};
