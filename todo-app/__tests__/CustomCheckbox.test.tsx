import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { act } from 'react'
import { CustomCheckbox } from '../src/app/view/CheckboxGroup'

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}))

const mockDispatch = jest.fn()

beforeEach(() => {
  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    store: {
      getState: jest.fn(),
      subscribe: jest.fn(),
      dispatch: mockDispatch,
    },
  }))
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('CustomCheckbox component', () => {
  it('should render correctly with initial props', () => {
    const { container } = render(<CustomCheckbox isChecked={false} label="Test Label" />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should toggle the checked state when clicked', async () => {
    render(<CustomCheckbox isChecked={false} label="Test Label" />)

    let checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBeFalsy()

    await act(async () => {
      fireEvent.click(checkbox)
    })

    checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBeTruthy()
  })

  it('should apply strike-through after 2 seconds of being checked', async () => {
    jest.useFakeTimers() // Используем fake timers для управления временем

    render(<CustomCheckbox isChecked={true} label="Test Label" />)

    let labelElement = screen.getByText('Test Label')
    expect(labelElement.classList.contains('line-through')).toBeFalsy()

    act(() => {
      jest.advanceTimersByTime(1999) // Почти два секунды прошли
    })

    labelElement = screen.getByText('Test Label')
    expect(labelElement.classList.contains('line-through')).toBeFalsy()

    act(() => {
      jest.advanceTimersByTime(1) // Прошло ровно две секунды
    })

    labelElement = screen.getByText('Test Label')
    expect(labelElement.classList.contains('line-through')).toBeTruthy()

    jest.useRealTimers() // Возвращаем реальные таймеры после теста
  })

  it('should remove strike-through immediately when unchecked', async () => {
    jest.useFakeTimers() // Используем fake timers для управления временем

    render(<CustomCheckbox isChecked={true} label="Test Label" />)

    let labelElement = screen.getByText('Test Label')
    expect(labelElement.classList.contains('line-through')).toBeFalsy()

    act(() => {
      jest.advanceTimersByTime(2000) // Проходит 2 секунды
    })

    labelElement = screen.getByText('Test Label')
    expect(labelElement.classList.contains('line-through')).toBeTruthy()

    await act(async () => {
      fireEvent.click(screen.getByRole('checkbox')) // Снимаем галочку
    })

    labelElement = screen.getByText('Test Label')
    expect(labelElement.classList.contains('line-through')).toBeFalsy() // Убедимся, что зачёркивание убрано

    jest.useRealTimers() // Возвращаем реальные таймеры после теста
  })
})
