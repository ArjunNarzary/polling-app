"use client"
import Header from "@/components/Header"
import PollCard, { IPollRes } from "@/components/PollCard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"

export default function Home() {
  const [polls, setPolls] = useState<IPollRes[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/polls")
      .then((res) => res.json())
      .then((data) => setPolls(data))
      .finally(() => setLoading(false))
  }, [])

  const handleVote = async (id: string, pollId: string) => {
    if (id) {
      setPolls((prev) =>
        prev.map((poll) => {
          if (poll.id.toString() === pollId) {
            return {
              ...poll,
              options: poll.options.map((opt) => {
                if (opt.id.toString() === id) {
                  return { ...opt, votes: opt.votes + 1 }
                }
                return opt
              }),
            }
          }
          return poll
        })
      )

      await fetch("/api/polls/vote", {
        method: "POST",
        body: JSON.stringify({
          optionId: id,
        }),
      })
    }
  }
  return (
    <main className="w-full px-2 md:w-[60vw] lg:[50vw] mx-auto">
      <Header />

      <div className="flex flex-col gap-3">
        {loading ? (
          <>
            <RenderLoader />
            <RenderLoader />
            <RenderLoader />
            <RenderLoader />
          </>
        ) : (
          <>
            {polls.map((poll) => (
              <div key={poll.id}>
                <PollCard {...poll} handleVote={handleVote} />
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  )
}

const RenderLoader = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </CardContent>
    </Card>
  )
}
