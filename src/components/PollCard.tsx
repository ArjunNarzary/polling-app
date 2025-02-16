import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
export interface IPollRes {
  id: string
  question: string
  options: {
    id: string
    text: string
    votes: number
  }[]
  handleVote: (id: string, pollId: string) => void
}
const PollCard = ({ id, question, options, handleVote }: IPollRes) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{question}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {options.map((option, idx) => (
          <div
            key={option.id}
            className="text-left cursor-pointer flex justify-between items-center bg-gray-300 hover:bg-gray-400  p-2 rounded-sm"
            onClick={() => handleVote(option.id, id)}
          >
            <p className="">
              {idx + 1}. {option.text}
            </p>
            <p>{option.votes}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default PollCard
