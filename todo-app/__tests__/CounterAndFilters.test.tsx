import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { CounterAndFilters } from '../src/app/view/CounterAndFilters' // Импортируем компонент

// Тип для состояния Redux
type State = {
  todos: {
    leftTodosCount: number
    allTodosCount: number
    currentFilter: string
  }
}

// Создаем mock store для Redux
const mockStore = configureStore<State>()

describe('<CounterAndFilters />', () => {
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore({
      todos: {
        leftTodosCount: 10,
        allTodosCount: 15,
        currentFilter: 'All',
      },
    })
  })

  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <CounterAndFilters leftTodosCount={10} allTodosCount={15} currentFilter={'All'} />
      </Provider>,
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('displays correct counts', () => {
    render(
      <Provider store={store}>
        {/* Передача пропсов */}
        <CounterAndFilters leftTodosCount={10} allTodosCount={15} currentFilter={'All'} />
      </Provider>,
    )

    expect(screen.getByText('15 all items')).toBeInTheDocument
    expect(screen.getByText('10 items left')).toBeInTheDocument
  })

  it('calls onFilterButtonClick when a filter button is clicked', () => {
    const spySetNewFilter = jest.spyOn(store, 'dispatch') // Мониторим dispatch

    render(
        <Provider store={store}>
          {/* Передача пропсов */}
          <CounterAndFilters leftTodosCount={10} allTodosCount={15} currentFilter={'All'} />
        </Provider>,
    )

    const filterButtons = screen.getAllByRole('button', { name: /All|Active|Completed/i })
    fireEvent.click(filterButtons[1]) // Нажатие на кнопку "Active"

    expect(spySetNewFilter).toHaveBeenCalledWith({ type: 'todos/setNewFilter', payload: 'Active' }) // Проверяем, что вызывается правильная action
  })

  it('calls onResetButtonClick when "Clear completed" button is clicked', () => {
    const spyClearCompleted = jest.spyOn(store, 'dispatch') // Мониторим dispatch

    render(
        <Provider store={store}>
          {/* Передача пропсов */}
          <CounterAndFilters leftTodosCount={10} allTodosCount={15} currentFilter={'All'} />
        </Provider>,
    )

    const resetButton = screen.getByText('Clear completed')
    fireEvent.click(resetButton) // Нажатие на кнопку "Clear completed"

    expect(spyClearCompleted).toHaveBeenCalledWith({ type: 'todos/clearCompleted' }) // Проверяем, что вызывается правильная action
  })
})
