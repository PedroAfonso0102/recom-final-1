import { z } from "zod";

export const siteSettingsSchema = z.object({
  company: z.object({
    name: z.string().min(2, "O nome da empresa deve ter pelo menos 2 caracteres."),
    fullName: z.string().min(2, "A razão social deve ter pelo menos 2 caracteres."),
    subtitle: z.string().min(2, "O subtítulo deve ter pelo menos 2 caracteres."),
    since: z.string().regex(/^\d{4}$/, "O ano deve ter 4 dígitos."),
    cnpj: z.string().min(14, "CNPJ inválido.").optional(),
  }),
  contact: z.object({
    phone: z.string().min(8, "Telefone inválido."),
    email: z.string().email("E-mail inválido."),
    whatsapp: z.string().min(10, "WhatsApp inválido (DDI + DDD + Número)."),
    address: z.string().min(10, "Endereço deve ser completo."),
    cep: z.string().min(8, "CEP inválido."),
  }),
  links: z.object({
    linkedin: z.string().url("URL do LinkedIn inválida.").optional().or(z.string().length(0)),
    instagram: z.string().url("URL do Instagram inválida.").optional().or(z.string().length(0)),
    facebook: z.string().url("URL do Facebook inválida.").optional().or(z.string().length(0)),
  }),
  seo: z.object({
    defaultTitle: z.string().min(10, "Título SEO deve ser mais descritivo."),
    defaultDescription: z.string().min(20, "Descrição SEO deve ser mais detalhada."),
    titleTemplate: z.string().min(2, "Template de título inválido (ex: %s | RECOM)."),
  }),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
