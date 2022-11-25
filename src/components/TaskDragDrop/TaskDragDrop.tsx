import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  id: string;
  index: number;
  title: string;
}

const TaskDragDrop = ({ id, index, title }: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <td>{title}</td>
        </tr>
      )}
    </Draggable>
  );
};

export default TaskDragDrop;
