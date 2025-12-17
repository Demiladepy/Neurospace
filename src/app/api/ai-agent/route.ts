import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ 
                error: 'GROQ_API_KEY not configured' 
            }, { status: 401 });
        }

        const groq = new Groq({ apiKey });

        const completion = await groq.chat.completions.create({
            messages: messages,
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
        });

        return NextResponse.json({ 
            result: completion.choices[0]?.message?.content || '' 
        });

    } catch (error: unknown) {
        console.error('AI Agent Error:', error);
        const message = error instanceof Error ? error.message : 'Failed to generate response';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

