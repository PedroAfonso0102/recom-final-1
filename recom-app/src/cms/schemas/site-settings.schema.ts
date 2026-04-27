import { z } from "zod";

export const siteSettingsSchema = z.object({
  company: z.object({
    name: z.string().min(1, "Nome da marca é obrigatório."),
    fullName: z.string().min(1, "Razão social é obrigatória."),
    subtitle: z.string().optional(),
    since: z.string().optional(),
    cnpj: z.string().optional(),
  }),
  contact: z.object({
    phone: z.string().min(1, "Telefone é obrigatório."),
    email: z.string().email("E-mail inválido."),
    whatsapp: z.string().min(1, "WhatsApp é obrigatório."),
    address: z.string().optional(),
    cep: z.string().optional(),
  }),
  links: z.object({
    facebook: z.string().url("URL inválida.").optional().or(z.literal("")),
    linkedin: z.string().url("URL inválida.").optional().or(z.literal("")),
    instagram: z.string().url("URL inválida.").optional().or(z.literal("")),
  }),
  seo: z.object({
    defaultTitle: z.string().min(1, "Título padrão é obrigatório."),
    defaultDescription: z.string().min(1, "Descrição padrão é obrigatória."),
    titleTemplate: z.string().default("%s | RECOM Metal Duro"),
  }),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
