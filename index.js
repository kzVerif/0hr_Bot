const {
  Client,
  GatewayIntentBits,
  Routes,
  REST,
  SlashCommandBuilder,
} = require("discord.js");
const { payModal } = require("./modal/payModal");
const { qrEmbed } = require("./embeds/qrEmb");
const { check } = require("./payment/check");
const { successEmbed } = require("./embeds/successEmb");
const { mainEmbed } = require("./embeds/mainEmb");
const { failedEmbed } = require("./embeds/failesEmb");
const { logEmbed } = require("./embeds/logEmb");
require("dotenv").config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = process.env.TOKEN;
const guildId = process.env.GUILD_ID;

const commands = [
  new SlashCommandBuilder()
    .setName("menu")
    .setDescription("ตอบกลับด้วย pong!")
    .toJSON(),
];

client.once("ready", async () => {
  console.log(`✅ บอท ${client.user.tag} ออนไลน์แล้ว!`);

  const rest = new REST({ version: "10" }).setToken(TOKEN);
  try {
    await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {
      body: commands,
    });
    console.log("✅ ลงทะเบียน Slash Commands สำเร็จ!");
  } catch (error) {
    console.error("❌ ลงทะเบียนคำสั่งล้มเหลว:", error);
  }
});

// ✅ ดักจับคำสั่ง
client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "menu") {
      const embeds = mainEmbed();
      await interaction.reply(embeds);
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === "pay") {
      const modal = payModal();
      return interaction.showModal(modal);
    }
    if (interaction.customId.startsWith("success")) {
      const amount = interaction.customId.replace("success_", "");
      const isFound = await check(amount);
      if (isFound) {
        const embed = successEmbed(amount);
        const channel = client.channels.cache.get(process.env.LOG_CHANNEL)
        const logEmb = logEmbed(amount, interaction.user.id)
        interaction.update(embed);
        return  await channel.send(logEmb)
      }
      const embed = failedEmbed(amount);
      return interaction.reply(embed);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === "paymodal") {
      const amount = interaction.fields.getTextInputValue("amount");
      const embed = qrEmbed(amount);
      return interaction.reply(embed);
    }
  }
});

client.login(TOKEN);
