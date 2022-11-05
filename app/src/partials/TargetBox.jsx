import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { WIDGET_TYPE, colors } from './Widgets'


const style = {
  border: '1px solid gray',
  height: '90vh',
  width: '90vw',
  padding: '2rem',
  textAlign: 'center',
  display: 'flex',
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
  const opacity = isOver ? 1 : 0.7
  const backgroundColor = lastDroppedColor

  return (
    <div>
      <p>Widget Go here.</p>

      <div
        ref={drop}
        data-color={"lastDroppedColor" || 'none'}
        style={{ ...style, backgroundColor, opacity }}
        role="TargetBox"
      >

        {!canDrop && lastDroppedColor}

        <div className='targetbox-widgets'>
          {board && board.map((each) => {
            return (
              <img
                className='dropped-widget'
                key={each.id}
                src={each.url} />
            )
          })}
        </div>
      </div>
    </div>
  )
})

export const StatefulTargetBox = (props) => {
  const [board, setBoard] = useState([]);
  const [lastDroppedColor, setLastDroppedColor] = useState('gray')

  const addImageToBoard = useCallback((itemID) => {
    const widgetToDrop = colors.find((color) => itemID === color.id);
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
      board={board}
      onDrop={addImageToBoard}
    />
  )
}
