"use client"

import { useTranslation } from "react-i18next"
import { memo } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/context/language-provider"
import { cn } from "@/toolbar/utils"
import { Globe } from "lucide-react"

interface LanguageSelectorProps {
  variant?: "icon" | "minimal" | "full"
  className?: string
}

// Use memo to prevent unnecessary re-renders
export const LanguageSelector = memo(function LanguageSelector({ variant = "full", className }: LanguageSelectorProps) {
  const { t } = useTranslation()
  const { language, changeLanguage, availableLanguages } = useLanguage()

  // Get the current language display
  const currentLanguage = availableLanguages.find((lang) => lang.code === language)
  const languageCode = currentLanguage?.code.substring(0, 2).toUpperCase() || "EN"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={variant === "icon" ? "icon" : "sm"}
          className={cn(
            "h-8",
            variant === "icon" && "w-8 rounded-full",
            variant === "minimal" && "px-2 w-auto",
            variant === "full" && "px-3 w-auto gap-2",
            className,
          )}
          aria-label={t("language.changeLanguage")}
        >
          {variant === "icon" ? (
            <Globe className="h-4 w-4" />
          ) : variant === "minimal" ? (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{languageCode}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{currentLanguage?.name || "English"}</span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={cn("cursor-pointer", language === lang.code && "bg-primary/10 font-medium")}
          >
            <span className="mr-2">{lang.nativeName}</span>
            <span className="text-muted-foreground">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
