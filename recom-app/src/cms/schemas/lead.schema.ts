import { z } from "zod";

export const LeadSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(["new", "contacted", "qualified", "lost"]).default("new"),
  priority: z.enum(["low", "normal", "high", "critical"]).default("normal").optional(),
  sourceType: z.enum(["contact", "supplier", "process", "promotion", "general"]).default("contact").optional(),
  sourcePage: z.string().optional(),
  name: z.string().trim().min(2, "Informe seu nome."),
  company: z.string().trim().min(2, "Informe a empresa."),
  email: z.string().trim().email("Informe um e-mail valido."),
  phone: z.string().trim().min(10, "Informe um telefone ou WhatsApp."),
  whatsapp: z.string().trim().optional().nullable(),
  supplierInterest: z.string().optional(),
  processInterest: z.string().optional(),
  itemCode: z.string().trim().nullable().optional(),
  message: z.string().trim().min(10, "Conte um pouco mais sobre a sua necessidade."),
  assignedTo: z.string().uuid().optional().nullable(),
  notes: z.string().optional().nullable(),
  lastContactedAt: z.string().datetime().optional().nullable(),
  whatsappUrl: z.string().url().optional().nullable(),
  consent: z.boolean().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;
