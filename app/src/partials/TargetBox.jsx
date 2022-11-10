import { memo, useCallback, useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { WIDGET_TYPE, widgets } from './Widgets'
import TargetRearrange from './TargetRearrange';

const style = {
  border: '1px solid gray',
  height: '90vh',
  width: '90vw',
  padding: '2rem',
  textAlign: 'center',
}

const TargetBox = memo(function TargetBox({ onDrop, lastDroppedColor, board }) {

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: WIDGET_TYPE,
      drop: (item) => onDrop(item.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop],
  )
  const backgroundColor = lastDroppedColor

  return (
    <div>
      <p>Widget Go here.</p>

      <div
        ref={drop}
        data-color={"lastDroppedColor" || 'none'}
        style={{ ...style, backgroundColor }}
        role="TargetBox"
      >
        {/* Rearrange widgets on the screen */}
        <TargetRearrange board={board} />
      </div>
    </div>
  )
})

export const StatefulTargetBox = (props) => {
  const [board, setBoard] = useState([]);
  const [lastDroppedColor, setLastDroppedColor] = useState('gray')

  const addImageToBoard = useCallback((itemID) => {
    const widgetToDrop = widgets.find((color) => itemID === color.id);
    setLastDroppedColor(widgetToDrop.color);
    if (!board || !board.includes(widgetToDrop))
      setBoard((board) => [...board, widgetToDrop]);
    else
      console.log("Adding duplicate image is not allowed.")
  }, [board])

  return (
    <TargetBox
      {...props}
      lastDroppedColor={lastDroppedColor}
      onDrop={addImageToBoard}
      board={board}
    />
  )
}
