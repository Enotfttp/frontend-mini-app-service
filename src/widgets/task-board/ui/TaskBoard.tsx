import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

import { ITask, TaskStatus, useGetTasks, useUpdateTask } from '@entities/task';
import { useGetUsers } from '@entities/user';
import { CreateTaskDialog } from '@features/create-task';

import { TaskCard } from './TaskCard';
import { TaskColumn } from './TaskColumn';
import { BoardContainer } from './TaskBoard.styled';

const STATUS_ORDER: TaskStatus[] = [
  TaskStatus.CREATED,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DECLINED,
  TaskStatus.APPROVED,
];

export const TaskBoard: React.FC = () => {
  const { data, isLoading, isError } = useGetTasks();
  const tasks = Array.isArray(data) ? data : [];
  const { data: usersData } = useGetUsers();
  const users = Array.isArray(usersData) ? usersData : [];
  const { mutate: updateTask } = useUpdateTask();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const creatorId = users[0]?.id;

  const tasksByStatus = useMemo(() => {
    const map: Record<TaskStatus, typeof tasks> = {
      [TaskStatus.CREATED]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.DECLINED]: [],
      [TaskStatus.APPROVED]: [],
    };
    tasks.forEach((task) => {
      if (map[task.status]) {
        map[task.status].push(task);
      }
    });
    return map;
  }, [tasks]);

  const taskMap = useMemo(() => {
    const m: Record<string, ITask> = {};
    tasks.forEach((t) => (m[t.id] = t));
    return m;
  }, [tasks]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const resolveTargetStatus = useCallback(
    (overId: string): TaskStatus | null => {
      if (STATUS_ORDER.includes(overId as TaskStatus)) return overId as TaskStatus;
      const task = taskMap[overId];
      return task?.status ?? null;
    },
    [taskMap],
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    const task = active.data.current?.task as ITask | undefined;
    if (task) setActiveTask(task);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveTask(null);
    if (!over) return;

    const task = active.data.current?.task as ITask | undefined;
    if (!task) return;

    const newStatus = resolveTargetStatus(over.id as string);
    if (!newStatus || newStatus === task.status) return;

    updateTask({ id: task.id, payload: { status: newStatus } });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box px={2} pt={1.5} display="flex" alignItems="center" justifyContent="flex-end" gap={2}>
        {isError && (
          <Typography variant="body2" color="error">
            Не удалось загрузить задачи
          </Typography>
        )}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ textTransform: 'none' }}
        >
          Добавить задачу
        </Button>
      </Box>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <BoardContainer>
          {STATUS_ORDER.map((status) => (
            <SortableContext
              key={status}
              items={tasksByStatus[status].map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              <TaskColumn status={status} tasks={tasksByStatus[status]} users={users} />
            </SortableContext>
          ))}
        </BoardContainer>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              status={activeTask.status}
              users={users}
              isDragOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <CreateTaskDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        creatorId={creatorId}
      />
    </>
  );
};
