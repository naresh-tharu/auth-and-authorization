import { z } from 'zod'
let registerSchema = z.object({
  name: z.string().min(1).regex(/^[a-zA-Z][a-zA-Z\s]*$/),
  email: z.string().min(1).trim().toLowerCase().email({ message: "Invalid Email Address" }),
  phone: z.string().regex(/^(\+\d{1,3}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/),
  role: z.string().min(1).regex(/admin|seller|customer/, { message: "Role is not defined" }),
  address: z.string().regex(/^[a-zA-Z][a-zA-Z0-9\s,'-]*$/)
})

let loginSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1)
})

let userActivationSchema = z.object({
  password: z.string().min(1).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],

});


export { registerSchema, userActivationSchema, loginSchema }