const { REST, Routes } = require("discord.js");
const { clientId, token } = require("./config.json");
const fs = require("node:fs");

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(
            `Started refreshing ${commands.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(Routes.applicationCommands(clientId), {
            body: commands,
        });

        console.log(
            `Successfully reloaded ${data.length} application (/) commands.`
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
/*
require("dotenv").config();

const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.TEST_GUILD_ID;

const rest2 = new REST({ version: "9" }).setToken(token);
rest2.get(Routes.applicationGuildCommands(clientId, guildId)).then((data) => {
    const promises = [];
    for (const command of data) {
        const deleteUrl = `${Routes.applicationGuildCommands(
            clientId,
            guildId
        )}/${command.id}`;
        promises.push(rest.delete(deleteUrl));
    }
    return Promise.all(promises);
});
*/
