import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { NewTaskBlock } from '../src/app/view/NewTasKBlock'

// Создаем моки для redux-хуков
jest.mock('../src/app/hooks', () => ({
  useAppDispatch: jest.fn().mockReturnValue(jest.fn()),
}))

const mockStore = configureStore()

describe('NewTaskBlock', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render input field and button', () => {
    const store = mockStore({})
    render(
      <Provider store={store}>
        <NewTaskBlock tasks={['Task 1']} />
      </Provider>,
    )

    expect(screen.getByLabelText('New task')).toBeInTheDocument
    expect(screen.getByPlaceholderText('Enter your new task')).toBeInTheDocument
    expect(screen.getByRole('button', { name: 'Enter' })).toBeInTheDocument
  })

  test('should disable button if task exists in list', () => {
    const store = mockStore({})
    render(
      <Provider store={store}>
        <NewTaskBlock tasks={['Existing Task']} />
      </Provider>,
    )

    const inputField = screen.getByPlaceholderText('Enter your new task')
    fireEvent.change(inputField, { target: { value: 'Existing Task' } })

    const submitButton = screen.getByRole('button', { name: 'Enter' })
    expect(submitButton).toBeDisabled
    expect(screen.getByText('This task has already been created.')).toBeInTheDocument
  })

  test('should enable button if task does not exist in list', () => {
    const store = mockStore({})
    render(
      <Provider store={store}>
        <NewTaskBlock tasks={['Existing Task']} />
      </Provider>,
    )

    const inputField = screen.getByPlaceholderText('Enter your new task')
    fireEvent.change(inputField, { target: { value: 'New Task' } })

    const submitButton = screen.getByRole('button', { name: 'Enter' })
    expect(submitButton).not.toBeDisabled
    expect(screen.queryByText('This task has already been created.')).not.toBeInTheDocument
  })
})
