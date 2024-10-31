import { json } from "@remix-run/node"
import { useLoaderData, useSearchParams } from "@remix-run/react"
import { Button } from "@nextui-org/react"
import { getAllBadges } from "~/services/chain.server"

export async function loader() {
  const result = await getAllBadges()
  if (!result.success || !result.badges) {
    return json({ badges: [] })
  }
  const serializedBadges = result.badges.map(badge => ({
    tokenId: badge.tokenId.toString(),
    owner: badge.owner,
    mintTime: badge.mintTime.toString()
  }))
  return json({ badges: serializedBadges })
}

export default function Component() {
  const { badges } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const itemsPerPage = 20

  const totalPages = Math.ceil(badges.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBadges = badges.slice(startIndex, endIndex)

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="w-full px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
          Badge History
        </h1>

        <div className="relative w-[95%] mx-auto overflow-hidden rounded-2xl border border-primary/20 shadow-xl backdrop-blur-sm bg-background/50 transition-all duration-300 hover:shadow-primary/20">
          <div className="overflow-x-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/5">
                  <th className="h-16 px-8 text-left align-middle font-bold text-primary/80 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">Token ID</th>
                  <th className="h-16 px-8 text-left align-middle font-bold text-primary/80 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">Owner</th>
                  <th className="h-16 px-8 text-left align-middle font-bold text-primary/80 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">Mint Time</th>
                </tr>
              </thead>
              <tbody>
                {currentBadges.map((badge) => (
                  <tr
                    key={badge.tokenId}
                    className="border-b border-primary/10 transition-colors hover:bg-primary/5 data-[state=selected]:bg-primary/10"
                  >
                    <td className="p-8 align-middle font-semibold text-foreground/90">{badge.tokenId}</td>
                    <td className="p-8 align-middle truncate max-w-md font-mono text-sm text-foreground/80 hover:text-primary transition-colors">{badge.owner}</td>
                    <td className="p-8 align-middle text-foreground/70">
                      {new Date(Number(badge.mintTime) * 1000).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 px-4">
          <Button
            size="lg"
            onClick={() => setSearchParams({ page: (currentPage - 1).toString() })}
            disabled={currentPage <= 1}
            className="bg-primary/10 hover:bg-primary/20 disabled:opacity-50 text-primary font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            ← Previous
          </Button>
          <span className="text-lg font-medium text-foreground/70 bg-primary/5 px-6 py-2 rounded-full">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="lg"
            onClick={() => setSearchParams({ page: (currentPage + 1).toString() })}
            disabled={currentPage >= totalPages}
            className="bg-primary/10 hover:bg-primary/20 disabled:opacity-50 text-primary font-semibold px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  )
}