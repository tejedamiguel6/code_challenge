export function withdrawContions(customer, withdrawAmount) {
  console.log('COMING FROM withdraConditions', customer, withdrawAmount)
  const { amount: accountBalance, type } = customer
  const numericAmountInput = parseFloat(withdrawAmount)

  // Check if the input is a valid number
  if (isNaN(numericAmountInput)) {
    console.log('Invalid amount entered.')
    return
  }

  // coont withdraq more than 200 single transaction
  if (numericAmountInput > 200) {
    console.log('Cannot withdraw more than $200 in a single transaction.')
    return {
      valid: false,
      message: 'Cannot withdraw more than $200 in a single transaction.',
    }
  }

  // - A customer can withdraw any amount that can be dispensed in $5 bills.
  if (numericAmountInput % 5 !== 0) {
    console.log('Amount must be dispensed in $5 bills.')
    return { valid: false, message: 'Amount must be dispensed in $5 bills.' }
  }

  // Check if adding this withdrawal exceeds the $400 daily limit
  // todo: add a check for the daily limit
  //   if (withdrawAmount + numericAmountInput > 400) {
  //     console.log('Cannot withdraw more than $400 in a single day.')
  //     return {
  //       valid: false,
  //       message: 'Cannot withdraw more than $400 in a single day.',
  //     }
  //   }

  if (numericAmountInput > accountBalance) {
    console.log('Insufficient funds')
  }

  if (type === 'savings' && numericAmountInput > 1000) {
    console.log('Savings account cannot withdraw more than $1000')
    return { valid: false, message: 'Amount must be dispensed in $5 bills.' }
  }
}
