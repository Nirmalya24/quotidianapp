import { memo, useCallback, useState} from 'react'
import { useDrop } from 'react-dnd'
import { WIDGET_TYPE, subWidgets } from "./SubWidgets"
import TargetRearrange from './TargetRearrange';

const style = {
  height: '90vh',
  width: '90vw',
}

const TargetBox = memo(function TargetBox({ onDrop, board }) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: WIDGET_TYPE,
      drop: (item) => onDrop(item.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  return (
    <div>
      <div ref={drop} style={{ ...style }} role="TargetBox" className="pl-7">
        {/* Rearrange widgets on the screen */}
        <TargetRearrange board={board} />
      </div>
    </div>
  );
});

export const StatefulTargetBox = (props) => {
  const [board, setBoard] = useState([]);

  const addWidgetToBoard = useCallback(
    (itemID) => {
      const widgetToDrop = subWidgets.find((widget) => itemID === widget.id);
      if (!board || !board.includes(widgetToDrop))
        setBoard((board) => [...board, widgetToDrop]);
      else console.log("Adding duplicate widget is not allowed.");
    },
    [board]
  );

  return <TargetBox {...props} onDrop={addWidgetToBoard} board={board} />;
};

