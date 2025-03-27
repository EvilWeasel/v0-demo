"use client"

import type React from "react"

import type { Task } from "@/types/task"
import { Card, CardContent } from "@/components/ui/card"

interface TaskCardProps {
  task: Task
  onDragStart: (e: React.DragEvent, id: string) => void
}

export default function TaskCard({ task, onDragStart }: TaskCardProps) {
  const priorityColors = {
    low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    high: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  }

  return (
    <Card
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl hover:shadow-blue-900/5"
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-white">{task.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]} border`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
        <p className="text-sm text-gray-400">{task.description}</p>
      </CardContent>
    </Card>
  )
}

