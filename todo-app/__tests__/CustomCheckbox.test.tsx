import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { CustomCheckbox } from '../src/app/view/CheckboxGroup' // путь к вашему компоненту

// Создаем mock store для тестирования redux actions
const middlewares = []
const mockStore = configureStore(middlewares)
const initialState = {}
const store = mockStore(initialState)

jest.mock('../src/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}))

describe('CustomCheckbox', () => {
  it('should render correctly with default props', () => {
    const { container } = render(
      <Provider store={store}>
        <CustomCheckbox />
      </Provider>,
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render correctly when isChecked is true', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <CustomCheckbox isChecked={true} label="Test Label" />
      </Provider>,
    )

    const checkbox = getByLabelText('Test Label')
    expect(checkbox.checked).toBeTruthy()
  })

  it('should call updateTodoStatus when checkbox is clicked', async () => {
    const updateTodoStatusMock = jest.fn()
    const mockedUseAppDispatch = jest.fn().mockReturnValue(updateTodoStatusMock)
    jest.mock('../src/hooks', () => ({
      useAppDispatch: () => mockedUseAppDispatch(),
    }))

    const { getByRole } = render(
      <Provider store={store}>
        <CustomCheckbox isChecked={false} label="Test Label" />
      </Provider>,
    )

    const checkbox = getByRole('checkbox')
    fireEvent.click(checkbox)

    await waitFor(() => {
      expect(updateTodoStatusMock).toHaveBeenCalledWith('Test Label')
    })
  })

  it('should toggle the checked state when clicked', async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <CustomCheckbox isChecked={false} label="Test Label" />
      </Provider>,
    )

    const checkbox = getByRole('checkbox')
    expect(checkbox.checked).toBeFalsy()

    fireEvent.click(checkbox)
    await waitFor(() => {
      expect(checkbox.checked).toBeTruthy()
    })
  })

  it('should apply strike through animation after 2 seconds of being checked', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <CustomCheckbox isChecked={true} label="Test Label" />
      </Provider>,
    )

    const label = getByText('Test Label')
    expect(label.classList.contains('line-through')).toBeFalsy()

    await new Promise((resolve) => setTimeout(resolve, 2100)) // Ждем чуть больше 2 секунд

    expect(label.classList.contains('line-through')).toBeTruthy()
  })
})
