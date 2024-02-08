import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from './index'


describe("Test Input Component", ()=>{

    const setup = () => {
        const utils = render(<Input/>)
        const input = screen.getByLabelText('input')
        return {
          input,
          ...utils,
        }
      }
 
  it('should render Input component', () => {
    const { input} = setup()
    expect(input).toBeTruthy();
  })

  it('should check initial empty value', () => {
    const { input} = setup()
    expect(input.value).toEqual('')
  })

  it('should fire onChange', () => {
    const { input} = setup()

    fireEvent.change(input,{target : { value: 'input value'}})
    expect(input.value).toBe('input value')
  })

})