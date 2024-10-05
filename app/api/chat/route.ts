import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL,
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const chatCompletion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: message }],
    });

    const reply = chatCompletion.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 });
  }
}