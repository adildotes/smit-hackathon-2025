"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/auth-context";
import LoanRequestTable from "@/components/LoanRequestTable";
import LoanDetailsForm from "@/components/LoanDetailsForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoanUser() {
  const { user, setUser, admin } = useAuth();
  const [loanRequests, setLoanRequests] = useState<any[]>([]);
  const [isAddingDetails, setIsAddingDetails] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchLoanRequests = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/auth/user-loan-request" +
            "?userId=" +
            user?._id
        );
        const data = response.data;

        if (data.success) {
          setLoanRequests(data.data);
        } else {
          toast.error("Failed to fetch loan requests");
        }
      } catch (err) {
        toast.error("An error occurred while fetching loan requests");
        console.error(err);
      }
    };

    if (admin) {
      router.push("/auth");
    }

    if (!user) {
      router.push("/auth");
    }

    if (user?.isNew) {
      setIsPasswordModalOpen(true);
    }

    if (user?._id) {
      fetchLoanRequests();
    }
  }, [user, router]);

  const updatePassword = async () => {
    if (newPassword.trim().length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/update-password",
        {
          userId: user?._id,
          password: newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully. Please log in again.");
        sessionStorage.setItem("user", JSON.stringify(response?.data?.user));
        setUser(response?.data?.user);
        setIsPasswordModalOpen(false);
        router.push("/auth");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred while updating the password.");
      console.error(err);
    }
  };

  const handleAddDetailsClick = (requestId: string) => {
    setIsAddingDetails(true);
    console.log(requestId);
  };

  if (!user) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
      <LoanRequestTable
        loanRequests={loanRequests}
        onAddDetails={handleAddDetailsClick}
      />

      <LoanDetailsForm
        isAddingDetails={isAddingDetails}
        setIsAddingDetails={setIsAddingDetails}
        userId={user._id}
      />

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-sm w-full">
            <CardHeader>
              <CardTitle className="text-center text-lg">
                Update Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full"
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={updatePassword}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
