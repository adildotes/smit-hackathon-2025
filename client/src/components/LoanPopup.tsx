import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function LoanPopup({ category, onClose }: any) {
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(0);
  const [loanPeriod, setLoanPeriod] = useState(category.loanPeriod);
  const [estimatedLoan, setEstimatedLoan] = useState<any>(null);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const calculateLoan = () => {
    const maxLoanAmount =
      typeof category.maxLoan === "number" ? category.maxLoan : 0;
    const loanAmount = maxLoanAmount - initialDeposit;
    const annualInstallment = loanAmount / loanPeriod;
    setEstimatedLoan({
      loanAmount,
      annualInstallment,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const password = Math.random().toString(36).slice(-8);
    try {
      const selectedLoan = {
        category: category.name,
        subcategory: selectedSubcategory,
        initialDeposit,
        loanPeriod,
        estimatedLoan,
      };

      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/register",
        {
          name,
          cnic,
          email,
          password,
          selectedLoan,
        }
      );

      if (response.status === 200) {
        toast.success("Registration successful, check your email!");
        setLoading(false);
        onClose();
        router.push("/auth");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg space-y-6 p-6">
        <DialogHeader>
          <DialogTitle>{category.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!showDetailsForm && (
            <>
              <div>
                <Label htmlFor="subcategory" className="block mb-2 font-medium">
                  Select Subcategory
                </Label>
                <Select
                  value={selectedSubcategory}
                  onValueChange={setSelectedSubcategory}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {category.subcategories.map((subcategory, index) => (
                      <SelectItem key={index} value={subcategory}>
                        {subcategory}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="deposit" className="block mb-2 font-medium">
                  Initial Deposit
                </Label>
                <Input
                  id="deposit"
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="loan-period" className="block mb-2 font-medium">
                  Loan Period (Years)
                </Label>
                <Input
                  id="loan-period"
                  type="number"
                  value={loanPeriod}
                  onChange={(e) => setLoanPeriod(Number(e.target.value))}
                />
              </div>

              <Button
                className="w-full bg-blue-500 text-white mt-4"
                onClick={calculateLoan}
                disabled={selectedSubcategory === "" || initialDeposit === 0 || loanPeriod === 0}
              >
                Calculate Loan
              </Button>
            </>
          )}

          {estimatedLoan && !showDetailsForm && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-bold">Estimated Loan Breakdown</h3>
              <p>Loan Amount: Rs. {estimatedLoan.loanAmount.toLocaleString()}</p>
              <p>Annual Installment: Rs. {estimatedLoan.annualInstallment.toLocaleString()}</p>
              <Button
                className="bg-green-500 text-white mt-4"
                onClick={() => setShowDetailsForm(true)}
              >
                Proceed Further
              </Button>
            </div>
          )}

          {showDetailsForm && (
            <>
              <div>
                <Label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="saad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="cnic" className="block mb-2 font-medium">
                  CNIC
                </Label>
                <Input
                  id="cnic"
                  placeholder="412051234567"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email" className="block mb-2 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="saaddotes@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Button
                className={`w-full bg-blue-500 text-white mt-4 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Register and Send Email"}
              </Button>
            </>
          )}

          <Button
            variant="destructive"
            className="w-full mt-4"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
