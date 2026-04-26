import { z } from "zod";

export const LeadSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(["new", "contacted", "qualified", "lost"]).default("new"),
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  company: z.string().min(2, "A empresa deve ter pelo menos 2 caracteres."),
  email: z.string().email("Endereço de e-mail inválido."),
  phone: z.string().min(10, "O telefone deve ter pelo menos 10 caracteres."),
  supplierInterest: z.string().optional(),
  processInterest: z.string().optional(),
  itemCode: z.string().nullable().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;
