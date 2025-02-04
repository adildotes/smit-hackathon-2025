"use client"
import { useAuth } from "@/context/auth-context"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { type FormEvent, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

export default function Auth() {
  const [loading, setLoading] = useState(true)
  const { auth, user, adminAuth, admin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (user && admin) {
      router.push("/admin")
    } else if (user) {
      router.push("/loanuser")
    } else {
      setLoading(false)
    }
  }, [user, admin])

  async function handleAuth(e: FormEvent) {
    e.preventDefault()
    if (isLogin) {
      auth("/auth/loginloan", { email, password })
    } else {
      await adminAuth("/auth/login", { email, password })
    }
  }

  if (loading) return <span className="loading loading-ring loading-xs"></span>

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center min-h-screen p-4">
      <motion.div
        key={isLogin ? "loginForm" : "adminForm"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-[350px] shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="user" onClick={() => setIsLogin(true)}>
                  User
                </TabsTrigger>
                <TabsTrigger value="admin" onClick={() => setIsLogin(false)}>
                  Admin
                </TabsTrigger>
              </TabsList>
              <TabsContent value="user">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="password"
                        type={isOpen ? "text" : "password"}
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {isOpen ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="admin">
                <form onSubmit={handleAuth} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="adminEmail" className="text-sm font-medium">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="adminEmail"
                        type="email"
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="adminPassword" className="text-sm font-medium">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="adminPassword"
                        type={isOpen ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {isOpen ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Login as Admin
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

