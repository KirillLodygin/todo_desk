import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../src/app/redux/store'
import { TodosBlock } from '../src/app/view/TodosBlock'

const mockTodos = [
  { label: 'Task 1', isCompleted: false },
  { label: 'Task 2', isCompleted: true },
]

describe('TodosBlock component', () => {
  it('renders correctly with todos', async () => {
    render(
      <Provider store={store}>
        <TodosBlock todos={mockTodos} />
      </Provider>,
    )

    expect(screen.getByText('What needs to be done?')).toBeInTheDocument
    expect(screen.getAllByRole('checkbox').length).toEqual(mockTodos.length)
  })

  it('closes dropdown when button is clicked again', async () => {
    render(
      <Provider store={store}>
        <TodosBlock todos={mockTodos} />
      </Provider>,
    )

    // Открытие выпадающего списка
    const button = screen.getByRole('button') as HTMLButtonElement
    await userEvent.click(button)

    // Выпадающий список открыт
    let dropdownContent = screen.queryByTestId('dropdown-content')
    expect(dropdownContent).toBeInTheDocument

    // Повторное нажатие на кнопку
    await userEvent.click(button)

    // Выпадающий список закрыт
    dropdownContent = screen.queryByTestId('dropdown-content')
    expect(dropdownContent).not.toBeInTheDocument
  })

  it('does not render dropdown if there are no todos', () => {
    render(
      <Provider store={store}>
        <TodosBlock todos={[]} />
      </Provider>,
    )

    // Кнопка должна быть неактивной
    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBeTruthy()

    // Выпадающий список не отображается
    expect(screen.queryByTestId('dropdown-content')).not.toBeInTheDocument
  })
})
