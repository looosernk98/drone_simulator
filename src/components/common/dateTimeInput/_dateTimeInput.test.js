import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import DateTimeInput from './index'


describe("Test DateTimeInput Component", ()=>{

    const setup = () => {
        const setTime = jest.fn()
        const utils = render(<DateTimeInput setTime={setTime}/>)
        const input = screen.getByLabelText('select-date-time')
        return {
          input,
          ...utils,
        }
      }
 
  it('should render DateTimeInput component', () => {
    const { input} = setup()
    expect(input).toBeTruthy();
  })

  it('should check initial empty value', () => {
    const { input} = setup()
    expect(input.value).toEqual('')
  })

  it('should fire onChange', () => {
    const { input} = setup()

    fireEvent.change(input,{target : { value: new Date('2024-02-01T09:00:00').toISOString().split('.')[0]}})
    expect(input.value).toBe(new Date('2024-02-01T09:00:00').toISOString().split('.')[0].substring(0,16))
  })

})