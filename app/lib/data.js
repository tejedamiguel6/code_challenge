import { sql } from '@vercel/postgres'

export async function getData() {
  console.log('fetchin data from db')
  const data = await sql`SELECT * FROM accounts`

  // console.log(data, 'what s this')
}
