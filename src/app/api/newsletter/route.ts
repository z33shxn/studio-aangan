import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const { email } = parsed.data;

    const resendApiKey = process.env.RESEND_API_KEY;

    // Simple HTML escape to prevent injection
    const escapeHTML = (str: string) => str ? str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    ) : '';

    if (resendApiKey) {
      const { studio } = await import('@/content/studio');
      const targetEmail = studio.contact.email;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: `Studio Aangan <${targetEmail}>`,
          to: [targetEmail],
          subject: `New Newsletter Subscriber: ${escapeHTML(email)}`,
          html: `<p>New subscriber to the journal: <strong>${escapeHTML(email)}</strong></p>`,
        }),
      });

      if (!res.ok) {
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
      }
    } else {
      console.log('--- NEW NEWSLETTER SUB ---');
      console.log({ email });
      console.log('--------------------------');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
