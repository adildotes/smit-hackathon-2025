import LoanRequestModal from "@/components/LoanRequestModel";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminDashboard({
  loanRequests,
  setModalData,
  modalData,
}) {
  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-8">
        Admin Dashboard
      </h1>
      
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              <TableHead>CNIC</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subcategory</TableHead>
              <TableHead>Loan Amount</TableHead>
              <TableHead>Installment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loanRequests.length > 0 ? (
              loanRequests.map((request) => (
                <TableRow key={request._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <TableCell>{request?.userId?.cnic}</TableCell>
                  <TableCell>{request?.userId?.name}</TableCell>
                  <TableCell>{request?.selectedLoan?.category}</TableCell>
                  <TableCell>{request?.selectedLoan?.subcategory}</TableCell>
                  <TableCell>Rs. {request?.selectedLoan?.estimatedLoan.loanAmount.toLocaleString()}</TableCell>
                  <TableCell>Rs. {request?.selectedLoan?.estimatedLoan.annualInstallment.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        request.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-green-500 text-white"
                      }
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => setModalData(request)}
                    >
                      More Info
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500 dark:text-gray-300">
                  No loan requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {modalData && (
        <LoanRequestModal modalData={modalData} setModalData={setModalData} />
      )}
    </div>
  );
}
 