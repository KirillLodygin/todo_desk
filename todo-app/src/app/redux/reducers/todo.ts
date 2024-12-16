import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type todoType = {
  label: string,
  isCompleted: boolean
}

export type TodosFilterType = 'All' | 'Active' | 'Completed'

interface TodosState {
  todosArr: Array<todoType>
  filer: TodosFilterType
}

const initialState: TodosState = {
  todosArr: [],
  filer: 'All'
}

const TodosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setNewTodo(state, action: PayloadAction<todoType>) {
      state.todosArr.push(action.payload)
    },
    updateTodoStatus(state, action: PayloadAction<string>) {
      const index = state.todosArr.findIndex(todo => todo.label === action.payload)
      state.todosArr[index].isCompleted = !state.todosArr[index].isCompleted
    },
    setNewFilter(state, action: PayloadAction<TodosFilterType>) {
      state.filer = action.payload
    },
    clearCompleted(state) {
      state.todosArr = state.todosArr.filter(item => !item.isCompleted)
    }
  },
})

export const { setNewTodo, updateTodoStatus, clearCompleted, setNewFilter } = TodosSlice.actions

export default TodosSlice.reducer
