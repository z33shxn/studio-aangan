import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, budget, message } = body;

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Studio Aangan <hello@studioaangan.com>',
          to: ['hello@studioaangan.com'],
          subject: `New Inquiry from ${name}`,
          html: `
            <h2>New Project Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
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
