import Image from 'next/image'
import styles from './page.module.css'

import { sql } from '@vercel/postgres'

import { getData } from './lib/data'

export default function Home() {
  // const data = getData()

  // console.log(data, 'wow')
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Coding Challenge ! lets go</h1>
      </div>
    </main>
  )
}
