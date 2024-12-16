import React from 'react'
import { useAppSelector } from '../hooks'

import { NewTaskBlock } from './NewTasKBlock'
import { TodosBlock } from './TodosBlock'
import { CounterAndFilters } from './CounterAndFilters'
import { todoType } from '../redux/reducers/todo'

export const TodoWrappBlock = () => {
  const todosArr = useAppSelector((state) => state.todos.todosArr)
  const filteredTodos = useAppSelector((state) => {
    switch (state.todos.filer) {
      case 'Active':
        return state.todos.todosArr.filter(item => !item.isCompleted)
      case 'Completed':
        return state.todos.todosArr.filter(item => item.isCompleted)
      default:
        return state.todos.todosArr
    }
  })
  const currentFilter = useAppSelector((state) => state.todos.filer)

  return (
    <div className="flex justify-center items-start h-screen">
      <div className="mx-auto mt-20">
        <h1 className="text-xl text-gray-700 tracking-wider text-center mb-10">todos</h1>
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <NewTaskBlock tasks={todosArr.length ? todosArr.map((todo) => todo.label) : []} />

          <TodosBlock todos={filteredTodos} />

          <CounterAndFilters
            leftTodosCount={todosArr.length ? todosArr.filter((item: todoType) => item.isCompleted).length : 0}
            allTodosCount={todosArr.length}
            currentFilter={currentFilter}
          />
        </div>
      </div>
    </div>
  )
}
