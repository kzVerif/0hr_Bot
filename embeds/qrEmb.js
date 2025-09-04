const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

function qrEmbed(amount) {
  const amountNum = parseFloat(amount);

  // 🔍 เช็คว่าเป็นตัวเลขไหม
  if (isNaN(amountNum) || amountNum <= 0) {
    const errorEmbed = new EmbedBuilder()
      .setDescription("❌ กรุณากรอกจำนวนเงินที่ถูกต้อง")
      .setColor(0xff0000);

    return { embeds: [errorEmbed], flags: 64 }; // ส่งเฉพาะ embed error
  }

  const total = (amountNum + parseFloat(Math.random().toFixed(2))).toFixed(2);
  const url = `https://promptpay.io/${process.env.PROMPTPAY_ID}/${total}`;

  const embed = new EmbedBuilder()
    .setDescription(
      `\`\`\`ansi
[1;36mโอนเงินตามจำนวนแล้วกดปุ่มได้เลย[0m
[1;31mจำนวน: ${total} บาท[0m
\`\`\``
    )
    .setColor(0x1ef1af)
    .setImage(url);

  const button = new ButtonBuilder()
    .setCustomId(`success_${total}`)
    .setLabel("โอนเงินแล้ว")
    .setEmoji({ id: "1115290370906001439" }) // custom emoji
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(button);

  return { embeds: [embed], components: [row], flags: 64 };
}

module.exports = { qrEmbed };
