import {z} from 'zod'

export const validationSchema = z.object({
    linkyt: z.string().min(1, 'Login is required').min(7, "Login should be min 7 characters"),
    category: z.string().min(1, 'Choose a category')
})

export type RegistrationFormData= z.infer<typeof validationSchema>