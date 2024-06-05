import React, { useState, useEffect, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import "../styles/board.css"
import {v4 as uuidv4} from 'uuid';
import { taskContext } from "../App";

export default function Board() {
    const [data,setData] = useContext(taskContext)
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
    // const [data,setData] = useState([])  

    useEffect(() => {
        // fetch("https://jsonplaceholder.typicode.com/todos")
        //     .then((response) => response.json())
        //     .then((json) => {
        //         setCompleted(json.filter((task) => task.completed));
        //         setIncomplete(json.filter((task) => !task.completed));
        //     });
        // setInReview(data)
       setIncomplete(data.filter((task) => task.status ==1))
       setInReview(data.filter((task) => task.status ==2))
       setCompleted(data.filter((task) => task.status ==3))
       setBacklog(data.filter((task) => task.status ==4))
    }, [data]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        deletePreviousState(source.droppableId, draggableId);

        const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

        setNewState(destination.droppableId, task,draggableId);

    };

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(removeItemById(taskId, incomplete));
                break;
            case "3":
                setCompleted(removeItemById(taskId, completed));
                break;
            case "2":
                setInReview(removeItemById(taskId, inReview));
                break;
            case "4":
                setBacklog(removeItemById(taskId, backlog));
                break;
        }

    }
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
            case "4":  // BACKLOG
                updatedTask = { ...task, completed: false };

                setData(data.map(obj =>
                    obj.id === draggableId ? { ...obj, status: 4 } : obj
                ));

                setBacklog([updatedTask, ...backlog]);
                break;
        }
    }
    function findItemById(id, array) {
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    const handleClick = ()=>{

    }

    const handelAddTask =(e)=>{
        e.preventDefault();
// setTask({...task,id:uuidv4()})
const newTask = ({...task,id:uuidv4()})

setData([...data,newTask]);
setTask({task:"",dat:"",id:"",status:1})
    }
const handleChange=(e)=>{
setTask({...task,[e.target.name]:e.target.value})
}
    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="heading">
            <h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>
            <span onClick={handleClick}><i class="fa-solid fa-plus"></i></span>
            </div>
            <div>
                <form onSubmit={handelAddTask}>
                    <input type="text" name="task"placeholder="Task" onChange={handleChange} />
                    <input type="date" name="date" onChange={handleChange}/>
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

                <Column title={"TO DO"} tasks={incomplete} id={"1"} />
                <Column title={"IN REVIEW"} tasks={inReview} id={"2"} />
                <Column title={"DONE"} tasks={completed} id={"3"} />
                {/* <Column title={"BACKLOG"} tasks={backlog} id={"4"} /> */}
            </div>
        </DragDropContext>
    );
}