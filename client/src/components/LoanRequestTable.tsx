"use client"

import type React from "react"
import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface LoanRequest {
  _id: string
  schedule: { date: string; time: string; officeLocation: string }
  guarantors: { name: string; email: string; cnic: string }[]
  status: string
  selectedLoan: any
}

interface LoanRequestTableProps {
  loanRequests: LoanRequest[]
  onAddDetails: (requestId: string) => void
}

const LoanRequestTable: React.FC<LoanRequestTableProps> = ({ loanRequests, onAddDetails }) => {
  const [tokens, setTokens] = useState<{ [key: string]: string }>({})

  const generateToken = (requestId: string) => {
    const newToken = `Token-${requestId}`
    setTokens((prevTokens) => ({ ...prevTokens, [requestId]: newToken }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "incomplete":
        return <Badge variant="secondary">{status}</Badge>
      case "pending":
        return <Badge variant="default">{status}</Badge>
      case "approved":
        return <Badge variant="default">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loan Request</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>Loan Amount</TableHead>
            <TableHead>Installment</TableHead>
            <TableHead>Loan Period</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loanRequests.length > 0 ? (
            loanRequests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request._id}</TableCell>
                <TableCell>{request?.selectedLoan?.category}</TableCell>
                <TableCell>{request?.selectedLoan?.subcategory}</TableCell>
                <TableCell>{request?.selectedLoan?.estimatedLoan.loanAmount}</TableCell>
                <TableCell>{request?.selectedLoan?.estimatedLoan.annualInstallment}</TableCell>
                <TableCell>{request?.selectedLoan?.loanPeriod}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>
                  {request.status === "incomplete" && (
                    <Button variant="outline" size="sm" onClick={() => onAddDetails(request._id)}>
                      Add More Details
                    </Button>
                  )}

                  {request.status === "approved" && !tokens[request._id] && (
                    <Button variant="secondary" size="sm" onClick={() => generateToken(request._id)}>
                      Generate Token & QR Code
                    </Button>
                  )}

                  {tokens[request._id] && (
                    <div className="mt-2 space-y-2">
                      <p className="text-sm font-medium">Generated Token:</p>
                      <p className="text-lg font-semibold text-green-600">{tokens[request._id]}</p>

                      <div>
                        <p className="text-sm font-medium">QR Code:</p>
                        <QRCodeSVG
                          value={JSON.stringify({
                            token: tokens[request._id],
                            requestId: request._id,
                            scheduleDate: request.schedule.date,
                            scheduleTime: request.schedule.time,
                            officeLocation: request.schedule.officeLocation,
                          })}
                          size={128}
                        />
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No loan requests found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default LoanRequestTable

