import { z } from "zod";

export const siteSettingsSchema = z.object({
  company: z.object({
    name: z.string().trim().min(2, "O nome da empresa deve ter pelo menos 2 caracteres."),
    fullName: z.string().trim().min(2, "A razão social deve ter pelo menos 2 caracteres."),
    subtitle: z.string().trim().min(2, "O subtítulo deve ter pelo menos 2 caracteres."),
    since: z.string().regex(/^\d{4}$/, "O ano deve ter 4 dígitos."),
    cnpj: z.string().trim().regex(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$|^\d{14}$/, "CNPJ inválido (Formatado ou apenas números).").optional().nullable(),
  }),
  contact: z.object({
    phone: z.string().trim().min(8, "Telefone inválido."),
    email: z.string().trim().email("E-mail inválido."),
    whatsapp: z.string().trim().min(10, "WhatsApp inválido (DDI + DDD + Número)."),
    address: z.string().trim().min(10, "Endereço deve ser completo."),
    cep: z.string().trim().regex(/^\d{5}-?\d{3}$/, "CEP inválido (00000-000 ou apenas números)."),
  }),
  links: z.object({
    linkedin: z.string().trim().url("URL do LinkedIn inválida.").optional().or(z.string().length(0)).nullable(),
    instagram: z.string().trim().url("URL do Instagram inválida.").optional().or(z.string().length(0)).nullable(),
    facebook: z.string().trim().url("URL do Facebook inválida.").optional().or(z.string().length(0)).nullable(),
  }),
  seo: z.object({
    defaultTitle: z.string().trim().min(10, "Título SEO deve ser mais descritivo."),
    defaultDescription: z.string().trim().min(20, "Descrição SEO deve ser mais detalhada."),
    titleTemplate: z.string().trim().min(2, "Template de título inválido (ex: %s | RECOM)."),
  }),
});

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
