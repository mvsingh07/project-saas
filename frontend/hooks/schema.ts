import { z } from "zod"

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  display_name: z
    .string()
    .min(2, { message: "Display name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  department: z.string().optional(),
  employee_id: z.string().optional(),
  role: z.string().optional(),
  added_by: z.string().optional(),
})

export default profileFormSchema
