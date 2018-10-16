/**
* Transfer of fund from one user to another
* @param {com.netobjex.payment.Transfer} transfer - fund transfer between users
* @transaction
*/
async function fundTransfer(transfer) {
  if(tx.currencySymbol == "USD") {
    const senderBalance = transfer.sender.USDbalance
    const recieverBalance = transfer.reciever.USDbalance
    if(senderBalance >= transfer.amount) {
      transfer.reciever.USDbalance = recieverBalance + transfer.amount
      transfer.sender.USDbalance = senderBalance - transfer.amount
    } else {
      alert("Insufficient fund")
    }
  } else if(tx.currencySymbol == "INR") {
    const senderBalance = transfer.sender.INRbalance
    const recieverBalance = transfer.reciever.INRbalance
    if(senderBalance >= transfer.amount) {
      transfer.reciever.INRbalance = recieverBalance + transfer.amount
      transfer.sender.INRbalance = senderBalance - transfer.amount
    } else {
      alert("Insufficient fund")
    }
  } else {
    alert("Please provide USD or INR as currency symbol.")
  }

  let participantRegistry = await getParticipantRegistry("com.netobjex.payment.User")
  await participantRegistry.update(transfer.reciever)
  await participantRegistry.update(transfer.sender)
}
