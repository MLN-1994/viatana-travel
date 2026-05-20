import { z } from 'zod';

export const testimonialSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido').max(100),
  lastName: z.string().min(1, 'El apellido es requerido').max(100),
  destination: z.string().min(1, 'El destino es requerido').max(200),
  content: z.string().min(10, 'El comentario debe tener al menos 10 caracteres').max(2000),
  date: z.string().min(1, 'La fecha es requerida'),
  rating: z.number().int().min(1).max(5).default(5),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  photo1Url: z.string().url().optional().or(z.literal('')),
  photo2Url: z.string().url().optional().or(z.literal('')),
  photo3Url: z.string().url().optional().or(z.literal('')),
  isActive: z.boolean().default(true),
  displayOrder: z.number().int().min(0).default(0),
});

export const testimonialUpdateSchema = testimonialSchema.partial();

export type TestimonialInput = z.infer<typeof testimonialSchema>;
