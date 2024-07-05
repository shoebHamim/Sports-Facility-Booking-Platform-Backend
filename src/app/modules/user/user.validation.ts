import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
  phone: z.string().min(1, 'Phone number is required'),
  role: z.enum(['admin', 'user'],{required_error:"Role is required",invalid_type_error:"Role must be admin or user"}),
  address: z.string().min(1, 'Address is required'),
});

export { userSchema };