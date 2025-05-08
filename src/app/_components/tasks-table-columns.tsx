"use client"

import type { Task } from "@prisma/client"
import * as React from "react"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { TaskLabel, TaskPriority, TaskStatus } from "@/enum"
import { TaskWithRelations } from "@/types/prisma"
import { type ColumnDef } from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircle2Icon,
  CircleIcon,
  Clock3Icon,
  HelpCircleIcon,
  XCircleIcon,
} from "lucide-react"

export function getColumns(): ColumnDef<TaskWithRelations>[] {
  return [
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Task" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("code")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const label = Object.values(TaskLabel).find(
          (label) => label === row.original.label,
        )

        return (
          <div className="flex space-x-2">
            {label && <Badge variant="outline">{label}</Badge>}
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("name")}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = Object.values(TaskStatus).find(
          (status) => status === row.original.status,
        )

        if (!status) return null

        return (
          <div className="flex w-[100px] items-center">
            {status === "canceled" ? (
              <XCircleIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : status === "done" ? (
              <CheckCircle2Icon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : status === "in_progress" ? (
              <Clock3Icon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : status === "todo" ? (
              <HelpCircleIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : (
              <CircleIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            )}
            <span className="capitalize">{status}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const priority = Object.values(TaskPriority).find(
          (priority) => priority === row.original.priority,
        )

        if (!priority) {
          return null
        }

        return (
          <div className="flex items-center">
            {priority === "low" ? (
              <ArrowDownIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : priority === "medium" ? (
              <ArrowRightIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : priority === "high" ? (
              <ArrowUpIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            ) : (
              <CircleIcon
                className="text-muted-foreground mr-2 size-4"
                aria-hidden="true"
              />
            )}
            <span className="capitalize">{priority}</span>
          </div>
        )
      },
    },

    {
      accessorKey: "assignee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assignees" />
      ),
      cell: ({ row }) => {
        return <>{row.original.assignee.map((ele) => ele.name)}</>
      },
    },
  ]
}
