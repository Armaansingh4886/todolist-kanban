import React, { useState, useEffect, useContext, useRef } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import "../styles/board.css"
import {v4 as uuidv4} from 'uuid';
import { taskContext } from "../App";

export default function Board() {
    const [data,setData] = useContext(taskContext)
    const addCard = useRef(null)
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);
    const [task,setTask]=useState({
        task:"",
        date:"",
        id:"",
        status:1
    });
    const [searchKeyword,setSearchKeyword] = useState("");

    useEffect(() => {
    
       setIncomplete(data.filter((task) => task.status ==1))
       setInReview(data.filter((task) => task.status ==2))
       setCompleted(data.filter((task) => task.status ==3))
    }, [data]);
    // SETTING TASK AFTER STATUS CHANGED
    useEffect(() => {
  


        if(searchKeyword !== ""){ 

        setIncomplete(data.filter(task => {return task.task.toLowerCase().includes(searchKeyword.toLowerCase())&& task.status ==1}))
        setInReview(data.filter(task => {return task.task.toLowerCase().includes(searchKeyword.toLowerCase())&& task.status ==2}))
        setCompleted(data.filter(task => {return task.task.toLowerCase().includes(searchKeyword.toLowerCase())&& task.status ==3}))

    }else{
        setIncomplete(data.filter((task) => task.status ==1))
        setInReview(data.filter((task) => task.status ==2))
        setCompleted(data.filter((task) => task.status ==3))
    }
     }, [searchKeyword]);

// HANDLING DRAG END

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

      

        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview]);

        setNewState(destination.droppableId, task,draggableId);

    };

//    UPDATE STATE AFTER DRAG IS OVER
    function setNewState(destinationDroppableId, task,draggableId) {
        let updatedTask;
        switch (destinationDroppableId) {
            case "1":   // TO DO
                updatedTask = { ...task, completed: false };
                setData(data.map(obj =>
                    obj.id === draggableId ? { ...obj, status: 1 } : obj
                ));
                setIncomplete([updatedTask, ...incomplete]);
                break;
            case "3":  // DONE
                updatedTask = { ...task, completed: true };
                setData(data.map(obj =>
                    obj.id === draggableId ? { ...obj, status: 3 } : obj
                ));
                setCompleted([updatedTask, ...completed]);
                break;
            case "2":  // IN REVIEW
                updatedTask = { ...task, completed: false };
                setData(data.map(obj =>
                    obj.id === draggableId ? { ...obj, status: 2 } : obj
                ));
                setInReview([updatedTask, ...inReview]);
                break;
           
        }
    }
    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

  
    const handelAddTask =(e)=>{
        e.preventDefault();
// setTask({...task,id:uuidv4()})
const newTask = ({...task,id:uuidv4()})

setData([...data,newTask]);
setTask({task:"",date:"",id:"",status:1})
    }
const handleChange=(e)=>{
setTask({...task,[e.target.name]:e.target.value})
}
const hideAddCard =()=>{
    addCard.current.classList.add("d-none")
}
const showAddCard =()=>{
    addCard.current.classList.remove("d-none")
}
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="heading">
            <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>
            <span onClick={showAddCard}><i title="Add New Task" class="fa-solid fa-plus"></i></span>
            </div>
            {/* SEARCH BAR */}
            <div className="search">
                <input type="text" name="text" onChange={(e)=>{setSearchKeyword(e.target.value)}} placeholder="Search..."/>
             
            </div>
            {/* ADDING NEW TASK TO LIST */}
            <div className="add-task d-none" ref={addCard}>
                <i onClick={hideAddCard}  class="fa-solid fa-xmark"></i>
                <form onSubmit={handelAddTask}>
                    <h2>Add New Task</h2>
                    <input required type="text" name="task"placeholder="Task" value={task.task} onChange={handleChange} />
                    <input required type="date" name="date" value={task.date} onChange={handleChange}/>
                    <input type="submit" value="Add"/>
                </form>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "1300px",
                    margin: "0 auto"
                }}
            >
{/* CREATING THREE COLUMNS */}
                <Column title={"TO DO"} tasks={incomplete} id={"1"} />
                <Column title={"IN REVIEW"} tasks={inReview} id={"2"} />
                <Column title={"DONE"} tasks={completed} id={"3"} />
            </div>
        </DragDropContext>
    );
}