const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const accountsData = [
    {
      account_number: 1,
      name: 'Johns Checking',
      amount: 1000,
      type: 'checking',
    },
    { account_number: 2, name: 'Janes Savings', amount: 2000, type: 'savings' },
    { account_number: 3, name: 'Jills Credit', amount: -3000, type: 'credit' },
    {
      account_number: 4,
      name: 'Bobs Checking',
      amount: 40000,
      type: 'checking',
    },
    {
      account_number: 5,
      name: 'Bills Savings',
      amount: 50000,
      type: 'savings',
    },
    { account_number: 6, name: 'Bills Credit', amount: -60000, type: 'credit' },
    {
      account_number: 7,
      name: 'Nancy Checking',
      amount: 70000,
      type: 'checking',
    },
    {
      account_number: 8,
      name: 'Nancy Savings',
      amount: 80000,
      type: 'savings',
    },
    { account_number: 9, name: 'Nancy Credit', amount: -90000, type: 'credit' },
  ]

  for (const account of accountsData) {
    await prisma.account.upsert({
      where: { account_number: account.account_number },
      update: {},
      create: account,
    })
  }

  console.log('Accounts have been seeded.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
