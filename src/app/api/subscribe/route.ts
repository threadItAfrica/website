import { NextRequest, NextResponse } from 'next/server';
import MailerLite from '@mailerlite/mailerlite-nodejs';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Add subscriber to MailerLite
    const params = {
      email: email,
      fields: {
        name: name || '',
      },
      // Optional: add to a specific group
      // groups: ['group_id_here'],
    };

    const response = await mailerlite.subscribers.createOrUpdate(params);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed!',
        data: response.data 
      },
      { status: 200 }
    );
 
  } catch (error: unknown) {
    const err = error as { response?: { status: number } };
    console.error('MailerLite subscription error:', error);
    
    // Handle specific MailerLite errors
    if (err.response?.status === 422) {
      return NextResponse.json(
        { error: 'Invalid email address or subscriber already exists' },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}