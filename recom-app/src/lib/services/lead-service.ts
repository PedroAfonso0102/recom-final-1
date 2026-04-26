import { createClient } from '../supabase/server';
import { Lead, LeadSchema } from '../../design-system/schemas/lead.schema';

export async function createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate data
    const validatedData = LeadSchema.parse({
      ...leadData,
      status: 'new'
    });

    const supabase = await createClient();
    
    const { error } = await supabase
      .from('leads')
      .insert({
        name: validatedData.name,
        company: validatedData.company,
        email: validatedData.email,
        phone: validatedData.phone,
        supplier_interest: validatedData.supplierInterest,
        process_interest: validatedData.processInterest,
        item_code: validatedData.itemCode,
        message: validatedData.message,
        source_page: validatedData.sourcePage,
        status: validatedData.status
      });

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
