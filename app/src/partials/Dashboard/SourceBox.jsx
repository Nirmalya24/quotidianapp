import { memo, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { WIDGET_TYPE, subWidgets } from "./SubWidgets"

const SourceBox = memo(function SourceBox({ widget }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: WIDGET_TYPE,
      item: { id: widget.id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [widget],
  )

  const containerStyle = useMemo(
    () => ({
      opacity: isDragging ? 0.4 : 1,
    }),
    [isDragging],
  )

  return (
    <div ref={drag} style={containerStyle} role="SourceBox">
      <div
        className={`rounded-md cursor-pointer hover:bg-[#FEA303] hover:text-white hover:font-bold font-semibold text-slate-300 items-center`}
      >
        <div className="card items-center text-center py-3">
          <div>{widget.icon}</div>
          <h2 className="text-xs">{widget.title}</h2>
        </div>
      </div>
    </div>
  )
})

export const StatefulSourceBox = () => {

  const widgetList = subWidgets.map((g) =>
    <div key={g.id}>
      <SourceBox
        widget={g}
      ></SourceBox>
    </div>
  );

  return (
      <div className="grid grid-cols-2 px-6 text-2xl overflow-auto h-48">
        {widgetList}
      </div>
  )
}
