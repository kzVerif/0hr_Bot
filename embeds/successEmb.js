const { EmbedBuilder } = require("discord.js");
function successEmbed(amount) {
  const embed = new EmbedBuilder()
    .setDescription(
      `\`\`\`ansi
[2;36m[1;36mเติมเงินจำนวน ${amount} สำเร็จ[0m[2;36m[0m

\`\`\``
    )
    .setColor(0x1ef1af)
    .setImage(
      "https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUydzljcXRuMXlhbGNqNXBpeGRscGlwMmtnNWI4dWxzMXh6aTdneWRrayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/hxERQNWQudqSF1iDnr/200w.gif"
    );
  return { embeds: [embed], flags: 64, components: [] };
}

module.exports = { successEmbed };
