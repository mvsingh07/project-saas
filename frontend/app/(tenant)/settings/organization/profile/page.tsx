"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslation } from "react-i18next"
import { useTheme } from "next-themes"
import {
  Loader2,
  Upload,
  MapPin,
  Phone,
  Globe,
  Mail,
  User,
  Save,
  AlertTriangle,
  ChevronRight,
  Home,
  Briefcase,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  organizationName: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  industry: z.string({
    required_error: "Please select an industry.",
  }),
  location: z.string({
    required_error: "Please select a location.",
  }),
  address: z.string().min(1, {
    message: "Address is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  pincode: z.string().min(1, {
    message: "Pin code is required.",
  }),
  state: z.string({
    required_error: "Please select a state.",
  }),
  contactName: z.string().min(1, {
    message: "Contact name is required.",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),
  description: z.string().optional(),
  foundedYear: z.string().optional(),
  employeeCount: z.string().optional(),
})

export default function OrganizationProfilePage() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationName: "AuctionSphere Inc.",
      industry: "real-estate",
      location: "india",
      address: "123 Auction Avenue, Suite 456",
      city: "Mumbai",
      pincode: "400001",
      state: "maharashtra",
      contactName: "Raj Sharma",
      phone: "+91 98765 43210",
      email: "contact@auctionsphere.com",
      website: "https://auctionsphere.com",
      description: "Leading property auction platform in India, connecting buyers and sellers since 2018.",
      foundedYear: "2018",
      employeeCount: "50-100",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSaving(false)
      toast({
        title: t("orgProfile.profileUpdated"),
        description: t("orgProfile.profileUpdateSuccess"),
      })
    }, 1500)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload
      const reader = new FileReader()
      reader.onload = () => {
        setLogoPreview(reader.result as string)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full">
      {/* Modern Page Header with Breadcrumb */}
      <div className="bg-gradient-to-r from-primary/10 to-background rounded-lg border p-6 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Home size={14} />
          <span>{t("setupSidebar.setup")}</span>
          <ChevronRight size={14} />
          <span>{t("setupSidebar.organization")}</span>
          <ChevronRight size={14} />
          <span className="font-medium text-primary">{t("setupSidebar.profile")}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{t("orgProfile.title")}</h1>
            <p className="text-muted-foreground mt-1">{t("orgProfile.subtitle")}</p>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {t("orgProfile.statusActive")}
          </Badge>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <Card className="border shadow-sm overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-4 border-background">
                      {logoPreview ? (
                        <AvatarImage src={logoPreview || "/placeholder.svg"} alt={t("orgProfile.logoAlt")} />
                      ) : (
                        <>
                          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                            {form.getValues("organizationName").substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-md"
                      onClick={() => document.getElementById("logo-upload")?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      <input
                        id="logo-upload"
                        type="file"
                        className="hidden"
                        onChange={handleLogoUpload}
                        accept="image/*"
                      />
                    </Button>
                  </div>
                  <div>
                    <CardTitle className="text-xl">{form.getValues("organizationName")}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Briefcase className="h-3.5 w-3.5" />
                      <span>
                        {form.getValues("industry") === "real-estate"
                          ? t("orgProfile.industries.realEstate")
                          : form.getValues("industry")}
                      </span>
                      <span className="mx-1">•</span>
                      <MapPin className="h-3.5 w-3.5" />
                      <span>
                        {form.getValues("city")},{" "}
                        {form.getValues("state") === "maharashtra"
                          ? t("orgProfile.states.maharashtra")
                          : form.getValues("state")}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6 pt-2">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="general">{t("orgProfile.tabs.general")}</TabsTrigger>
                    <TabsTrigger value="contact">{t("orgProfile.tabs.contact")}</TabsTrigger>
                    <TabsTrigger value="address">{t("orgProfile.tabs.address")}</TabsTrigger>
                  </TabsList>
                </div>

                <CardContent className="p-6">
                  <TabsContent value="general" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="organizationName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("orgProfile.fields.organizationName")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("orgProfile.placeholders.organizationName")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("orgProfile.fields.industry")}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t("orgProfile.placeholders.selectIndustry")} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="real-estate">{t("orgProfile.industries.realEstate")}</SelectItem>
                                  <SelectItem value="construction">
                                    {t("orgProfile.industries.construction")}
                                  </SelectItem>
                                  <SelectItem value="property-management">
                                    {t("orgProfile.industries.propertyManagement")}
                                  </SelectItem>
                                  <SelectItem value="auction-services">
                                    {t("orgProfile.industries.auctionServices")}
                                  </SelectItem>
                                  <SelectItem value="financial-services">
                                    {t("orgProfile.industries.financialServices")}
                                  </SelectItem>
                                  <SelectItem value="other">{t("orgProfile.industries.other")}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="foundedYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("orgProfile.fields.foundedYear")}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t("orgProfile.placeholders.foundedYear")} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="employeeCount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("orgProfile.fields.employeeCount")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t("orgProfile.placeholders.selectRange")} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1-10">1-10</SelectItem>
                                    <SelectItem value="11-50">11-50</SelectItem>
                                    <SelectItem value="50-100">50-100</SelectItem>
                                    <SelectItem value="101-500">101-500</SelectItem>
                                    <SelectItem value="500+">500+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("orgProfile.fields.description")}</FormLabel>
                              <FormControl>
                                <textarea
                                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder={t("orgProfile.placeholders.description")}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("orgProfile.fields.website")}</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <Input placeholder={t("orgProfile.placeholders.website")} {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="contact" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="contactName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("orgProfile.fields.contactPerson")}</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <Input placeholder={t("orgProfile.placeholders.contactPerson")} {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("orgProfile.fields.phone")}</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <Input placeholder={t("orgProfile.placeholders.phone")} {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("orgProfile.fields.email")}</FormLabel>
                              <FormControl>
                                <div className="flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <Input placeholder={t("orgProfile.placeholders.email")} {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Alert variant="destructive" className="bg-muted/50 border-muted">
                          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                          <AlertDescription className="text-sm text-muted-foreground">
                            {t("orgProfile.emailNotice")}
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="address" className="mt-0 space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("orgProfile.fields.country")}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t("orgProfile.placeholders.selectCountry")} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="india">{t("orgProfile.countries.india")}</SelectItem>
                                  <SelectItem value="usa">{t("orgProfile.countries.usa")}</SelectItem>
                                  <SelectItem value="uk">{t("orgProfile.countries.uk")}</SelectItem>
                                  <SelectItem value="australia">{t("orgProfile.countries.australia")}</SelectItem>
                                  <SelectItem value="canada">{t("orgProfile.countries.canada")}</SelectItem>
                                  <SelectItem value="singapore">{t("orgProfile.countries.singapore")}</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t("orgProfile.fields.address")}</FormLabel>
                              <FormControl>
                                <Input placeholder={t("orgProfile.placeholders.address")} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("orgProfile.fields.city")}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t("orgProfile.placeholders.city")} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("orgProfile.fields.state")}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder={t("orgProfile.placeholders.selectState")} />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="maharashtra">{t("orgProfile.states.maharashtra")}</SelectItem>
                                    <SelectItem value="delhi">{t("orgProfile.states.delhi")}</SelectItem>
                                    <SelectItem value="karnataka">{t("orgProfile.states.karnataka")}</SelectItem>
                                    <SelectItem value="tamil-nadu">{t("orgProfile.states.tamilNadu")}</SelectItem>
                                    <SelectItem value="telangana">{t("orgProfile.states.telangana")}</SelectItem>
                                    <SelectItem value="gujarat">{t("orgProfile.states.gujarat")}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="pincode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("orgProfile.fields.pincode")}</FormLabel>
                                <FormControl>
                                  <Input placeholder={t("orgProfile.placeholders.pincode")} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex items-center p-3 rounded-md bg-muted/30 border border-dashed border-muted-foreground/20">
                          <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm text-muted-foreground">{t("orgProfile.addressNotice")}</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>

                <div className="bg-muted/20 p-4 flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {t("orgProfile.lastUpdated")}: {new Date().toLocaleDateString()}
                  </div>
                  <Button type="submit" disabled={isSaving} className="gap-2">
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("orgProfile.saving")}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        {t("orgProfile.saveChanges")}
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
