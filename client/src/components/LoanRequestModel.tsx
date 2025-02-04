"use client"

import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const scheduleSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  officeLocation: z.string().min(1, "Office location is required"),
})

export default function LoanRequestModal({
  modalData,
  setModalData,
}: {
  modalData: any | null
  setModalData: React.Dispatch<React.SetStateAction<any>>
}) {
  const [loading, setLoading] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      date: "",
      time: "",
      officeLocation: "",
    },
  })

  const handleApproveLoan = async (values: z.infer<typeof scheduleSchema>) => {
    setLoading(true)

    try {
      const data = {
        loanId: modalData._id,
        scheduleDetails: values,
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/approveloan`, data)

      if (response.data.success) {
        setModalData(null)
        toast.success("Loan approved successfully")
      } else {
        toast.error(response.data.message || "Failed to approve the loan.")
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!modalData) return null

  return (
    <Dialog open={!!modalData} onOpenChange={() => setModalData(null)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Loan Request Details</DialogTitle>
          <DialogDescription>Review the loan request details and take action.</DialogDescription>
        </DialogHeader>
        {!isScheduling ? (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Badge variant="outline">User</Badge>
              <span className="col-span-3">{modalData?.userId?.cnic}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Badge variant="outline">Status</Badge>
              <span className="col-span-3">{modalData?.status}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Badge variant="outline">Guarantors</Badge>
              <div className="col-span-3 flex flex-wrap gap-2">
                {modalData.guarantors.map((guarantor: { name: string }, index: number) => (
                  <Badge key={index} variant="secondary">
                    {guarantor?.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Badge variant="outline">Amount</Badge>
              <span className="col-span-3">{modalData?.selectedLoan?.estimatedLoan.loanAmount}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Badge variant="outline">Period</Badge>
              <span className="col-span-3">{modalData?.selectedLoan?.loanPeriod}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Badge variant="outline">Installment</Badge>
              <span className="col-span-3">{modalData?.selectedLoan?.estimatedLoan?.annualInstallment}</span>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleApproveLoan)} className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input type="date" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input type="time" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="officeLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
        <DialogFooter>
          {!isScheduling ? (
            <Button
              onClick={() => {
                if (modalData?.status === "pending") {
                  setIsScheduling(true)
                } else {
                  setModalData(null)
                }
              }}
            >
              {modalData.status === "pending" ? "Proceed Further" : "Close"}
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setModalData(null)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} onClick={form.handleSubmit(handleApproveLoan)}>
                {loading ? "Approving..." : "Approve Loan"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

