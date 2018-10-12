/**
 * Issue money from bank to a user
 * @param {com.netobjex.payment.Issue} issue - issue of money to user
 * @transaction
 */

async function issueMoney(issue) {
  const liquidity = issue.currency.liquidity
  const currentBalance = issue.recipientUser.balance
  if(liquidity >= issue.amount) {
    issue.recipientUser.balance = issue.amount + currentBalance
    issue.currency.liquidity = liquidity - issue.amount
  } else {
    alert("Insufficient fund in Bank")
  }
  let participantRegistry = await getParticipantRegistry('com.netobjex.payment.User');
  let assetRegistry = await getAssetRegistry('com.netobjex.payment.Currency');
  await participantRegistry.update(issue.recipientUser);
  await assetRegistry.update(issue.currency);
}