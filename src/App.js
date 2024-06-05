import { createContext, useEffect, useState } from 'react';
import './App.css';
import Board from "./components/Board";
import Column from "./components/Column";

export const taskContext = createContext();
function App() {
const [data,setData] = useState([]);

useEffect(()=>{

  const storedData = JSON.parse(localStorage.getItem('tasks')) || [];
    setData(storedData);
  },[])




useEffect(()=>{
console.log(data);
localStorage.setItem('tasks', JSON.stringify(data));

},[data])


  return (
    <taskContext.Provider value={[data,setData]}>
    <div className="App">
        <Board />
    </div>
    </taskContext.Provider>
  );
}

export default App;
