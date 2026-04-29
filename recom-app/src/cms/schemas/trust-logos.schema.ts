import { z } from "zod";

export const trustLogosSchema = z.object({
  title: z.string().trim().optional().nullable(),
  supplierIds: z.array(z.string().uuid("ID de fornecedor inválido.")).optional().nullable(),
  showAll: z.boolean().default(true),
  grayscale: z.boolean().default(true),
});

export type TrustLogosProps = z.infer<typeof trustLogosSchema> & {
  suppliers?: Array<{ id: string; name: string; logoUrl?: string | null }>;
};
