"use client"

import type React from "react"

import type { Task } from "@/types/task"
import TaskCard from "./task-card"

interface KanbanColumnProps {
  title: string
  tasks: Task[]
  status: "todo" | "doing" | "done"
  onDragStart: (e: React.DragEvent, id: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent, status: "todo" | "doing" | "done") => void
}

export default function KanbanColumn({ title, tasks, status, onDragStart, onDragOver, onDrop }: KanbanColumnProps) {
  return (
    <div
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden flex flex-col"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, status)}
    >
      <div className="p-4 border-b border-gray-800 bg-gray-900/80">
        <h2 className="font-semibold text-lg flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-2 ${
              status === "todo" ? "bg-blue-500" : status === "doing" ? "bg-amber-500" : "bg-green-500"
            }`}
          ></div>
          {title}
          <span className="ml-2 text-sm text-gray-400">({tasks.length})</span>
        </h2>
      </div>
      <div className="p-3 flex-1 overflow-y-auto max-h-[calc(100vh-220px)]">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 italic text-sm">No tasks yet</div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

