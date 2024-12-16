import React, { FC } from 'react'
import { useState } from 'react'
import { useAppDispatch } from '../hooks'
import { setNewTodo } from '../redux/reducers/todo'

interface Props {
  tasks: Array<string>
}

export const NewTaskBlock: FC<Props> = ({ tasks = [] }) => {
  const dispatch = useAppDispatch()
  const [newTask, setNewTask] = useState<string>('')
  const [isTaskExist, setIsTaskExist] = useState<boolean>(false)

  const handleChange = (value: string) => {
    if (value) {
      setNewTask(value)
    }
    setIsTaskExist(tasks.includes(value))
  }

  const setTask = () => {
    if (!newTask) return
    dispatch(setNewTodo({
      label: newTask,
      isCompleted: false
    }))
    setNewTask('')
  }

  return (
    <form action="#">
      <label htmlFor="newTodo" className="ml-2 text-xl text-gray-700">
        New task
      </label>
      <div className="flex items-stretch bg-white rounded-lg overflow-hidden shadow-md">
        <input
          type="text"
          className="flex-grow px-4 py-2 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          id="newTodo"
          name="newTodo"
          placeholder="Enter your new task"
          value={newTask}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white transition duration-150 ease-in-out"
          disabled={isTaskExist}
          onClick={setTask}
        >
          Enter
        </button>
      </div>
      {isTaskExist && <p className="text-pink-800 mt-4">This task has already been created.</p>}
    </form>
  )
}
