"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslation } from "react-i18next"
import { useTheme } from "next-themes"
import {
  Loader2,
  Save,
  ChevronRight,
  Home,
  Clock,
  Languages,
  CalendarDays,
  Briefcase,
  Receipt,
  Plus,
  Trash2,
  RotateCcw,
  Check,
  ChevronsUpDown,
  Info,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define the currency type
type Currency = {
  code: string
  name: string
  symbol: string
  decimalPlaces: number
  format: string
}

// Define the fiscal year type
type FiscalYearType = "standard" | "custom"

// Define the schema for the form
const formSchema = z.object({
  currency: z.object({
    code: z.string(),
    name: z.string(),
    symbol: z.string(),
    decimalPlaces: z.number(),
    format: z.string(),
  }),
  fiscalYearType: z.enum(["standard", "custom"]),
  fiscalYearStart: z
    .object({
      month: z.string().optional(),
      day: z.string().optional(),
    })
    .optional(),
  timezone: z.string({
    required_error: "Please select a timezone",
  }),
  language: z.string({
    required_error: "Please select a language",
  }),
  dateFormat: z.string({
    required_error: "Please select a date format",
  }),
  companyId: z.string().optional(),
  taxId: z.string().optional(),
  customFields: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string().min(1, "Value is required"),
    }),
  ),
})

type FormValues = z.infer<typeof formSchema>

// Sample data for currencies
const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", decimalPlaces: 2, format: "$1,234.56" },
  { code: "EUR", name: "Euro", symbol: "€", decimalPlaces: 2, format: "€1.234,56" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", decimalPlaces: 2, format: "₹1,234.56" },
  { code: "GBP", name: "British Pound", symbol: "£", decimalPlaces: 2, format: "£1,234.56" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", decimalPlaces: 0, format: "¥1,234" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$", decimalPlaces: 2, format: "CA$1,234.56" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", decimalPlaces: 2, format: "A$1,234.56" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", decimalPlaces: 2, format: "S$1,234.56" },
]

