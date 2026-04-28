import { createClient } from "../supabase/server";
import { Lead, LeadSchema } from '../../cms/schemas/lead.schema';
import { mapLeadToInsert } from "../database/mappings";

export async function createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = LeadSchema.safeParse({
      ...leadData,
      status: 'new'
    });

    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message || 'Dados inválidos.',
      };
    }

    const supabase = await createClient();
    const payload = mapLeadToInsert(parsed.data);
    
    const { error } = await supabase
      .from('leads')
      .insert(payload);

    if (error) {
      console.error('Error inserting lead:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Validation or insertion error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
