/**
 * USD Transfer
 * @param {com.netobjex.payment.USDTransfer} transaction - USD to INR Transfer
 * @transaction
 */

async function USDFundTransfer(transaction) {
    let exchangeRate = await request.get({uri:'https://free.currencyconverterapi.com/api/v5/convert?q=USD_INR&compact=y', json:true})
    const senderBalance = transfer.sender.USDbalance
    const recieverBalance = transfer.reciever.USDbalance
    if(senderBalance >= transfer.amount) {
      transfer.reciever.USDbalance = recieverBalance + (transfer.amount * exchangeRate.USD_INR.val) // INR Account
      transfer.sender.USDbalance = senderBalance - transfer.amount // USD Account
    } else {
      alert("Insufficient fund")
    }
    let participantRegistry = await getParticipantRegistry("com.netobjex.payment.User")
    await participantRegistry.update(transfer.reciever)
    await participantRegistry.update(transfer.sender)
  }
