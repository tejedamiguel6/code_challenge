export function depositContions(customer: Customer, amount: number) {
  const { account_number, amount: accountBalance, type } = customer

  if (amount > 10000) {
    return {
      valid: false,
      message: 'Cannot deposit more than $10,000 in a single transaction.',
    }
  }
}
