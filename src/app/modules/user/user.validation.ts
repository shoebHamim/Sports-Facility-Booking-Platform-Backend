import { z } from 'zod';

const createUser = z.object({
  name: z.string({required_error:"name is required"}).min(2, 'Name is length must be at least 2 characters'),
  email: z.string({required_error:"email is required"}).email('Invalid email format'),
  password: z.string({required_error:"password is required"}).min(6, 'Password length must be at least 6 character long'),
  phone: z.string({required_error:"phone is required"}).min(11, 'Phone number must be minimum of 11 characters'),
  role: z.enum(['admin', 'user'],{required_error:"role is required",invalid_type_error:"Role must be admin or user"}),
  address: z.string({required_error:"address is required"}).min(8, 'Address length must be minimum of 8 characters'),
});

const loginUser=z.object({
  email: z.string({required_error:"email is required"}).email('Invalid email format'),
  password: z.string({required_error:"password is required"}).min(6, 'Password length must be at least 6 character long')
})

export const userValidationSchema={
  createUser,
  loginUser
}