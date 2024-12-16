import React, { FC } from 'react'
import { useState } from 'react'
import { todoType } from '../redux/reducers/todo'

import { CustomCheckbox } from './CheckboxGroup'

interface Props {
  todos: Array<todoType>
}

export const TodosBlock: FC<Props> = ({ todos }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="w-full mt-10 relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={!todos.length}
          className="inline-flex justify-between w-full px-4 py-2 text-sm
                     font-medium text-gray-700 bg-white border border-gray-300
                     rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
        >
          What needs to be done?
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 ml-2 -mr-1 transform ${isOpen ? 'rotate-180' : ''}`}
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      {isOpen && todos.length ? (
        <div
          className="w-full mt-2 origin-top-right bg-white divide-y
        divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-72"
        >
          <div className="py-1">
            {todos.map((todo, index) => (
              <div key={todo.label} className={index !== 0 ? 'border-t' : ''}>
                <CustomCheckbox label={todo.label} isChecked={todo.isCompleted} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
