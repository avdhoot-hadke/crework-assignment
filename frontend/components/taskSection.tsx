import { UserContext } from "@/app/context";
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function TaskSection() {
  const { user } = useContext(UserContext);
  const [ToDo, setToDo] = useState<any>([]);
  const [InProgress, setInProgress] = useState<any>([]);
  const [UnderReview, setUnderReview] = useState<any>([]);
  const [Completed, setCompleted] = useState<any>([]);

  useEffect(() => {
    if (user != null) {
      console.log("userDetails", user);
      const ToDoArray: any = [];
      const InProgressArray: any = [];
      const UnderReviewArray: any = [];
      const CompletedArray: any = [];
      user.tasks.forEach((task: any) => {
        switch (task.status) {
          case "To-Do":
            ToDoArray.push(task);
            break;
          case "In Progress":
            InProgressArray.push(task);
            break;
          case "Under Review":
            UnderReviewArray.push(task);
            break;
          case "Completed":
            CompletedArray.push(task);
            break;
          default:
            console.warn(`Unknown status: ${task.status}`);
            break;
        }
      });
      setToDo(ToDoArray);
      setInProgress(InProgressArray);
      setUnderReview(UnderReviewArray);
      setCompleted(CompletedArray);
      console.log(InProgressArray);
    }
  }, [user]);

  const handleOnDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="h-full pt-4">
        <div className="grid grid-cols-4 gap-2 pt-4 bg-white ">
          {/* COLUMN */}
          <div className="flex flex-col h-full">
            <div className="text-center p-2 bg-white rounded">To-Do</div>
            <Droppable droppableId="To-Do">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {ToDo.map((t: any, index: any) => (
                    <Draggable draggableId={t._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <TaskCard task={t} key={t._id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* COLUMN */}
          <div className="flex flex-col ">
            <div className="text-center p-2 bg-white rounded">In Progress</div>
            <Droppable droppableId="In Progress">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {InProgress.map((t: any, index: any) => (
                    <Draggable draggableId={t._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <TaskCard task={t} key={t._id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
          {/* COLUMN */}
          <div className="flex flex-col ">
            <div className="text-center p-2 bg-white rounded">Under Review</div>
            <Droppable droppableId="Under Review">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {UnderReview.map((t: any, index: any) => (
                    <Draggable draggableId={t._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <TaskCard task={t} key={t._id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
          {/* COLUMN */}
          <div className="flex flex-col ">
            <div className="text-center p-2 bg-white rounded">Completed</div>
            <Droppable droppableId="Completed">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {Completed.map((t: any, index: any) => (
                    <Draggable draggableId={t._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <TaskCard task={t} key={t._id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export function TaskCard({ task }: { task: any }) {
  function priorityColorFn() {
    if (task?.priority == "Low") return "bg-green-400";
    else if (task?.priority == "Medium") return "bg-yellow-400";
    else return "bg-red-400";
  }
  function formatDate() {
    const date = new Date(task?.deadline);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = String(date.getUTCFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  }

  const priorityColor = priorityColorFn();
  const date = formatDate();
  return (
    <div className="flex flex-col bg-[#F4F4F4] p-2 rounded-lg border m-2">
      <h1 className="text-md text-[#606060] py-2">{task?.title}</h1>
      <p className="text-sm text-[#797979] line-clamp-3 py-2">
        {task?.description}
      </p>
      {task?.priority && (
        <div className={`${priorityColor} w-16 text-center rounded py-2`}>
          {task?.priority}
        </div>
      )}
      {task?.deadline && (
        <div className="flex gap-1">
          <img src="clock.svg" alt="time" />
          <div className="text-sm text-[#606060] py-2">{date}</div>
        </div>
      )}
    </div>
  );
}
