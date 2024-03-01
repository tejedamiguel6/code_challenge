import styles from './page.module.css'
import SearchAccount from './components/SearchAccount'
// import CustomerNameResult from './components/CustomerNameResult'
import { fetchCustomerByAccount } from './lib/fetchCustomerByAccount'
import CustomerTable from './ui/CustomerTable'

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: number
  }
}) {
  const query = searchParams?.query
  const customer = await fetchCustomerByAccount(query)

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 style={{ textAlign: 'center' }}>SEARCH ACCOUNT</h1>
        <SearchAccount placeholder={'Use Account number'} />
        {/* <CustomerNameResult query={query} /> */}

        <CustomerTable customer={customer} />
      </div>
    </main>
  )
}
