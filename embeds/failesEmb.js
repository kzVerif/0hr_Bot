const { EmbedBuilder } = require("discord.js");
function failedEmbed(amount) {
  const embed = new EmbedBuilder()
    .setDescription(
      `\`\`\`ansi
[2;36m[1;36m[1;31mเติมเงินจำนวน ${amount} ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง[0m[1;36m[0m[2;36m[0m
\`\`\``
    )
    .setColor(0xff0000)
    // .setImage(
    //   "https://i.pinimg.com/originals/b3/ee/1c/b3ee1ca729639b311219f6c2f8cbbb5e.gif"
    // );
  return { embeds: [embed], flags: 64 };
}

module.exports = { failedEmbed };
