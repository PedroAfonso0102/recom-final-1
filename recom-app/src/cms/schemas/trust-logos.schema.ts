import { z } from "zod";

export const trustLogosSchema = z.object({
  title: z.string().optional(),
  supplierIds: z.array(z.string()).optional(),
  showAll: z.boolean().default(true),
  grayscale: z.boolean().default(true),
});

export type TrustLogosProps = z.infer<typeof trustLogosSchema>;
