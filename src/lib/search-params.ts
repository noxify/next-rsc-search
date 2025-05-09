import type { FiltersState } from "@/components/data-table-filter/core/types"
import type { inferParserType } from "nuqs/server"
import {
  createSearchParamsCache,
  createSerializer,
  parseAsJson,
} from "nuqs/server"
import { z } from "zod"

export const filtersSchema = z.custom<FiltersState>()

export const searchParams = {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  filters: parseAsJson(filtersSchema.parse).withDefault([]),
}

export const searchParamsCache = createSearchParamsCache(searchParams)

// workaround to solve the current type issue for
// export const serialize = createSerializer({ ...searchParams })
export const serialize = (
  path: string,
  options: Partial<inferParserType<typeof searchParams>>,
) => {
  const fn = createSerializer({ ...searchParams })

  return fn(path, options)
}
