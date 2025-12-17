import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const audioFile = formData.get('audio') as File;

        if (!audioFile) {
            return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: 'GROQ_API_KEY not configured' }, { status: 401 });
        }

        // Create form data for Groq API
        const groqFormData = new FormData();
        groqFormData.append('file', audioFile);
        groqFormData.append('model', 'whisper-large-v3-turbo');
        groqFormData.append('response_format', 'json');
        groqFormData.append('language', 'en');

        const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
            body: groqFormData,
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Groq STT Error:', error);
            return NextResponse.json({ error: 'Transcription failed' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json({ text: data.text });

    } catch (error: unknown) {
        console.error('Speech-to-text Error:', error);
        const message = error instanceof Error ? error.message : 'Failed to transcribe audio';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

