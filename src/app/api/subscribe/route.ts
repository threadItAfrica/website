import mailchimp from '@mailchimp/mailchimp_marketing';
import { NextResponse } from 'next/server';

interface SubscribeRequest {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface MailchimpError {
  response?: {
    body?: {
      title?: string;
      detail?: string;
    };
  };
}

// Rate limiting
const RATE_LIMIT = 5; // requests
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const ipRequests = new Map<string, { count: number; timestamp: number }>();

function getRateLimitResponse() {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { 
      status: 429,
      headers: {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    }
  );
}

// Validate environment variables
const requiredEnvVars = {
  MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  MAILCHIMP_SERVER_PREFIX: process.env.MAILCHIMP_SERVER_PREFIX,
  MAILCHIMP_AUDIENCE_ID: process.env.MAILCHIMP_AUDIENCE_ID,
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

mailchimp.setConfig({
  apiKey: requiredEnvVars.MAILCHIMP_API_KEY,
  server: requiredEnvVars.MAILCHIMP_SERVER_PREFIX,
});

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export async function POST(request: Request) {
  try {
    // Rate limiting check first
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('remote-addr') || '';
    const now = Date.now();
    const requestData = ipRequests.get(clientIp) || { count: 0, timestamp: now };
    
    if (now - requestData.timestamp < RATE_LIMIT_WINDOW) {
      requestData.count++;
    } else {
      requestData.count = 1;
      requestData.timestamp = now;
    }

    ipRequests.set(clientIp, requestData);

    if (requestData.count > RATE_LIMIT) {
      return getRateLimitResponse();
    }

    // Parse request body
    const { email, firstName, lastName }: SubscribeRequest = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeInput(email);
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const response = await mailchimp.lists.addListMember(
      requiredEnvVars.MAILCHIMP_AUDIENCE_ID!,
      {
        email_address: sanitizedEmail,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName ? sanitizeInput(firstName) : '',
          LNAME: lastName ? sanitizeInput(lastName) : '',
        },
      }
    ) as { id: string; email_address: string };

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed!',
      member_id: response.id
    });
  } catch (error) {
    console.error('Mailchimp error:', error);
    console.log('Mailchimp error:', error);
    
    const mailchimpError = error as MailchimpError;
    
    if (mailchimpError.response?.body?.title === 'Member Exists') {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Something went wrong. Please try again.',
        detail: mailchimpError.response?.body?.detail || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
