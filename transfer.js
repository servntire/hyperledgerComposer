/**
 * Transfer of fund from one user to another
 * @param {com.netobjex.payment.Transfer} transfer - fund transfer between users
 * @transaction
 */
async function fundTransfer(transfer) {
    const senderBalance = transfer.sender.balance
    const recieverBalance = transfer.reciever.balance
    if(senderBalance >= transfer.amount) {
      transfer.reciever.balance = recieverBalance + transfer.amount
      transfer.sender.balance = senderBalance - transfer.amount
    } else {
      alert("Insufficient fund")
    }
    let participantRegistry = await getParticipantRegistry("com.netobjex.payment.User")
    await participantRegistry.update(transfer.reciever)
    await participantRegistry.update(transfer.sender)
  }