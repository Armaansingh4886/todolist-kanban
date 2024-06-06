import React, { useContext, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { taskContext } from "../App";
import '../styles/card.css';

const Container = styled.div`
    border-radius: 10px;
    box-shadow: 5px 5px 5px 2px grey;
    padding: 8px;
    color: #000;
    margin-bottom: 8px;
    min-height: 120px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: ${(props) => bgcolorChange(props)};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;
const TextContent = styled.div`

`;
const Icon = styled.div`
margin: 0 5px;
`;

const Icons = styled.div`
    display: flex;
    justify-content: end;
    padding: 2px;
    
`;
function bgcolorChange(props) {
    return props.isDragging
        ? "lightgreen"
        : props.isDraggable
            ? props.isBacklog
                ? "#F2D7D5"
                : "#DCDCDC"
            : props.isBacklog
                ? "#F2D7D5"
                : "#EAF4FC";
}

export default function Card({ task, index }) {
const [data,setData] = useContext(taskContext);
const [isEditing,setIsEditing] =useState(false);

const handleEdit = ()=>{

    setIsEditing(true)
}
const handleEditDone = ()=>{
    setIsEditing(false)
}

    const handleDelete =()=>{
setData(data.filter(obj => obj.id !== task.id))
    }
    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                {/* #{task.id} */}
                Due Date:-{task.date}
                  {"  "}
              </small>
            </span>
                    </div>
                    <div
                        style={{ display: "flex", justifyContent: "center", padding: 2 }}
                    >
                        <TextContent>{task.task}</TextContent>
                    </div>
                    <Icons>
                    {/* <Icon onClick={(isEditing)?(handleEditDone):(handleEdit)} style={{zIndex:999,cursor:"pointer"}}>
                            
                            <i class={(isEditing)?("fa-solid fa-check"):("fa-regular fa-pen-to-square")}></i>
                        </Icon> */}
                        <Icon onClick={handleDelete} style={{zIndex:999,cursor:"pointer"}}>
                            
                            <i class="fa-solid fa-trash"></i>
                        </Icon>
                    </Icons>
                    {provided.placeholder}
                </Container>
            )}
        </Draggable>
    );
}