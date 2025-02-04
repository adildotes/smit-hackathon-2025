"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LoanPopup from "@/components/LoanPopup";

type LoanCategory = {
  name: string;
  subcategories: string[];
  maxLoan: number | string;
  loanPeriod: number;
  badge?: string; 
};

export default function MainCategories() {
  const [activeCategory, setActiveCategory] = useState<LoanCategory | null>(null);

  const loanCategories: LoanCategory[] = [
    {
      name: "Wedding Loans",
      subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxLoan: 500000,
      loanPeriod: 3,
      badge: "New",
    },
    {
      name: "Home Construction Loans",
      subcategories: ["Structure", "Finishing", "Loan"],
      maxLoan: 1000000,
      loanPeriod: 5,
      badge: "Special Offer",
    },
    {
      name: "Business Startup Loans",
      subcategories: [
        "Buy Stall",
        "Advance Rent for Shop",
        "Shop Assets",
        "Shop Machinery",
      ],
      maxLoan: 1000000,
      loanPeriod: 5,
    },
    {
      name: "Education Loans",
      subcategories: ["University Fees", "Child Fees Loan"],
      maxLoan: "Based on requirement",
      loanPeriod: 4,
    },
  ];
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loanCategories.map((category, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-semibold">{category.name}</CardTitle>
                {category.badge && (
                  <Badge className="bg-blue-500 text-white">{category.badge}</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                Maximum Loan:{" "}
                {typeof category.maxLoan === "number"
                  ? `Rs. ${category.maxLoan.toLocaleString()}`
                  : category.maxLoan}
              </p>
              <p className="text-sm text-gray-600 mb-2">Loan Period: {category.loanPeriod} years</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex}>{subcategory}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-green-600 text-white hover:bg-green-700"
                onClick={() => setActiveCategory(category)}
              >
                Proceed
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {activeCategory && (
        <LoanPopup
          category={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </div>
  );
}