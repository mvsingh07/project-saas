"use client"

import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import { ProfilePopup } from "@/components/profile-popup"
import {
  User,
  Settings,
  Shield,
  Keyboard,
  Users,
  UserPlus,
  PlusCircle,
  PuzzleIcon as PuzzlePiece,
  LifeBuoy,
  Lock,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import { LogoutButton } from "./logout-button"

export function ProfileDropdown() {
  const { t } = useTranslation()
  const { userData, signOut } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [profileOpen, setProfileOpen] = useState(false)

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (userData?.full_name) {
      return userData.full_name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    }
    return "MS"
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: t("header.loggingOut", "Logging out"),
        description: t(
          "header.logoutSuccess",
          "You have been successfully logged out"
        ),
      })
      router.push("/login")
    } catch (error) {
      toast({
        title: t("ui.error", "Error"),
        description: t(
          "header.logoutError",
          "Failed to log out. Please try again."
        ),
        variant: "destructive",
      })
    }
  }

  const handleLock = () => {
    toast({
      title: t("header.accountLocked", "Account Locked"),
      description: t(
        "header.accountLockedDesc",
        "Your account has been locked"
      ),
    })
    // Add actual lock logic here
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          aria-label={t("header.profile", "Profile")}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/professional-man-avatar.png"
              alt={t("header.profile", "Profile")}
            />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {t("header.myAccount", "My Account")}
          {userData?.email && (
            <p className="text-xs font-normal text-muted-foreground mt-1">
              {userData.email || ""}
            </p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            setProfileOpen(true)
          }}
        >
          <User className="mr-2 h-4 w-4" />
          <span>{t("header.profile", "Profile")}</span>
          <span className="ml-auto text-xs text-muted-foreground">P</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>{t("header.preferences", "Preferences")}</span>
          <span className="ml-auto text-xs text-muted-foreground">⌘S</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Shield className="mr-2 h-4 w-4" />
          <span>{t("header.security", "Security")}</span>
          <span className="ml-auto text-xs text-muted-foreground">⌘K</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Keyboard className="mr-2 h-4 w-4" />
          <span>{t("header.keyboardShortcuts", "Keyboard shortcuts")}</span>
          <span className="ml-auto text-xs text-muted-foreground">⌘/</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <span>{t("header.team", "Team")}</span>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>{t("header.inviteUsers", "Invite Users")}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <span>{t("header.inviteByEmail", "Invite by Email")}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>{t("header.inviteByLink", "Invite by Link")}</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem>
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>{t("header.newTeam", "New Team")}</span>
          <span className="ml-auto text-xs text-muted-foreground">⌘T</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <PuzzlePiece className="mr-2 h-4 w-4" />
          <span>{t("header.integrations", "Integrations")}</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>{t("header.support", "Support")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLock}>
          <Lock className="mr-2 h-4 w-4" />
          <span>{t("header.lock", "Lock")}</span>
          <span className="ml-auto text-xs text-muted-foreground">⌘L</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout}>
          {/* <LogOut className="mr-2 h-4 w-4" />
           */}
          <LogoutButton />
          {/* <span>{t("profileDialog.logOut", "Log Out")}</span> */}
          <span className="ml-auto text-xs text-muted-foreground">⌘Q</span>
        </DropdownMenuItem>
        <ProfilePopup open={profileOpen} onOpenChange={setProfileOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
