import prisma from './prisma'

export async function fetchCustomerByAccount(account_number = 0) {
  const parsedAccountNumber = parseInt(account_number, 10)
  if (isNaN(parsedAccountNumber)) {
    throw new Error('Invalid account number.')
  }

  try {
    console.log(parsedAccountNumber, 'account_number')
    const customer = await prisma.account.findUnique({
      where: {
        account_number: parsedAccountNumber,
      },
    })
    return customer
  } catch (error) {
    console.error(error)
    throw error // Re-throw the error to be handled by the caller
  }
}
