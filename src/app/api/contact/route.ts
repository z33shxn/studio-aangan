import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    const { name, email, phone, projectType, budget, message } = parsed.data;

    const { studio } = await import('@/content/studio');
    const targetEmail = process.env.CONTACT_TO_EMAIL || studio.contact.email;

    const resendApiKey = process.env.RESEND_API_KEY;

    // Simple HTML escape to prevent injection
    const escapeHTML = (str: string | undefined) => str ? str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    ) : '';

    if (resendApiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `Studio Aangan <onboarding@resend.dev>`,
          to: [targetEmail],
          subject: `New Inquiry from ${escapeHTML(name)}`,
          html: `
            <h2>New Project Inquiry</h2>
            <p><strong>Name:</strong> ${escapeHTML(name)}</p>
            <p><strong>Email:</strong> ${escapeHTML(email)}</p>
            <p><strong>Phone:</strong> ${escapeHTML(phone)}</p>
            <p><strong>Project Type:</strong> ${escapeHTML(projectType)}</p>
            <p><strong>Budget:</strong> ${escapeHTML(budget)}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHTML(message).replace(/\n/g, '<br/>')}</p>
          `,
        }),
      });

      if (!res.ok) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
      }
    } else {
      console.log('--- NEW CONTACT SUBMISSION ---');
      console.log({ name, email, phone, projectType, budget, message });
      console.log('------------------------------');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
