"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { LogOut, Home } from "lucide-react"

export default function Header() {
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-semibold text-primary">Saylani Microfinance</h1>
          <nav>
            {user ? (
              <Button variant="destructive" onClick={() => setIsAlertVisible(true)}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href={pathname === "/" && !user ? "/auth" : "/"}>
                  {pathname === "/" && !user ? (
                    "Login"
                  ) : (
                    <>
                      <Home className="mr-2 h-4 w-4" /> Dashboard
                    </>
                  )}
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>

      <AlertDialog open={isAlertVisible} onOpenChange={setIsAlertVisible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>This action will end your current session.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                logout()
                setIsAlertVisible(false)
              }}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  )
}

