import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card, Table } from "react-bootstrap";
import TaskDragDrop from "../TaskDragDrop/TaskDragDrop";

interface Props {
  droppableId: string;
  list: Array<any>;
  type?: string;
}

const ColumnDragDrop = ({ droppableId, list, type }: Props) => {
  return (
    <Droppable droppableId={droppableId} type={type}>
      {(provided) => (
        <Card {...provided.droppableProps} ref={provided.innerRef}>
          <Card.Header>Completed</Card.Header>
          <Card.Body>
            <Table hover>
              <tbody>
                {list.map((item, index) => (
                  <TaskDragDrop
                    key={item?.id.toString() as string}
                    id={item?.id.toString() as string}
                    index={index}
                    title={item?.title as string}
                  />
                ))}
                {provided.placeholder}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Droppable>
  );
};

export default ColumnDragDrop;
