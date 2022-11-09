import { memo, useCallback, useMemo, useState } from 'react'
import { useDrag } from 'react-dnd'
import { WIDGET_TYPE, widgets } from './Widgets'
import TimerImage from "../images/timer.png"

const style = {
  border: '1px solid gray',
  padding: '0.5rem',
  margin: '0.5rem',
}

const SourceBox = memo(function SourceBox({ widget }) {
  console.log("passed in", widget.id, widget.color)
  const [forbidDrag, setForbidDrag] = useState(false)
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: WIDGET_TYPE,
      item: { id: widget.id },
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

  const getWidgetImage = (url) => {
    switch(url) {
      case "TimerImage":
        return <img src={TimerImage} alt='timerImage'/>
      default:
        return <img src={widget.url} alt='emoji' />
    }
    
  }

  return (
    <div ref={drag} style={containerStyle} role="SourceBox" data-color={widget.color}>
      <input
        type="checkbox"
        checked={forbidDrag}
        onChange={onToggleForbidDrag}
      />
      <small>hello drag</small>
      <div >
        {getWidgetImage(widget.url)}
      </div>
    </div>
  )
})

export const StatefulSourceBox = (props) => {

  const widgetList = widgets.map((g) =>
    <div key={g.id}>
      <SourceBox
        widget={g}
      ></SourceBox>
    </div>
  );

  return (
    <div style={{ float: "left", padding: "20px", width: '20vw', overflowY: 'auto' }}>
      {widgetList}
    </div>
  )
}