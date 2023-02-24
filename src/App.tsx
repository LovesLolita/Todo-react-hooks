import { useState, useEffect } from 'react'

import TodoAdd from './components/TodoAdd'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

// 导入todos样式
import './App.css'

interface ToDoType {
  id: number
  text: string
  done: boolean
}

const App = () => {
  const [toDos, setToDos] = useState<ToDoType[]>([
    { id: 0, text: '吃饭', done: false }
  ])

  useEffect(()=>{
    const TodoList = window.localStorage.getItem('TodoList')
    if(TodoList){
      const TodoData : ToDoType[] = JSON.parse(TodoList)
      setToDos(TodoData)
    }
  },[])
  // 数据持久化
  useEffect(() => {
    let newTodoList = JSON.stringify(toDos)
    window.localStorage.setItem('TodoList',newTodoList )
  }, [toDos])


  const addToDo = (value: string) => {
    if (value.trim() !== '') {
      setToDos([...toDos, { id: toDos.length, text: value, done: false }])
    }
  }

  const toggleToDo = (id: number) => {
    console.log(id)
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

  const deleteTodo = (id:number) => {
    const newToDos: ToDoType[] = toDos.filter((todo) => todo.id !== id )
    setToDos(newToDos)
  }

  return (
    <section className="todoapp">
      {/* 添加任务 */}
      <TodoAdd onAddToDo={addToDo} />

      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {/* 列表组件 */}
        <TodoList list={toDos} onToggleToDo={toggleToDo} onDeleteToDo={deleteTodo} />
      </section>

      {/* footer 组件 */}
      <TodoFooter />
    </section>
  )
}

export default App
