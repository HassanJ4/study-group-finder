import { sql } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface ClerkUserCreatedEvent {
  type: string;
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
    }>;
    username: string | null;
    image_url: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const payload: ClerkUserCreatedEvent = await request.json();
    const eventType = payload.type;

    if (eventType === 'user.created') {
      const { id, email_addresses, username, image_url } = payload.data;

      await sql`
        INSERT INTO users (clerk_id, email, username, avatar_url)
        VALUES (
          ${id},
          ${email_addresses[0].email_address},
          ${username || email_addresses[0].email_address.split('@')[0]},
          ${image_url}
        )
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
}
}
