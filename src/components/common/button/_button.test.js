import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Button from './index'

describe("Test Button Component", ()=>{

  it('should render button',() => {
    const { getByTestId } = render(<Button type='button' buttonText={'Add Coordinates'}/>)
    const button = getByTestId('button')
    expect(button).toBeTruthy();
    expect(screen.getByRole('button')).toHaveTextContent('Add Coordinates')
    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('should click button', () => {
    const onClickHandler = jest.fn(() => console.log("hi from handler"));
    render(<Button buttonText={'Click me'} type='button'  onClick={onClickHandler}/>)
    fireEvent.click(screen.getByText('Click me'))
    expect(onClickHandler).toHaveBeenCalledTimes(1);
  })


})