import React, { useContext, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import "./scroll.css";
import "../styles/column.css"
import { Droppable } from "react-beautiful-dnd";
import { taskContext } from "../App";

const Container = styled.div`
    background-color: #f4f5f7;
    border-radius: 2.5px;
    width: 420px;
    height: 900px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    border: 1px solid gray;
    border-radius: 20px;
`;

const Title = styled.h3`
    padding: 8px;
    background-color: pink;
    text-align: center;
`;

const TaskList = styled.div`
    padding: 3px;
    transistion: background-color 0.2s ease;
    background-color: #f4f5f7;
    flex-grow: 1;
    min-height: 100px;
`;

export default function Column({ title, tasks, id }) {
    const [alphaSort,setAlphaSort] = useState('asc');
    
    const [dateSort,setDateSort] = useState('asc');
    
    const [data,setData] = useContext(taskContext);
    const handleDelete =()=>{
    setData(data.filter(obj => obj.status !== 3))
    }
    // SORTING ACCORDING TO NAME 
  const handleAlphaSort =()=>{
    console.log(tasks);
    tasks = tasks.sort((a,b)=>{
        if (alphaSort === 'asc') {
            return a.task.localeCompare(b.task);
          } else {
            return b.task.localeCompare(a.task);
          }
    })
    if(alphaSort==='asc'){
    setAlphaSort('desc')}else{
        setAlphaSort('asc')
    }
  }
// SORTING ACCORDING TO DUE DATE
  const handleDateSort =()=>{
    console.log(tasks);
    tasks = tasks.sort((a,b)=>{
        if (dateSort === 'asc') {
            return a.date.localeCompare(b.date);
          } else {
            return b.date.localeCompare(a.date);
          }
    })
    if(dateSort==='asc'){
    setDateSort('desc')}else{
        setDateSort('asc')
    }
  }
    return (
        <Container className="column">
            <Title
                style={{
                    backgroundColor: "lightblue",
                    position: "sticky",
                    top: "0",
                }}
            >
                {title}
                <span className="column-icon">
                
                <i onClick={handleAlphaSort} title="Sort By Task Name" class={(alphaSort==='asc')?('fa-solid fa-arrow-up-z-a'):('fa-solid fa-arrow-up-a-z')}></i>

                <i onClick={handleDateSort} title="Sort By Due Date" class={(dateSort==='asc')?('fa-solid fa-arrow-up-9-1'):('fa-solid fa-arrow-up-1-9')}></i>
                {(id==='3')?(<i onClick={handleDelete} title="Delete all completed Tasks" className=" fa-regular fa-trash-can"></i>):""}</span>
            </Title>

            {/* ADDING CARDS OF TASKS */}
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Card key={index} index={index} task={task} />
                        ))}
                        {provided.placeholder}
                    </TaskList>
                )}
            </Droppable>
        </Container>
    );
}