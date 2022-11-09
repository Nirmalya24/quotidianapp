import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../css/widget-page/ddcss.css';
import Timer from './Timer';

function TargetRearrange({ board }) {

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const [reorderedItem] = board.splice(result.source.index, 1);
        board.splice(result.destination.index, 0, reorderedItem);

        console.log("switching positions from: ", result.source.index)
        console.log("switching positions to: ", result.destination.index)
    }

    const getComponent = (component) => {
        {console.log("here", component)}
        switch(component) {
            case "Timer":
                return <Timer/>
        }
    }

    return (
        <div className="widget-rearrange">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="widgets">
                    {(provided) => (
                        <ul className="widgets"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {board.map(({ id, color, url, component }, index) => {
                                return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div className="widgets-url">
                                                    <img src={url} alt={color} />
                                                </div>
                                                 {getComponent(component)}
                                                <p>
                                                    {color}
                                                </p>
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default TargetRearrange;