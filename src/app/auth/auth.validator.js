import { z } from 'zod'
let registerSchema = z.object({
  name: z.string().regex(/^[a-zA-Z][a-zA-Z\s]*$/),
  email: z.string().trim().toLowerCase().email({ message: "Invalid Email Address" }),
  phone: z.string().regex(/^(\+\d{1,3}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
  role: z.string().min(1).regex(/admin|seller|customer/, { message: "Role is not defined" }),
  address: z.string().regex(/^[a-zA-Z][a-zA-Z0-9\s,'-]*$/)
})
export { registerSchema }