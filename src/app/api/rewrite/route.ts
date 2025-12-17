import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { prompt, apiKey, useLocal } = await req.json();

        // --- OPTION 1: LOCAL LLAMA 3 (OLLAMA) ---
        // If user opts for local or no key is provided, try Ollama first if 'useLocal' is true
        if (useLocal) {
            try {
                // This expects Ollama to be running: `ollama run llama3`
                const output = await fetch('http://127.0.0.1:11434/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'llama3', // Make sure user has pulled this model
                        prompt: `Simplify this for a student with special needs: ${prompt}`,
                        stream: false
                    })
                });

                if (!output.ok) throw new Error('Ollama connection failed');

                const data = await output.json();
                return NextResponse.json({ result: data.response });
            } catch (err) {
                console.error("Ollama Error:", err);
                return NextResponse.json({
                    error: 'Could not connect to Local Llama 3. Make sure Ollama is installed and running `ollama run llama3`.'
                }, { status: 503 });
            }
        }

        // --- OPTION 2: CLOUD LLAMA 3 (GROQ) ---
        const key = apiKey || process.env.GROQ_API_KEY;

        if (!key) {
            return NextResponse.json({ error: 'Missing API Key and Local Mode not selected.' }, { status: 401 });
        }

        const groq = new Groq({ apiKey: key });

        const completion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant for simplifying complex educational content for neurodivergent students. Keep it simple, engaging, and use emojis.' },
                { role: 'user', content: prompt }
            ],
            model: 'llama3-8b-8192',
        });

        return NextResponse.json({ result: completion.choices[0]?.message?.content || '' });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
    }
}
