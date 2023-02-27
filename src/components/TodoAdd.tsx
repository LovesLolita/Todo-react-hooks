import * as React from 'react';
import { useState, useRef } from 'react';

interface Props {
  onAddToDo: ( value:string )=> void
}

const TodoAdd = ({ onAddToDo }:Props ) => {

  const inputRef = useRef<HTMLInputElement>(null)
  const onClick = () => {
    console.log((inputRef.current as HTMLInputElement));
    
  }
  // 输入框
  const [value, setValue] =useState('')
  
  // 修改值
  const editValue = (e: React.FormEvent<HTMLInputElement>) => {
    setValue((e.currentTarget as HTMLInputElement).value)
  }

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.code === 'Enter'){
      onAddToDo(value)
      setValue('')
    }  
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
      ref={inputRef}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={value}
        onInput={editValue}
        onKeyDown={keyDown}
        onClick={onClick}
      />
    </header>
  )
}

export default TodoAdd
