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
        { console.log("here", component) }
        switch (component) {
            case "Timer":
                return <Timer />
        }
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="widgets">
                    {(provided) => (
                        <div className='flex flex-wrap'
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {board.map(({ id, color, component }, index) => {
                                return (
                                    <Draggable
                                        key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <div className="widgets " ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div >
                                                    {getComponent(component)}
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default TargetRearrange;