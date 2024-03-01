'use client'
import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Modal from '@mui/material/Modal'

// server action inside a client component
import { updateWithdrawlTransaction, depositTransaction } from '../lib/actions'
import { withdrawContions } from '../lib/conditions/withdrawCondition'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black',
}

interface Customer {
  account_number: number
  name: string
  amount: number
  type: string
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}))

export default function ActionCell({ customer }: { customer: Customer }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [selected, setSelected] = React.useState('' as string)
  // make just an amount state for both deposit and withdraw
  const [amount, setAmount] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleOpen = () => setModalOpen(true)
  const handleClose = () => {
    setModalOpen(false)
    setSuccess('')
  }

  const handleModalToggle = () => {
    setModalOpen((prev) => !prev)
  }

  const handleAmountEntered = (
    e: React.ChangeEvent<HTMLInputElement>,
    customerInfo: Customer
  ) => {
    const inputAmount = e.target.value

    setAmount(inputAmount)
  }

  const onSubmit = async () => {
    if (selected === 'Withdraw') {
      // calling server action
      const res = await updateWithdrawlTransaction(customer, amount)
      setSuccess(res.message)

      const { account_number, amount: accountBalance, type } = customer
      const conditionCheck = withdrawContions(customer, amount)

      if (!conditionCheck?.valid) {
        setErrorMessage(conditionCheck?.message)
        // setSuccess(conditionCheck) // Assuming you have a state to show messages to the user
        return
      }
    } else if (selected === 'Deposit') {
      const depositResponse = await depositTransaction(customer, amount)
      setSuccess(depositResponse.message)
      // setSuccess(res.message)
    }
  }

  const selectedOptions = ['Withdraw', 'Deposit', 'Check Balance']

  return (
    <div>
      <Button
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Options
      </Button>
      <StyledMenu
        onClose={() => setAnchorEl(null)}
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
      >
        <MenuItem onClick={handleModalToggle} disableRipple>
          {selectedOptions.map((option) => {
            return (
              <Button onClick={() => setSelected(option)} key={option}>
                {option}
              </Button>
            )
          })}
        </MenuItem>
        {modalOpen && (
          <Modal
            open={modalOpen}
            onClose={(event, reason) => {
              if (reason === 'backdropClick') {
                handleClose()
              }
            }}
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                {selected}
              </Typography>
              {selected === 'Withdraw' && (
                <>
                  <form action={onSubmit}>
                    <input
                      type='number'
                      value={amount}
                      onChange={(e) => handleAmountEntered(e, customer)}
                      placeholder='Amount to withdraw'
                    />
                    <button disabled={!amount} type='submit'>
                      Submit
                    </button>
                  </form>
                </>
              )}

              {selected === 'Deposit' && (
                <>
                  <form action={onSubmit}>
                    <input
                      type='number'
                      value={amount}
                      onChange={(e) => handleAmountEntered(e, customer)}
                      placeholder='Amount to withdraw'
                    />
                    <button disabled={!amount} type='submit'>
                      Submit
                    </button>
                  </form>
                </>
              )}
              {selected === 'Check Balance' && (
                <>
                  <Typography
                    sx={{
                      fontSize: '1.6rem',
                      marginTop: '20px',
                    }}
                  >
                    Balance: {customer.amount}
                  </Typography>
                </>
              )}

              {success ? (
                <Typography
                  sx={{ color: 'green', fontSize: '1.6rem', marginTop: '20px' }}
                >
                  {success}
                </Typography>
              ) : (
                <Typography
                  sx={{ color: 'red', fontSize: '1.6rem', marginTop: '20px' }}
                >
                  {errorMessage}
                </Typography>
              )}
            </Box>
          </Modal>
        )}
      </StyledMenu>
    </div>
  )
}
