// 3.1 为 TodoList 组件，指定 props 的类型
interface Props {
  list: {
    id: number
    text: string
    done: boolean
  }[],
  onToggleToDo: (id:number) => void,
  onDeleteToDo: (id:number) => void
}

const TodoList = ({ list,onToggleToDo,onDeleteToDo }: Props) => {
  // console.log(list)

  const toggleChange = (id: number) => {
    onToggleToDo(id)
  }

  const deleteTodo = (id:number) => {
    onDeleteToDo(id)
  }

  return (
    <ul className="todo-list">
      {/* 编辑样式：editing  已完成样式：completed */}
      {list.map((todo) => (
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
