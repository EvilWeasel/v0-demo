"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import KanbanColumn from "./kanban-column"
import type { Task } from "@/types/task"

// Sample data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design System Updates",
    description: "Update the design system with new color palette and typography",
    status: "todo",
    priority: "high",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Integrate the new payment gateway API",
    status: "todo",
    priority: "medium",
  },
  {
    id: "3",
    title: "User Authentication Flow",
    description: "Implement the new user authentication flow with biometric options",
    status: "doing",
    priority: "high",
  },
  {
    id: "4",
    title: "Performance Optimization",
    description: "Optimize rendering performance for the dashboard",
    status: "doing",
    priority: "medium",
  },
  {
    id: "5",
    title: "Mobile Responsiveness",
    description: "Ensure all components are fully responsive on mobile devices",
    status: "done",
    priority: "high",
  },
  {
    id: "6",
    title: "Documentation",
    description: "Update technical documentation for the new features",
    status: "done",
    priority: "low",
  },
]

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  })
  const [open, setOpen] = useState(false)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("taskId", id)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, status: "todo" | "doing" | "done") => {
    const taskId = e.dataTransfer.getData("taskId")

    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status } : task)))
  }

  const addNewTask = () => {
    const id = Math.random().toString(36).substring(2, 9)
    setTasks([...tasks, { id, ...newTask }])
    setNewTask({
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
    })
    setOpen(false)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Futuristic Kanban
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as "low" | "medium" | "high" })}
                  className="bg-gray-800 border border-gray-700 rounded-md p-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <Button
              onClick={addNewTask}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Create Task
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanColumn
          title="To Do"
          tasks={tasks.filter((task) => task.status === "todo")}
          status="todo"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <KanbanColumn
          title="In Progress"
          tasks={tasks.filter((task) => task.status === "doing")}
          status="doing"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <KanbanColumn
          title="Completed"
          tasks={tasks.filter((task) => task.status === "done")}
          status="done"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      </div>
    </div>
  )
}

