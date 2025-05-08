"use client"

import type { Task } from "@prisma/client"
import * as React from "react"
import { fields } from "@/app/_components/tasks-table-filter"
import { DataTable } from "@/components/data-table/data-table"
import { useDataTable } from "@/hooks/use-data-table"
import { TaskWithRelations } from "@/types/prisma"
import { getTasksData } from "@/utils/tasks-data"
import { type ColumnDef } from "@tanstack/react-table"
import { Field } from "react-querybuilder"

import { getColumns } from "./tasks-table-columns"

interface TasksTableProps {
  tasksPromise: ReturnType<typeof getTasksData>
}

export function TasksTable({ tasksPromise }: TasksTableProps) {
  // Learn more about React.use here: https://react.dev/reference/react/use
  const { data, pageCount } = React.use(tasksPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<TaskWithRelations, unknown>[]>(
    () => getColumns(),
    [],
  )

  const filterFields = React.useMemo<Field[]>(() => fields, [])

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
  })

  return (
    <div className="space-y-4 overflow-hidden">
      <DataTable table={table} columns={columns} filterFields={filterFields} />
    </div>
  )
}
