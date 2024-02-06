import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from './index'

test('test the button', async () => {
  render(<Button type='button' buttonText={'Add Coordinates'}/>)

  expect(screen.getByRole('button')).toHaveTextContent('Add Coordinates')
  expect(screen.getByRole('button')).toBeEnabled()
})