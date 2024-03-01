'use server'
import prisma from './prisma'
import { revalidatePath } from 'next/cache'

// implementing server actions
export const updateWithdrawlTransaction = async (customer, withdrawAmount) => {
  const numericAmount = parseFloat(withdrawAmount) // Convert input to a number for validation
  console.log('numericAmount this is actually the amount entere', numericAmount)
  const { account_number, amount: accountBalance, type } = customer
  // Check if the input is a valid number
  if (isNaN(numericAmount)) {
    console.log('Invalid amount entered.')
    return
  }

  try {
    await prisma.account.update({
      where: {
        account_number: account_number,
      },
      data: {
        amount: {
          decrement: numericAmount,
        },
      },
    })
    revalidatePath(`/`)
    return {
      message: 'Transaction successful',
    }
  } catch (error) {
    console.log('Error updating account balance', error)
    return {
      message: 'Transaction failed',
    }
  }
}

// deposit money!
export const depositTransaction = async (customer, depositedAmount) => {
  const { account_number } = customer
  const numericAmount = parseFloat(depositedAmount)

  try {
    await prisma.account.update({
      where: {
        account_number: account_number,
      },
      data: {
        amount: {
          increment: numericAmount,
        },
      },
    })
    revalidatePath(`/`)
    return {
      message: 'Transaction successful',
    }
  } catch (error) {
    console.log('Error updating account balance', error)
    return {
      message: 'Transaction failed',
    }
  }
}

// fetching users
// function is here in case I want to use this server action
// instead of using automaic querying for the account search
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
