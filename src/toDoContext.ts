import { createContext } from 'react'
import { ToDoType } from './toDoType'

// export interface ToDoType {
//   id: number
//   text: string
//   done: boolean
// }

interface toDoContextType{
  toDos:ToDoType[],
   // 切换任务状态的回调函数
   onToggleToDo: (id: number) => void

   // 删除任务的回调函数
   onDeleteToDo: (id: number) => void
}
const Context: toDoContextType = {} as toDoContextType
const toDoContext = createContext(Context)

export default toDoContext