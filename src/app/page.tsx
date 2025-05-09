import { searchParamsCache } from "@/lib/search-params"

import SimpleFilter from "./_components/simple-filter"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = searchParamsCache.parse(await searchParams)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <SimpleFilter />
      <br />
      Current filter
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </main>
  )
}
