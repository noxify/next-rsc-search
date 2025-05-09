import type { ColumnOption } from "@/components/data-table-filter/core/types"
import type { TaskWithRelations } from "@/types/prisma"
import { createColumnConfigHelper } from "@/components/data-table-filter/core/filters"
import { TaskLabel, TaskPriority, TaskStatus } from "@/enum"

const dtf = createColumnConfigHelper<TaskWithRelations>()

export const statusOptions: ColumnOption[] = Object.values(TaskStatus).map(
  (ele) => ({
    value: ele,
    label: ele,
    icon: undefined,
  }),
)
export const priorityOptions = Object.values(TaskPriority).map((ele) => ({
  value: ele,
  label: ele,
  icon: undefined,
}))
export const labelOptions = Object.values(TaskLabel).map((ele) => ({
  value: ele,
  label: ele,
  icon: undefined,
}))

export default [
  dtf
    .text()
    .id("name")
    .accessor((row) => row.name)
    .displayName("Name")
    .build(),
  dtf
    .text()
    .id("id")
    .accessor((row) => row.id)
    .displayName("Task ID")
    .build(),
  dtf
    .multiOption()
    .options(statusOptions)
    .id("status")
    .accessor((row) => row.status)
    .displayName("Status")
    .build(),
  dtf
    .multiOption()
    .options(priorityOptions)
    .id("priority")
    .accessor((row) => row.priority)
    .displayName("Priority")
    .build(),
  dtf
    .multiOption()
    .options(labelOptions)
    .id("label")
    .accessor((row) => row.label)
    .displayName("Label")
    .build(),
] as const
