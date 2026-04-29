import { createClient } from "../supabase/server";
import { Lead, LeadSchema } from '../../cms/schemas/lead.schema';
import { mapLeadToInsert } from "../database/mappings";
import { createAuditLog } from "../audit";

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

    await createAuditLog({
      action: 'lead.created',
      entity_type: 'lead',
      entity_id: null,
      actor_id: '00000000-0000-0000-0000-000000000000',
      metadata: {
        source_page: payload.source_page,
        source_type: payload.source_type,
        email: payload.email,
      },
    });

    return { success: true };
  } catch (err) {
    console.error('Validation or insertion error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}
