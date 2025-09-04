const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");

function payModal() {
  const payModal = new ModalBuilder()
    .setCustomId("paymodal")
    .setTitle("กรอกจำนวนเงินที่ต้องการเติม");
  const amountInput = new TextInputBuilder()
    .setCustomId("amount")
    .setLabel("จำนวนเงิน")
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    const row = new ActionRowBuilder().addComponents(amountInput)
    payModal.addComponents(row)
    return payModal
}

module.exports = {payModal}