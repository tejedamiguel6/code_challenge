'use client'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import ActionsCell from './ActionCell'

import Link from 'next/link'

interface Customer {
  account_number: number
  name: string
  amount: number
  type: string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function createData(
  account_number: number,
  name: string,
  amount: number,
  type: string
): Customer {
  return { account_number, name, amount, type }
}

const rows = [createData]

export default function CustomizedTables({ customer }: { customer: Customer }) {
  return (
    <>
      {customer === null ? (
        <div>Enter Account</div>
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align='right'>Amount</StyledTableCell>
                  <StyledTableCell align='right'>type</StyledTableCell>
                  <StyledTableCell align='right'>
                    Account Number
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Link href='/user'>{customer?.name}</Link>

                      <div style={{ paddingLeft: '2rem' }}>
                        <ActionsCell customer={customer} />
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {customer?.amount}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {customer?.type}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {customer?.account_number}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  )
}
