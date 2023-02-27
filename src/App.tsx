import { useState, useEffect, useReducer } from 'react'
import TodoAdd from './components/TodoAdd'
// import TodoList from './components/TodoList'
import MainSection from './components/MainSection'
import TodoFooter from './components/TodoFooter'
import toDoContext from './toDoContext'
import { ToDoType } from './toDoType'
// 导入todos样式
import './App.css'

const initialState: ToDoType[] = [{ id: 0, text: '吃饭', done: false }]

type actionType =
  | { type: 'add'; payload: string }
  | { type: 'toggle'; id: ToDoType['id'] }
  | { type: 'delete'; id: ToDoType['id'] }
  | { type: 'localData'; payload: ToDoType[] }

// const reducer = (state: ToDoType[], action: actionType) => {
//   let newToDos: ToDoType[] = []
//   switch (action.type) {
//     case 'add':
//       return [...state, { id: state.length, text: action.payload, done: false }]
//     case 'toggle':
//       newToDos = state.map((todo) => {
//         if (todo.id === action.id) {
//           return {
//             ...todo,
//             done: !todo.done
//           }
//         } else {
//           return todo
//         }
//       })
//       return newToDos
//     case 'delete':
//       newToDos = state.filter((todo) => todo.id !== action.id)
//       return newToDos
//       case 'localData':
//         return action.payload
//     default:
//       return state
//   }
// }

// 创建自定义hooks
const useToDos = (initialData: ToDoType[]) => {
  const [toDos, setToDos] = useState<ToDoType[]>(initialData)
  const addToDo = (value: string) => {
    if (value.trim() !== '') {
      setToDos([...toDos, { id: toDos.length, text: value, done: false }])
      // dispatch({ type: 'add', payload: value })
    }
  }

  const toggleToDo = (id: number) => {
    console.log(id)
    // dispatch({ type: 'toggle', id })
    const newToDos: ToDoType[] = toDos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done
        }
      } else {
        return todo
      }
    })
    setToDos(newToDos)
  }

  const deleteTodo = (id: number) => {
    const newToDos: ToDoType[] = toDos.filter((todo) => todo.id !== id)
    setToDos(newToDos)
    // dispatch({ type: 'delete', id })
  }
  return { toDos,setToDos, addToDo, toggleToDo, deleteTodo }
}

const App = () => {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const { toDos,setToDos, addToDo, toggleToDo, deleteTodo } = useToDos(initialState)
  useEffect(() => {
    const TodoList = window.localStorage.getItem('TodoList')
    if (TodoList) {
      const TodoData: ToDoType[] = JSON.parse(TodoList)
      // dispatch({ type: 'localData', payload: TodoData })
      setToDos(TodoData)
    }
  }, [])
  // 数据持久化
  useEffect(() => {
    let newTodoList = JSON.stringify(toDos)
    window.localStorage.setItem('TodoList', newTodoList)
  }, [toDos])

  return (
    <section className="todoapp">
      {/* 添加任务 */}
      <TodoAdd onAddToDo={addToDo} />

      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {/* 列表组件 */}
        <toDoContext.Provider
          value={{
            toDos: toDos,
            onToggleToDo: toggleToDo,
            onDeleteToDo: deleteTodo
          }}
        >
          <MainSection />
        </toDoContext.Provider>
      </section>

      {/* footer 组件 */}

      <TodoFooter />
    </section>
  )
}

export default App
