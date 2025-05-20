"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { User, Settings, Shield, Clock, Keyboard, HelpCircle, LogOut } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [profileImage, setProfileImage] = useState("/professional-man-avatar.png")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleSaveChanges = () => {
    toast({
      title: t("profileDialog.profileUpdated"),
      description: t("profileDialog.profileUpdateSuccess"),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("profileDialog.yourAccount")}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="personal-info" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="personal-info" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline-block">{t("profileDialog.personalInfo")}</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline-block">{t("profileDialog.preferences")}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline-block">{t("profileDialog.security")}</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline-block">{t("profileDialog.sessions")}</span>
            </TabsTrigger>
            <TabsTrigger value="shortcuts" className="flex items-center gap-2">
              <Keyboard className="h-4 w-4" />
              <span className="hidden sm:inline-block">{t("profileDialog.keyboardShortcuts")}</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline-block">{t("profileDialog.getHelp")}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal-info" className="mt-6">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="w-40">
                    {t("ui.edit")}
                  </Button>
                  <Button variant="ghost" size="sm" className="w-40">
                    {t("ui.remove")}
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="user-id">{t("profileDialog.userId")}</Label>
                  <Input id="user-id" value="MS12345" readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display-name">{t("profileDialog.displayName")}</Label>
                  <Input id="display-name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("profileDialog.email")}</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("profileDialog.phoneNumber")}</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">{t("profileDialog.department")}</Label>
                  <Input id="department" value="Sales" readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employee-id">{t("profileDialog.employeeId")}</Label>
                  <Input id="employee-id" value="EMP-2023-001" readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">{t("profileDialog.role")}</Label>
                  <Input id="role" value="Sales Manager" readOnly className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="added-by">{t("profileDialog.addedBy")}</Label>
                  <Input id="added-by" value="Admin" readOnly className="bg-muted" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>{t("profileDialog.saveChanges")}</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="preferences" className="mt-6">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">{t("profileDialog.customizeExperience")}</p>
              {/* Preferences content would go here */}
            </div>
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">{t("profileDialog.manageAccountSecurity")}</p>
              {/* Security content would go here */}
            </div>
          </TabsContent>
          <TabsContent value="sessions" className="mt-6">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">{t("profileDialog.viewManageSessions")}</p>
              {/* Sessions content would go here */}
            </div>
          </TabsContent>
          <TabsContent value="shortcuts" className="mt-6">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">{t("profileDialog.viewCustomizeShortcuts")}</p>
              {/* Shortcuts content would go here */}
            </div>
          </TabsContent>
          <TabsContent value="help" className="mt-6">
            <div className="flex flex-col space-y-4">
              <p className="text-sm text-muted-foreground">{t("profileDialog.getHelp")}</p>
              {/* Help content would go here */}
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-6 flex justify-between">
          <Button variant="destructive" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            {t("profileDialog.logOut")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
