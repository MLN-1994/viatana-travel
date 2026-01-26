import { z } from "zod";

// Esquema de validación para un paquete turístico
export const packageSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres").max(200),
  destination: z.string().min(2, "El destino es obligatorio"),
  description: z.string().min(10, "La descripción debe ser más detallada"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  duration: z.string().min(2, "La duración es obligatoria"),
  image: z.string().url("La imagen debe ser una URL válida"),
  isOffer: z.boolean().optional(),
  originalPrice: z.number().positive().optional().or(z.literal(0)),
  discount: z.number().min(0).max(100).optional().or(z.literal(0)),
  included: z.array(z.string()),
  category: z.string().min(2, "La categoría es obligatoria"), // slug, no UUID
  categoryId: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.isOffer) {
    if (!data.originalPrice || data.originalPrice <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["originalPrice"],
        message: "El precio original es obligatorio y debe ser mayor a 0 si es oferta",
      });
    }
    if (!data.discount || data.discount <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["discount"],
        message: "El descuento es obligatorio y debe ser mayor a 0 si es oferta",
      });
    }
  }
});

// Esquema de actualización: todos los campos opcionales, sin refinamiento
export const packageUpdateSchema = z.object({
  title: z.string().min(5).max(200).optional(),
  destination: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  duration: z.string().min(2).optional(),
  image: z.string().url().optional(),
  isOffer: z.boolean().optional(),
  originalPrice: z.number().positive().optional(),
  discount: z.number().min(0).max(100).optional(),
  included: z.array(z.string()).optional(),
  category: z.string().min(2).optional(),
  categoryId: z.string().optional(),
});
