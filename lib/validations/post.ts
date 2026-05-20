import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(300),
  subtitle: z.string().max(400).optional().or(z.literal('')),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .max(300)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  coverImage: z.string().url('URL de imagen de portada inválida'),
  secondImage: z.string().url().optional().or(z.literal('')),
  contentP1: z.string().min(10, 'El contenido principal debe tener al menos 10 caracteres'),
  contentP2: z.string().optional().or(z.literal('')),
  excerpt: z.string().min(10, 'El resumen debe tener al menos 10 caracteres').max(400),
  isActive: z.boolean().default(true),
});

export const postUpdateSchema = postSchema.partial();

export type PostInput = z.infer<typeof postSchema>;
