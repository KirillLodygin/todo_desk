import React, { useState, useEffect } from 'react'
import { animated, config, useSpring } from 'react-spring'
import { useAppDispatch } from '../hooks'
import { updateTodoStatus } from '../redux/reducers/todo'

interface Props {
  isChecked: boolean
  label: string
}

export const CustomCheckbox: React.FC<Props> = ({ isChecked, label }) => {
  const dispatch = useAppDispatch()

  const [checked, setChecked] = useState(isChecked)
  const [showStrikeThrough, setShowStrikeThrough] = useState(false)

  useEffect(() => {
    if (checked) {
      setTimeout(() => {
        setShowStrikeThrough(true)
      }, 2000)
    } else {
      setShowStrikeThrough(false)
    }
  }, [checked])

  const strikeThroughStyle = useSpring({
    to: { width: showStrikeThrough ? '100%' : '0%' },
    config: config.stiff,
  })

  const handleChange = () => {
    setChecked(!checked)
    dispatch(updateTodoStatus(label))
  }

  return (
    <label className="flex items-center mb-2 py-2 pl-4">
      <input type="checkbox" checked={checked} onChange={handleChange} className="hidden" />
      <span
        className={`w-6 h-6 border-2 border-blue-600 rounded-full flex items-center justify-center ${
          checked ? 'bg-blue-400' : ''
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </span>
      <p className={`ml-2 text-xl font-semibold ${checked ? 'text-blue-600 line-through' : ''}`}>
        {label}
        {showStrikeThrough && (
          <animated.span style={{ width: strikeThroughStyle.width }} />
        )}
      </p>
    </label>
  )
}
