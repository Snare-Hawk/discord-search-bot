const fs = require("node:fs");
const path = require("node:path");
const {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    ActivityType
} = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
    }
}

client.once(Events.ClientReady, () => {
    console.log("Ready!");
    client.user.setPresence({
        activities: [{ name: "Spy X Family", type: ActivityType.Watching }],
        status: "dnd"
    });
    console.log(
        `\nhttps://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`
    );
    /*
    const channel = client.channels.cache.get("975876824972283944");
    channel.send(
        "his sanity depends on it! https://cdn.discordapp.com/attachments/666436193898201109/1044800221307228250/image.png"
    );*/
});

client.on(Events.InteractionCreate, interaction => {
    console.log(interaction);
});

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true
        });
    }
});

/*
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions
    ]
});

const character = require("./character");
const media = require("./media");
const staff = require("./staff");
const user = require("./user");
const studio = require("./studio");

const deleteViaReaction = require("./deleteViaReaction");

// Use exclamation mark as the default prefix
const prefix = process.env.PREFIX || "!";

client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(
        `Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
    );
    console.log(
        `\nAdd the bot to your server here:\nhttps://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`
    );

    client.user.setPresence({
        activities: [{ name: "Spy X Family", type: ActivityType.Watching }],
        status: "dnd"
    });
    // client.process.send("997182942759628833", "yop");
    // client.users.send("301082610438897664", "I'm online now!");

    // const channel = client.channels.cache.get("975876824972283944");

    // channel.send("let <@301082610438897664> know if at any point you see me in the slash command menu!");
});

client.on("messageCreate", async message => {
    const messageContent = message.content;

    // Ensure the message starts with our prefix
    if (messageContent.indexOf(prefix) !== 0) {
        return;
    }

    let args = messageContent
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift().toLowerCase();
    args = args.join(" ");

    let response = null;

    switch (command) {
        case "h":
        case "help":
            response = help;
            break;

        case "i":
        case "invite":
            response = invite;
            break;

        case "a":
        case "anime":
            response = await media.search(args, "ANIME");
            break;

        case "m":
        case "manga":
            response = await media.search(args, "MANGA");
            break;

        case "c":
        case "character":
            response = await character.search(args);
            break;

        case "p":
        case "person":
        case "staff":
            response = await staff.search(args);
            break;

        case "s":
        case "studio":
            response = await studio.search(args);
            break;

        case "u":
        case "user":
            response = await user.search(args);
            break;

        case "anya":
            response = anya;
            break;

        case "react":
            response = react;
            break;
    }

    if (response === null) return;

    if (response.error) {
        message.channel.send({ content: response.error.message });
        return;
    }

    let replyUrl;
    if (response.author && response.author.url) {
        replyUrl = message.channel.send({
            content: `<${response.author.url}>`
        });
    }

    const replyEmbed = message.channel.send({
        embeds: [
            {
                ...response,
                color: 3447003
            }
        ]
    });

    // if (command !== "help") {
    //     deleteViaReaction(
    //         message,
    //         await replyEmbed,
    //         replyUrl ? await replyUrl : replyUrl,
    //         client
    //     );
    // }
});

const help = {
    title: "Commands",
    description: `
Search anime: %a or %anime <anime title>
Search manga: %m or %manga <manga title>
Search character: %c or %character <character name>
Search staff: %p or %person or %staff <staff name>
Search studio: %s or %studio <studio name>
Search user: %u or %user <user name>
Invite link: %i or %invite

[Source](https://github.com/Snare-Hawk/discord-search-bot)`
};

const invite = {
    title: "Invite",
    description: `You can invite me [here](https://discordapp.com/oauth2/authorize?client_id=883945081856479252&scope=bot&permissions=1024)!`
};

const react = {
    //     client.once(Events, ClientReady, () => {
    //     console.log("Ready!");
    // });
    // client.on(Events, InteractionCreate, interaction => {
    //     message.react("😄");
    // });
};

const anya = {
    title: "waku waku",
    image: {
        url:
            "https://cdn.discordapp.com/app-assets/883945081856479252/1027398078522740737.png"
    }
};
*/
client.login(token);
