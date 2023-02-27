import { useContext } from 'react'
import toDoContext from '../toDoContext'

// 3.1 为 TodoList 组件，指定 props 的类型


const TodoList = () => {
  const {toDos,onToggleToDo, onDeleteToDo } = useContext(toDoContext)

  const toggleChange = (id: number) => {
    onToggleToDo(id)
  }

  const deleteTodo = (id:number) => {
    onDeleteToDo(id)
  }

  return (
    <ul className="todo-list">
      {/* 编辑样式：editing  已完成样式：completed */}
      {toDos.map((todo) => (
        <li key={todo.id} className={todo.done ? 'completed' : '' }>
          <div className="view">
            <input className="toggle" type="checkbox" checked={todo.done} onChange={():void => toggleChange(todo.id)} />
            <label>{todo.text}</label>
            <button className="destroy" onClick={ () => deleteTodo(todo.id)  } />
          </div>
          <input className="edit" defaultValue="Create a TodoMVC template" />
        </li>
      ))}
    </ul>
  )
}

export default TodoList
