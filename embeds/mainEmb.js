const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function mainEmbed() {
  // Embed
  const embed = new EmbedBuilder()
    .setDescription("```ansi\n\u001b[1;36mโอนเงินได้เลย\u001b[0m\n```")
    .setColor(0x1ef1af)
    .setImage("https://upload.wikimedia.org/wikipedia/commons/c/c5/PromptPay-logo.png");

  // Button
  const button = new ButtonBuilder()
    .setCustomId("pay")
    .setLabel("โอนเงิน")
    .setEmoji({ id: "1408984084742537317" }) // ถ้า custom emoji
    .setStyle(ButtonStyle.Success);

  // ต้องห่อปุ่มใน ActionRow
  const row = new ActionRowBuilder().addComponents(button);

  return { embeds: [embed], components: [row] };
}

module.exports = { mainEmbed };
