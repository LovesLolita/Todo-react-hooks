import TodoList from './TodoList'



const MainSection = () => {
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      {/* 列表组件 */}
      <TodoList />
    </section>
  )
}

export default MainSection
