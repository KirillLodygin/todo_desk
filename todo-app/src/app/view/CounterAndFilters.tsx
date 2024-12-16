import React from 'react'
import { useAppDispatch } from '../hooks'
import { clearCompleted, setNewFilter, TodosFilterType } from '../redux/reducers/todo'

const buttons: Array<TodosFilterType> = ['All', 'Active', 'Completed']

interface Props {
  leftTodosCount: number
  allTodosCount: number
  currentFilter: TodosFilterType
}

export const CounterAndFilters: React.FC<Props> = ({
  leftTodosCount = 0,
  allTodosCount = 0,
  currentFilter = 'All',
}) => {
  const dispatch = useAppDispatch()

  const onFilterButtonClick = (val: TodosFilterType) => {
    dispatch(setNewFilter(val))
  }

    const onResetButtonClick = () => {
        dispatch(clearCompleted())
    }

  return (
    <div className="flex gap-4 border-t text-xs text-gray-500 mt-20 py-5">
      <div className="flex gap-2 flex flex-col items-stretch gap-2 h-full justify-center">
        <p className="whitespace-nowrap truncate">{allTodosCount} all items</p>
        <p className="whitespace-nowrap truncate">{leftTodosCount} items left</p>
      </div>

      <div className="flex gap-2">
        {buttons.map((item) => (
          <button
            className={`px-4 py-2 bg-transparent ${currentFilter === item && allTodosCount ? `outline-none border-2 border-pink-300` : ''}`}
            key={item}
            onClick={() => {
              onFilterButtonClick(item)
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        className="px-4 py-2 bg-transparent"
        onClick={() => {
            onResetButtonClick()
        }}
      >
        Clear completed
      </button>
    </div>
  )
}
