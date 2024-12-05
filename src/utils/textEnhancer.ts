export const enhanceText = async (text: string): Promise<string> => {
  try {
    const response = await fetch('/.netlify/functions/enhance-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to enhance text');
    }

    const data = await response.json();
    return data.enhancedText || text;
  } catch (error) {
    console.error('Failed to enhance text:', error);
    return text; // Return original text if enhancement fails
  }
}; 