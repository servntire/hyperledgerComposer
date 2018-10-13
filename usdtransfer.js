/**
 * USD Transfer
 * @param {com.netobjex.payment.USDTransfer} transaction - USD to INR Transfer
 * @transaction
 */

async function USDFundTransfer(transaction) {
    let exchangeRate = await request.get({uri:'https://free.currencyconverterapi.com/api/v5/convert?q=USD_INR&compact=y', json:true})
    alert(exchangeRate.USD_INR.val)
  }