import { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { WIDGET_TYPE } from './Container'
import { colors } from './Container'


const style = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
}
const TargetBox = memo(function TargetBox({ onDrop, lastDroppedColor }) {
 
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
    <div
      ref={drop}
      data-color={"lastDroppedColor" || 'none'}
      style={{ ...style, backgroundColor, opacity }}
      role="TargetBox"
    >
      <p>Widget Go here.</p>

      {!canDrop && lastDroppedColor}
      
    </div>
  )
})
export const StatefulTargetBox = (props) => {
  const [lastDroppedColor, setLastDroppedColor] = useState('gray')
  const [lastImage, setLastImage] = useState(null)
  
  const handleDrop = useCallback((itemID) => { 
    const widgetToDrop = colors.find(color => {
      return color.id === itemID;
    })
    setLastDroppedColor(widgetToDrop.color);
    console.log(`color in onDrop: ${itemID}`)
  }, [])
  return (
    <TargetBox
      {...props}
      lastDroppedColor={lastDroppedColor}
      onDrop={handleDrop}
    />
  )
}
