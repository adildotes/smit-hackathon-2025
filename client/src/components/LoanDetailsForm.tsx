"use client"

import React, { useState } from "react"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Guarantor {
  name: string
  email: string
  location: string
  cnic: string
}

interface PersonalInfo {
  address: string
  phone: string
}

interface LoanDetailsFormProps {
  isAddingDetails: boolean
  setIsAddingDetails: (isAdding: boolean) => void
  userId: string
}

export function LoanDetailsForm({ isAddingDetails, setIsAddingDetails, userId }: LoanDetailsFormProps) {
  const [guarantors, setGuarantors] = useState<Guarantor[]>([
    { name: "", email: "", location: "", cnic: "" },
    { name: "", email: "", location: "", cnic: "" },
  ])
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    address: "",
    phone: "",
  })

  const handleGuarantorChange = (index: number, field: keyof Guarantor, value: string) => {
    const updatedGuarantors = [...guarantors]
    updatedGuarantors[index][field] = value
    setGuarantors(updatedGuarantors)
  }

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }

  const submitData = async () => {
    const formData = {
      userId,
      guarantors,
      personalInfo,
      status: "pending",
    }

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user-loan`, formData)

      const data = response.data

      if (!data.success) {
        console.error(data.message)
      } else {
        console.log("Loan request submitted:", data)
        setIsAddingDetails(false)
      }
    } catch (error) {
      console.error("An error occurred. Please try again.")
      console.error(error)
    }
  }

  return (
    <Dialog open={isAddingDetails} onOpenChange={setIsAddingDetails}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Add More Details</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guarantors Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {guarantors.map((guarantor, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="font-semibold text-sm">Guarantor {index + 1}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${index}`}>Name</Label>
                      <Input
                        id={`name-${index}`}
                        placeholder="Name"
                        value={guarantor.name}
                        onChange={(e) => handleGuarantorChange(index, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`email-${index}`}>Email</Label>
                      <Input
                        id={`email-${index}`}
                        type="email"
                        placeholder="Email"
                        value={guarantor.email}
                        onChange={(e) => handleGuarantorChange(index, "email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`location-${index}`}>Location</Label>
                      <Input
                        id={`location-${index}`}
                        placeholder="Location"
                        value={guarantor.location}
                        onChange={(e) => handleGuarantorChange(index, "location", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`cnic-${index}`}>CNIC</Label>
                      <Input
                        id={`cnic-${index}`}
                        placeholder="CNIC"
                        value={guarantor.cnic}
                        onChange={(e) => handleGuarantorChange(index, "cnic", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Address"
                  value={personalInfo.address}
                  onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Phone Number"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setIsAddingDetails(false)}>
              Cancel
            </Button>
            <Button onClick={submitData}>Submit Loan Request</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default LoanDetailsForm

