"use client"
import { ChangeEvent, useState } from "react"
import { z, ZodFormattedError } from "zod"
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { XIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"

const pollSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters long"),
  options: z
    .array(z.string().min(1, "Option cannot be empty"))
    .min(2, "At least two options are required"),
})

const Header = () => {
  const [formData, setFormData] = useState({
    question: "",
    options: ["", ""],
  })
  const [errors, setErrors] =
    useState<
      ZodFormattedError<{ question: string; options: string[] }, string>
    >()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    idx: null | number = null
  ) => {
    if (idx !== null) {
      const newOptions = [...formData.options]
      newOptions[idx] = e.target.value
      setFormData({ ...formData, options: newOptions })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const removeOption = (value: string) => {
    if (formData.options.length <= 2) {
      return
    }
    const newOptions = formData.options.filter((opt) => opt != value)
    setFormData({ ...formData, options: newOptions })
  }

  const createPoll = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const validation = pollSchema.safeParse(formData)
    if (!validation.success) {
      setErrors(validation.error.format())
      return
    }

    await fetch("/api/polls", {
      method: "POST",
      body: JSON.stringify(formData),
    })
    setFormData({ question: "", options: ["", ""] })
    window.location.reload()
  }

  console.log(errors)

  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-semibold">Simple Polling System</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Poll</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Create Poll</DialogTitle>
            <DialogDescription className="py-4">
              <form onSubmit={createPoll} className="flex flex-col gap-4">
                <div>
                  <Label className="font-semibold mb-2">Poll Question</Label>
                  <Input
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    placeholder="Poll Question"
                  />
                  {errors?.question && (
                    <p className="text-red-600">
                      {errors?.question._errors[0]}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="font-semibold mb-2">Options</Label>
                  <div className="flex flex-col gap-2">
                    {formData.options.map((option, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center">
                          <Input
                            value={option}
                            onChange={(e) => handleChange(e, idx)}
                            placeholder={`Option ${idx + 1}`}
                          />
                          <Button
                            variant={"ghost"}
                            type="button"
                            onClick={() => removeOption(option)}
                          >
                            <XIcon className="text-red-700" />
                          </Button>
                        </div>
                        {errors?.options?.[idx] && (
                          <p className="text-red-600">
                            {errors?.options[idx]._errors[0]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      options: [...formData.options, ""],
                    })
                  }
                >
                  Add Option
                </Button>
                <Button type="submit">Create Poll</Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Header
