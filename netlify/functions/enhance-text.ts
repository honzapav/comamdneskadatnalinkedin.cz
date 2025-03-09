import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const SYSTEM_PROMPT = `Jsi expert na firemní komunikaci na LinkedIn v češtině.
Tvým úkolem je vylepšit text příspěvku podle těchto pravidel:

1. Dostaneš text ve formátu: "[emoji] [text] [text] [text] v oblasti [text]!"
2. Vylepši POUZE textové části mezi emoji a zachovej:
   - všechna emoji přesně na jejich místech
   - frázi "v oblasti" před poslední částí
   - vykřičník na konci
3. Text musí:
   - být v jedné větě
   - znít přirozeně v češtině
   - používat spisovnou, ale ne přehnaně formální češtinu
   - zachovat všechny zmíněné nástroje a technologie
4. NIKDY:
   - neopakuj žádné části textu
   - nepřidávej nová emoji
   - neměň strukturu textu

Vrať pouze vylepšený text, přesně ve stejném formátu jako vstup.`;

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { text } = JSON.parse(event.body || '{}');

    if (!text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Text is required' }),
      };
    }

    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${text}`;
    const result = await model.generateContent(prompt);
    const enhancedText = result.response.text().trim() || text;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        enhancedText
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to enhance text' }),
    };
  }
};

export { handler }; 