export default function OrganizationPersonalizationPage() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("regional")
  const [datePreview, setDatePreview] = useState("")
  const [daysInMonth, setDaysInMonth] = useState<number[]>([])

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: currencies[2], // INR
      fiscalYearType: "standard",
      fiscalYearStart: {
        month: "4", // April
        day: "1",
      },
      timezone: "Asia/Kolkata",
      language: "en",
      dateFormat: "DD/MM/YYYY",
      companyId: "ASPH-12345",
      taxId: "GSTIN-22AAAAA0000A1Z5",
      customFields: [
        { key: t("orgPersonalization.customFields.industry"), value: t("orgPersonalization.customFields.realEstate") },
        { key: t("orgPersonalization.customFields.registrationNumber"), value: "REG-987654321" },
      ],
    },
  })

  // Sample data for months
  const months = [
    { value: "1", label: t("orgPersonalization.months.january") },
    { value: "2", label: t("orgPersonalization.months.february") },
    { value: "3", label: t("orgPersonalization.months.march") },
    { value: "4", label: t("orgPersonalization.months.april") },
    { value: "5", label: t("orgPersonalization.months.may") },
    { value: "6", label: t("orgPersonalization.months.june") },
    { value: "7", label: t("orgPersonalization.months.july") },
    { value: "8", label: t("orgPersonalization.months.august") },
    { value: "9", label: t("orgPersonalization.months.september") },
    { value: "10", label: t("orgPersonalization.months.october") },
    { value: "11", label: t("orgPersonalization.months.november") },
    { value: "12", label: t("orgPersonalization.months.december") },
  ]

  // Sample data for timezones
  const timezones = [
    { value: "America/New_York", label: t("orgPersonalization.timezones.newYork") },
    { value: "America/Chicago", label: t("orgPersonalization.timezones.chicago") },
    { value: "America/Denver", label: t("orgPersonalization.timezones.denver") },
    { value: "America/Los_Angeles", label: t("orgPersonalization.timezones.losAngeles") },
    { value: "Asia/Kolkata", label: t("orgPersonalization.timezones.kolkata") },
    { value: "Europe/London", label: t("orgPersonalization.timezones.london") },
    { value: "Asia/Tokyo", label: t("orgPersonalization.timezones.tokyo") },
    { value: "Australia/Sydney", label: t("orgPersonalization.timezones.sydney") },
  ]

  // Sample data for languages
  const languages = [
    { value: "en", label: t("language.english") },
    { value: "hi", label: t("language.hindi") },
    { value: "es", label: t("orgPersonalization.languages.spanish") },
    { value: "fr", label: t("orgPersonalization.languages.french") },
    { value: "de", label: t("orgPersonalization.languages.german") },
    { value: "ja", label: t("orgPersonalization.languages.japanese") },
    { value: "zh", label: t("orgPersonalization.languages.chinese") },
    { value: "ar", label: t("orgPersonalization.languages.arabic") },
  ]

  // Sample data for date formats
  const dateFormats = [
    { value: "MM/DD/YYYY", label: t("orgPersonalization.dateFormats.us") },
    { value: "DD/MM/YYYY", label: t("orgPersonalization.dateFormats.ukEu") },
    { value: "YYYY-MM-DD", label: t("orgPersonalization.dateFormats.iso") },
    { value: "DD.MM.YYYY", label: t("orgPersonalization.dateFormats.german") },
    { value: "YYYY/MM/DD", label: t("orgPersonalization.dateFormats.japan") },
  ]

  // Update date preview when date format changes
  useEffect(() => {
    const currentFormat = form.watch("dateFormat")
    const today = new Date()

    // Simple formatter for demonstration purposes
    let formattedDate = ""
    switch (currentFormat) {
      case "MM/DD/YYYY":
        formattedDate = `${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}/${today.getFullYear()}`
        break
      case "DD/MM/YYYY":
        formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`
        break
      case "YYYY-MM-DD":
        formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`
        break
      case "DD.MM.YYYY":
        formattedDate = `${today.getDate().toString().padStart(2, "0")}.${(today.getMonth() + 1).toString().padStart(2, "0")}.${today.getFullYear()}`
        break
      case "YYYY/MM/DD":
        formattedDate = `${today.getFullYear()}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getDate().toString().padStart(2, "0")}`
        break
      default:
        formattedDate = today.toLocaleDateString()
    }

    setDatePreview(formattedDate)
  }, [form.watch("dateFormat")])

  // Update days in month when month changes
  useEffect(() => {
    const selectedMonth = form.watch("fiscalYearStart.month")
    if (!selectedMonth) return

    const monthNumber = Number.parseInt(selectedMonth)
    // Get the number of days in the selected month (using current year)
    const year = new Date().getFullYear()
    const daysCount = new Date(year, monthNumber, 0).getDate()

    // Create an array of days
    const days = Array.from({ length: daysCount }, (_, i) => i + 1)
    setDaysInMonth(days)
  }, [form.watch("fiscalYearStart.month")])

  // Handle form submission
  function onSubmit(values: FormValues) {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSaving(false)
      toast({
        title: t("orgPersonalization.toast.title"),
        description: t("orgPersonalization.toast.description"),
      })
    }, 1500)
  }

  // Reset form to defaults
  function handleReset() {
    form.reset({
      currency: currencies[2], // INR
      fiscalYearType: "standard",
      fiscalYearStart: {
        month: "4", // April
        day: "1",
      },
      timezone: "Asia/Kolkata",
      language: "en",
      dateFormat: "DD/MM/YYYY",
      companyId: "ASPH-12345",
      taxId: "GSTIN-22AAAAA0000A1Z5",
      customFields: [
        { key: t("orgPersonalization.customFields.industry"), value: t("orgPersonalization.customFields.realEstate") },
        { key: t("orgPersonalization.customFields.registrationNumber"), value: "REG-987654321" },
      ],
    })
    toast({
      title: t("orgPersonalization.toast.resetTitle"),
      description: t("orgPersonalization.toast.resetDescription"),
    })
  }

  // Add a new custom field
  function addCustomField() {
    const currentFields = form.getValues("customFields")
    form.setValue("customFields", [...currentFields, { key: "", value: "" }])
  }

  // Remove a custom field
  function removeCustomField(index: number) {
    const currentFields = form.getValues("customFields")
    form.setValue(
      "customFields",
      currentFields.filter((_, i) => i !== index),
    )
  }

  return (
    <div className="w-full">
      {/* Modern Page Header with Breadcrumb */}
      <div className="bg-gradient-to-r from-primary/10 to-background rounded-lg border p-6 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Home size={14} />
          <span>{t("orgPersonalization.breadcrumb.setup")}</span>
          <ChevronRight size={14} />
          <span>{t("orgPersonalization.breadcrumb.organization")}</span>
          <ChevronRight size={14} />
          <span className="font-medium text-primary">{t("orgPersonalization.breadcrumb.personalization")}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t("orgPersonalization.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("orgPersonalization.subtitle")}</p>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {t("orgPersonalization.badge")}
          </Badge>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <Card className="border shadow-sm overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="text-xl">{t("orgPersonalization.card.title")}</CardTitle>
                <CardDescription>{t("orgPersonalization.card.description")}</CardDescription>
              </CardHeader>

              <Tabs defaultValue="regional" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6 pt-2">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="regional">{t("orgPersonalization.tabs.regional")}</TabsTrigger>
                    <TabsTrigger value="identifiers">{t("orgPersonalization.tabs.identifiers")}</TabsTrigger>
                  </TabsList>
                </div>

                <CardContent className="p-6">
                  <TabsContent value="regional" className="mt-0 space-y-6">
                    {/* Advanced Currency Selector */}
                    <div className="space-y-4">
                      <h3 className="text-base font-medium">{t("orgPersonalization.currency.title")}</h3>
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button variant="outline" role="combobox" className="w-full justify-between">
                                    {field.value ? (
                                      <div className="flex items-center gap-2">
                                        <span className="font-bold">{field.value.symbol}</span>
                                        <span>{field.value.code}</span>
                                        <span className="text-muted-foreground">({field.value.name})</span>
                                      </div>
                                    ) : (
                                      t("orgPersonalization.currency.select")
                                    )}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[400px] p-0">
                                <Command>
                                  <CommandInput placeholder={t("orgPersonalization.currency.search")} />
                                  <CommandList>
                                    <CommandEmpty>{t("orgPersonalization.currency.noResults")}</CommandEmpty>
                                  </CommandList>
                                  <CommandList>
                                    <CommandGroup>
                                      {currencies.map((currency) => (
                                        <CommandItem
                                          key={currency.code}
                                          value={currency.code}
                                          onSelect={() => {
                                            form.setValue("currency", currency)
                                          }}
                                          className="flex items-center justify-between py-3"
                                        >
                                          <div className="flex items-center gap-2">
                                            <span className="font-bold text-base">{currency.symbol}</span>
                                            <span className="font-medium">{currency.code}</span>
                                            <span className="text-muted-foreground">({currency.name})</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="font-mono">
                                              {currency.format}
                                            </Badge>
                                            {currency.code === field.value.code && (
                                              <Check className="h-4 w-4 text-primary" />
                                            )}
                                          </div>
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormDescription>{t("orgPersonalization.currency.description")}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Currency Details Card */}
                      <Card className="bg-muted/20 border-dashed">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">{t("orgPersonalization.currency.code")}</p>
                              <p className="font-medium">{form.watch("currency").code}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">{t("orgPersonalization.currency.symbol")}</p>
                              <p className="font-medium">{form.watch("currency").symbol}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">
                                {t("orgPersonalization.currency.decimalPlaces")}
                              </p>
                              <p className="font-medium">{form.watch("currency").decimalPlaces}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-muted-foreground">
                                {t("orgPersonalization.currency.formatExample")}
                              </p>
                              <p className="font-medium font-mono">{form.watch("currency").format}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Fiscal Year Selection */}
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-medium">{t("orgPersonalization.fiscalYear.title")}</h3>
                      <FormField
                        control={form.control}
                        name="fiscalYearType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="standard" id="standard" />
                                  <label htmlFor="standard" className="font-medium cursor-pointer">
                                    {t("orgPersonalization.fiscalYear.standard")}
                                  </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="custom" id="custom" />
                                  <label htmlFor="custom" className="font-medium cursor-pointer">
                                    {t("orgPersonalization.fiscalYear.custom")}
                                  </label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch("fiscalYearType") === "custom" && (
                        <div className="grid grid-cols-2 gap-4 pl-6 pt-2">
                          <FormField
                            control={form.control}
                            name="fiscalYearStart.month"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("orgPersonalization.fiscalYear.startMonth")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t("orgPersonalization.fiscalYear.selectMonth")} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {months.map((month) => (
                                      <SelectItem key={month.value} value={month.value}>
                                        {month.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="fiscalYearStart.day"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("orgPersonalization.fiscalYear.startDay")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t("orgPersonalization.fiscalYear.selectDay")} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {daysInMonth.map((day) => (
                                      <SelectItem key={day} value={day.toString()}>
                                        {day}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      {form.watch("fiscalYearType") === "custom" && (
                        <div className="flex items-center p-3 rounded-md bg-muted/30 border border-dashed border-muted-foreground/20">
                          <Info className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm text-muted-foreground">
                            {t("orgPersonalization.fiscalYear.info.prefix")}{" "}
                            <span className="font-medium">
                              {form.watch("fiscalYearStart.month") && form.watch("fiscalYearStart.day")
                                ? `${
                                    months.find((m) => m.value === form.watch("fiscalYearStart.month"))?.label
                                  } ${form.watch("fiscalYearStart.day")}`
                                : t("orgPersonalization.fiscalYear.info.selectedDate")}
                            </span>{" "}
                            {t("orgPersonalization.fiscalYear.info.suffix")}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-2">
                      <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              {t("orgPersonalization.timezone.label")}
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t("orgPersonalization.timezone.select")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {timezones.map((timezone) => (
                                  <SelectItem key={timezone.value} value={timezone.value}>
                                    {timezone.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>{t("orgPersonalization.timezone.description")}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Languages className="h-4 w-4 text-muted-foreground" />
                              {t("orgPersonalization.language.label")}
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t("orgPersonalization.language.select")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {languages.map((language) => (
                                  <SelectItem key={language.value} value={language.value}>
                                    {language.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>{t("orgPersonalization.language.description")}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                              {t("orgPersonalization.dateFormat.label")}
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t("orgPersonalization.dateFormat.select")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {dateFormats.map((format) => (
                                  <SelectItem key={format.value} value={format.value}>
                                    {format.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="flex items-center gap-2">
                              <span>{t("orgPersonalization.dateFormat.preview")}: </span>
                              <Badge variant="outline" className="font-mono">
                                {datePreview}
                              </Badge>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="identifiers" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="companyId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                {t("orgPersonalization.identifiers.companyId")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={t("orgPersonalization.identifiers.companyIdPlaceholder")}
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                {t("orgPersonalization.identifiers.companyIdDescription")}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="taxId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <Receipt className="h-4 w-4 text-muted-foreground" />
                                {t("orgPersonalization.identifiers.taxId")}
                              </FormLabel>
                              <FormControl>
                                <Input placeholder={t("orgPersonalization.identifiers.taxIdPlaceholder")} {...field} />
                              </FormControl>
                              <FormDescription>{t("orgPersonalization.identifiers.taxIdDescription")}</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Plus className="h-4 w-4 text-muted-foreground" />
                            {t("orgPersonalization.customFields.title")}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {t("orgPersonalization.customFields.description")}
                          </p>

                          {form.watch("customFields").map((field, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                              <Input
                                placeholder={t("orgPersonalization.customFields.keyPlaceholder")}
                                value={field.key}
                                onChange={(e) => {
                                  const newFields = [...form.getValues("customFields")]
                                  newFields[index].key = e.target.value
                                  form.setValue("customFields", newFields)
                                }}
                                className="flex-1"
                              />
                              <Input
                                placeholder={t("orgPersonalization.customFields.valuePlaceholder")}
                                value={field.value}
                                onChange={(e) => {
                                  const newFields = [...form.getValues("customFields")]
                                  newFields[index].value = e.target.value
                                  form.setValue("customFields", newFields)
                                }}
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeCustomField(index)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          ))}

                          <Button type="button" variant="outline" size="sm" onClick={addCustomField} className="mt-2">
                            <Plus className="h-4 w-4 mr-2" />
                            {t("orgPersonalization.customFields.addField")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>

                <div className="bg-muted/20 p-4 flex items-center justify-between">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button type="button" variant="outline" onClick={handleReset} className="gap-2">
                          <RotateCcw className="h-4 w-4" />
                          {t("orgPersonalization.buttons.resetToDefaults")}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("orgPersonalization.tooltips.resetToDefaults")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button type="submit" disabled={isSaving} className="gap-2">
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("orgPersonalization.buttons.saving")}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {t("orgPersonalization.buttons.saveChanges")}
                      </>
                    )}
                  </Button>
                </div>
              </Tabs>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  )
}
