"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "@/hooks/use-auth"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/toolbar/utils"
import { useTranslation } from "react-i18next"
import profileFormSchema from "@/hooks/schema"
import { createClient } from "@/lib/client"

// Define the schema for the form

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfilePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfilePopup({ open, onOpenChange }: ProfilePopupProps) {
  const { t } = useTranslation()
  const { userData, updateUserData, signOut } = useAuth()
  const supabase = createClient()

  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal-info")
  const [userId, setUserId] = useState<string>(
    t("profileDialog.userIdPrefix", "User ID:") + " -"
  )

  // Initialize form with user data
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      display_name: "",
      email: "",
      phone: "",
      department: "",
      employee_id: "",
      role: "",
      added_by: "",
    },
  })

  // Update form values when userData changes
  useEffect(() => {
    if (userData) {
      setUserId(
        `${t("profileDialog.userIdPrefix", "User ID:")} ${
          userData.id?.substring(0, 8) || "01-8948697"
        }`
      )
    } else {
      setUserId(`${t("profileDialog.userIdPrefix", "User ID:")} 01-8948697`)
    }
  }, [userData, t])

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error) {
        console.error("Error fetching user:", error.message)
        return
      }

      if (user) {
        const fullName = user.user_metadata?.full_name ?? ""
        const email = user.email ?? ""

        form.setValue("name", fullName)
        form.setValue("display_name", fullName)
        form.setValue("email", email)
      }
    }

    fetchUser()
  }, [form])

  // useEffect(() => {
  //   if (userData) {
  //     form.reset({
  //       name: userData.full_name ?? "",
  //       display_name: userData.full_name ?? "",
  //       // email: userData.email ?? "",
  //       // phone: userData.phone ?? "",
  //       // department: userData.department ?? "",
  //       // employee_id: userData.employee_id ?? "",
  //       // role: userData.role ?? "",
  //       // added_by: userData.added_by ?? "",
  //     })
  //   }
  // }, [userData, form])

  // Handle form submission
  const onSubmit = async (values: ProfileFormValues) => {
    try {
      // Update user data
      if (userData) {
        await updateUserData({
          full_name: values.name,
          // Other fields that can be updated
        })
      }

      toast({
        title: t("profileDialog.profileUpdated", "Profile updated"),
        description: t(
          "profileDialog.profileUpdateSuccess",
          "Your profile information has been updated successfully."
        ),
      })
    } catch (error) {
      toast({
        title: t("ui.error", "Error"),
        description: t(
          "profileDialog.updateError",
          "Failed to update profile. Please try again."
        ),
        variant: "destructive",
      })
    }
  }

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut()
      onOpenChange(false)
    } catch (error) {
      toast({
        title: t("ui.error", "Error"),
        description: t(
          "profileDialog.logoutError",
          "Failed to log out. Please try again."
        ),
        variant: "destructive",
      })
    }
  }

  const menuItems = [
    {
      id: "personal-info",
      label: t("profileDialog.personalInfo", "Personal Info"),
      icon: "user",
    },
    {
      id: "preferences",
      label: t("profileDialog.preferences", "Preferences"),
      icon: "settings",
    },
    {
      id: "security",
      label: t("profileDialog.security", "Security"),
      icon: "shield",
    },
    {
      id: "sessions",
      label: t("profileDialog.sessions", "Sessions"),
      icon: "monitor",
    },
    {
      id: "keyboard-shortcuts",
      label: t("profileDialog.keyboardShortcuts", "Keyboard shortcuts"),
      icon: "keyboard",
    },
    {
      id: "support",
      label: t("profileDialog.support", "Support"),
      icon: "life-buoy",
    },
    {
      id: "log-out",
      label: t("profileDialog.logOut", "Log out"),
      icon: "log-out",
      danger: true,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-[800px] overflow-hidden">
        <div className="flex h-[500px]">
          {/* Left sidebar */}
          <div className="w-[148px] border-r">
            <div className="p-4 border-b">
              <h2 className="text-base font-medium">
                {t("profileDialog.yourAccount", "Your Account")}
              </h2>
            </div>
            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    "w-full text-left px-4 py-2 flex items-center gap-2 text-sm",
                    activeTab === item.id ? "bg-gray-100" : "hover:bg-gray-50",
                    item.danger ? "text-red-500" : "text-gray-700"
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span
                    className={`w-5 h-5 ${
                      item.icon === "user" ? "text-gray-500" : ""
                    }`}
                  >
                    {item.icon === "user" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                    {item.icon === "settings" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                    {item.icon === "shield" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                    {item.icon === "monitor" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <line x1="8" x2="16" y1="21" y2="21" />
                        <line x1="12" x2="12" y1="17" y2="21" />
                      </svg>
                    )}
                    {item.icon === "keyboard" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <rect
                          width="20"
                          height="16"
                          x="2"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <path d="M6 8h.001" />
                        <path d="M10 8h.001" />
                        <path d="M14 8h.001" />
                        <path d="M18 8h.001" />
                        <path d="M8 12h.001" />
                        <path d="M12 12h.001" />
                        <path d="M16 12h.001" />
                        <path d="M7 16h10" />
                      </svg>
                    )}
                    {item.icon === "life-buoy" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="4" />
                        <line x1="4.93" x2="9.17" y1="4.93" y2="9.17" />
                        <line x1="14.83" x2="19.07" y1="14.83" y2="19.07" />
                        <line x1="14.83" x2="19.07" y1="9.17" y2="4.93" />
                        <line x1="14.83" x2="18.36" y1="9.17" y2="5.64" />
                        <line x1="4.93" x2="9.17" y1="19.07" y2="14.83" />
                      </svg>
                    )}
                    {item.icon === "log-out" && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                      </svg>
                    )}
                  </span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 relative">
            <DialogClose className="absolute right-4 top-4 h-6 w-6 rounded-md hover:bg-gray-100">
              <X className="h-4 w-4" />
              <span className="sr-only">{t("ui.close", "Close")}</span>
            </DialogClose>

            {activeTab === "personal-info" && (
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src="/professional-man-avatar.png"
                      alt={t("profileDialog.profilePicture", "Profile")}
                    />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-medium">
                      {t("profileDialog.personalInfo", "Personal Info")}
                    </h2>
                    <p className="text-sm text-gray-500">{userId}</p>
                  </div>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[120px_1fr_24px] items-center">
                          <div className="text-sm font-medium">
                            {t("profileDialog.name", "Name")}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 shadow-none focus-visible:ring-0 px-0"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="display_name"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[120px_1fr_24px] items-center">
                          <div className="text-sm font-medium">
                            {t("profileDialog.displayName", "Display Name")}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 shadow-none focus-visible:ring-0 px-0"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[120px_1fr_24px] items-center">
                          <div className="text-sm font-medium">
                            {t("profileDialog.email", "Email")}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 shadow-none focus-visible:ring-0 px-0"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[120px_1fr_24px] items-center">
                          <div className="text-sm font-medium">
                            {t("profileDialog.phoneNumber", "Phone Number")}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 shadow-none focus-visible:ring-0 px-0"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray-400"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[120px_1fr_24px] items-center">
                          <div className="text-sm font-medium">
                            {t("profileDialog.department", "Department")}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 shadow-none focus-visible:ring-0 px-0"
                              readOnly
                            />
                          </FormControl>
                          <div className="w-6"></div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employee_id"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[120px_1fr_24px] items-center">
                          <div className="text-sm font-medium">
                            {t("profileDialog.employeeId", "Employee ID")}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 shadow-none focus-visible:ring-0 px-0"
                              readOnly
                            />
                          </FormControl>
                          <div className="w-6"></div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[120px_1fr_24px] items-center">
                          <div className="text-sm font-medium">
                            {t("profileDialog.role", "Role")}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 shadow-none focus-visible:ring-0 px-0"
                              readOnly
                            />
                          </FormControl>
                          <div className="w-6"></div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="added_by"
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-[120px_1fr_24px] items-center">
                          <div className="text-sm font-medium">
                            {t("profileDialog.addedBy", "Added by")}
                          </div>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-0 shadow-none focus-visible:ring-0 px-0"
                              readOnly
                            />
                          </FormControl>
                          <div className="w-6"></div>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">
                  {t("profileDialog.preferences", "Preferences")}
                </h2>
                <p className="text-sm text-gray-500">
                  {t(
                    "profileDialog.customizeExperience",
                    "Customize your experience with AuctionSphere."
                  )}
                </p>
              </div>
            )}

            {activeTab === "security" && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">
                  {t("profileDialog.security", "Security")}
                </h2>
                <p className="text-sm text-gray-500">
                  {t(
                    "profileDialog.manageAccountSecurity",
                    "Manage your account security settings."
                  )}
                </p>
              </div>
            )}

            {activeTab === "sessions" && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">
                  {t("profileDialog.sessions", "Sessions")}
                </h2>
                <p className="text-sm text-gray-500">
                  {t(
                    "profileDialog.viewManageSessions",
                    "View and manage your active sessions."
                  )}
                </p>
              </div>
            )}

            {activeTab === "keyboard-shortcuts" && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">
                  {t("profileDialog.keyboardShortcuts", "Keyboard Shortcuts")}
                </h2>
                <p className="text-sm text-gray-500">
                  {t(
                    "profileDialog.viewCustomizeShortcuts",
                    "View and customize keyboard shortcuts."
                  )}
                </p>
              </div>
            )}

            {activeTab === "support" && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">
                  {t("profileDialog.support", "Support")}
                </h2>
                <p className="text-sm text-gray-500">
                  {t("profileDialog.getHelp", "Get help with AuctionSphere.")}
                </p>
              </div>
            )}

            {activeTab === "log-out" && (
              <div className="p-6">
                <h2 className="text-lg font-medium mb-4">
                  {t("profileDialog.logOut", "Log Out")}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {t(
                    "profileDialog.logoutConfirm",
                    "Are you sure you want to log out?"
                  )}
                </p>
                <Button variant="destructive" onClick={handleLogout}>
                  {t("profileDialog.logOut", "Log Out")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
