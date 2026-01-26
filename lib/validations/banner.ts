import { z } from "zod";

// Esquema de validación para banner
export const bannerSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres").max(200),
  subtitle: z.string().max(200).optional(),
  imageUrl: z.string().url("La imagen debe ser una URL válida"),
  linkUrl: z.string().url("El link debe ser una URL válida").optional().or(z.literal("")),
  buttonText: z.string().max(50).optional().or(z.literal("")),
  isActive: z.boolean(),
  displayOrder: z.number().int().min(0, "El orden debe ser un número positivo"),
});

export const bannerUpdateSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  subtitle: z.string().max(200).optional(),
  imageUrl: z.string().url().optional(),
  linkUrl: z.string().url().optional().or(z.literal("")),
  buttonText: z.string().max(50).optional().or(z.literal("")),
  isActive: z.boolean().optional(),
  displayOrder: z.number().int().min(0).optional(),
});
