import { memo, useCallback, useMemo, useState } from 'react'
import { useDrag } from 'react-dnd'
import { WIDGET_TYPE } from './Container'

const style = {
  border: '1px solid gray',
  padding: '0.5rem',
  margin: '0.5rem',
}

export const SourceBox = memo(function SourceBox({ widget }) {
  console.log("passed in", widget.id, widget.color)
  const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: WIDGET_TYPE,
      item: {id: widget.id},
      canDrag: !forbidDrag,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag, widget],
  )
  
  const onToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag)
  }, [forbidDrag, setForbidDrag])

  
  const containerStyle = useMemo(
    () => ({
      ...style,
      color: 'purple', 
      background: widget.color,
      opacity: isDragging ? 0.4 : 1,
      cursor: forbidDrag ? 'default' : 'move',
    }),
    [isDragging, forbidDrag],
  )
  return (
    <div ref={drag} style={containerStyle} role="SourceBox" data-color={widget.color}>
      <input
        type="checkbox"
        checked={forbidDrag}
        onChange={onToggleForbidDrag}
      />
      <small>hello drag</small>
      <img src={widget.url} alt='emoji'></img>
    </div>
  )
})
