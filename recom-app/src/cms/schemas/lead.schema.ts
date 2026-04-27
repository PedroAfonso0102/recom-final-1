import { z } from "zod";

export const LeadSchema = z.object({
  id: z.string().uuid().optional(),
  status: z.enum(["new", "contacted", "qualified", "lost"]).default("new"),
  name: z.string().min(2, "Informe seu nome."),
  company: z.string().min(2, "Informe a empresa."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().min(10, "Informe um telefone ou WhatsApp."),
  supplierInterest: z.string().optional(),
  processInterest: z.string().optional(),
  itemCode: z.string().nullable().optional(),
  message: z.string().min(10, "Conte um pouco mais sobre a sua necessidade."),
  sourcePage: z.string().optional(),
  consent: z.boolean().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;
