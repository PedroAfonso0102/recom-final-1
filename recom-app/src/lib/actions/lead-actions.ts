'use export';
'use server';

import { createLead } from '../services/lead-service';
import { revalidatePath } from 'next/cache';

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string;
  const company = formData.get('company') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const interest = formData.get('interest') as string;
  const message = formData.get('message') as string;
  const sourcePage = formData.get('sourcePage') as string || '/sobre';

  const result = await createLead({
    name,
    company,
    email,
    phone,
    message,
    sourcePage,
    // Map interest to message if not matching UUIDs, or handle accordingly
    // For now, we'll just put it in the message or handle as a general inquiry
  });

  if (result.success) {
    revalidatePath('/admin/leads');
    return { success: true };
  } else {
    return { success: false, error: result.error };
  }
}
