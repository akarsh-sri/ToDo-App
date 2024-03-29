import { useState,useEffect } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import NV from './components/NV'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let tdstr=localStorage.getItem("todos");
    if(tdstr){
      let todos=JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }
  }, [])
  

  function savetoLS(){
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  function togglef(e) {
    setshowfinished(!showfinished)
  }

  function handelEdit(e,id) {
    let t=todos.filter(item=>{
      return item.id===id;
    })
    setTodo(t[0].todo)
    let newTodo = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodo);
    savetoLS()
  }

  function handleDelete(e, id) {
    let newTodo = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodo);
    savetoLS()
  }

  function handleAdd() {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLS()
  }

  function handleChange(e) {
    setTodo(e.target.value)
  }

  function handleCheck(e) {
    let id = e.target.name;
    for (let i = 0; i < todos.length; i++) {
      // console.log(todos[i])
      if (todos[i].id === id) {
        todos[i].isCompleted = !todos[i].isCompleted
        break;
      }
    }
    // console.log(todos)
    let nTodo = [...todos]
    setTodos(nTodo)
    savetoLS()
  }

  return (
    <>
      <NV />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] overflow-x-hidden w-1/2">
        <div className="addtodo my-5">
          <h2 className='text-lg mx-2'>Add Todo</h2>
          <input onChange={handleChange} value={todo} type='text' className='w-full my-5 rounded-2xl p-2'></input>
          <button onClick={handleAdd} disabled={todo.length<=0} className='bg-violet-600 hover:bg-violet-800 p-3 py-1  text-sm  text-white rounded-2xl disabled:bg-violet-400 w-full' >Save</button>
        </div>
        <input onChange={togglef} type='checkbox' checked={showfinished} className='my-2 mx-2'/>Show Finished
        <h1 className='text-xl font-bold my-4 mx-2'>Your Todos</h1>
        <div className="todos my-6">
          {todos.length === 0 && <div className='m-5'>Nothing to display.</div>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-full">
              <div className='flex gap-10'>
                <input name={item.id} onChange={handleCheck} type='checkbox' checked={item.isCompleted}></input>
                <div className={item.isCompleted ? "line-through" : ""}>
                  <div className="cont my-3">{item.todo}</div>
                </div>
              </div>
              <div className="buttons my-3 flex h-full">
                <button onClick={(e) => { handelEdit(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 p-3 py-1 mx-1 text-sm  text-white rounded-2xl'><FaRegEdit/></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-600 hover:bg-violet-800 p-3 py-1 mx-1 text-sm  text-white rounded-2xl'><MdDelete/></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
