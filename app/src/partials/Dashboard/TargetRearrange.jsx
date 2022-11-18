import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QuoteWidget from './Widgets/QuoteWidget';
import CalendarWidget from './Widgets/CalendarWidget';
import ToDoWidget from './Widgets/TodosWidget';
import TimerWidget from './Widgets/TimerWidget';
import WeatherWidget from './Widgets/WeatherWidget';
import NewsWidget from '../Dashboard/Pages/NewsDashboard';

function TargetRearrange({ board }) {

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const [reorderedItem] = board.splice(result.source.index, 1);
        board.splice(result.destination.index, 0, reorderedItem);

        console.log("switching positions from: ", result.source.index)
        console.log("switching positions to: ", result.destination.index)
    }

    const getComponent = (title) => {
        { console.log("Dropping into home page: ", title) }
        switch (title) {
            case "Quote":
                return <QuoteWidget />
            case "Calendar":
                return <CalendarWidget />
            case "To Do List":
                return <ToDoWidget />
            case "Timer":
                return <TimerWidget />
            case "Weather":
                return <WeatherWidget />
            case "News":
                return <NewsWidget />
        }
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="widgetID">
                    {(provided) => (
                        <div className='flex flex-wrap'
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {board.map(({ id, title }, index) => {
                                return (
                                    <Draggable
                                        key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                            <div className="widgetID" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <div >
                                                    {getComponent(title)}
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
