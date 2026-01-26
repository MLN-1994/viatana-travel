import { z } from "zod";

// Esquema de validación para categoría
export const categorySchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(100),
  slug: z.string().min(2, "El slug es obligatorio").max(100),
  description: z.string().max(255).optional(),
  icon: z.string().max(10).optional(),
  displayOrder: z.number().int().min(0, "El orden debe ser un número positivo"),
});

export const categoryUpdateSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  slug: z.string().min(2).max(100).optional(),
  description: z.string().max(255).optional(),
  icon: z.string().max(10).optional(),
  displayOrder: z.number().int().min(0).optional(),
});
