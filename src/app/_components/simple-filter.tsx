"use client"

import type { Prisma } from "@prisma/client"
import { startTransition, use } from "react"
import {
  DataTableFilter,
  useDataTableFilters,
} from "@/components/data-table-filter"
import { searchParams } from "@/lib/search-params"
import { useQueryState } from "nuqs"

import simpleFilterColumns, {
  labelOptions,
  priorityOptions,
  statusOptions,
} from "../_config/simple-filter-columns"

export default function SimpleFilter({
  assigneePromise,
}: {
  assigneePromise: Promise<Prisma.AssigneeGetPayload<null>[]>
}) {
  const assignees = use(assigneePromise)
  const [filterParams, setFilterParams] = useQueryState(
    "filters",
    searchParams.filters.withDefault([]).withOptions({
      startTransition,
      shallow: false,
      clearOnDefault: true,
      history: "push",
    }),
  )

  const { columns, filters, actions, strategy } = useDataTableFilters({
    strategy: "server",
    data: [],
    columnsConfig: simpleFilterColumns,
    filters: filterParams,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onFiltersChange: setFilterParams,
    options: {
      status: statusOptions,
      priority: priorityOptions,
      label: labelOptions,
      assignee: assignees.map((a) => ({
        value: a.id,
        label: a.name,
        icon: undefined,
      })),
    },
  })

  return (
    <DataTableFilter
      filters={filters}
      columns={columns}
      strategy={strategy}
      actions={actions}
    />
  )
}
