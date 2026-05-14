export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'CLAUDE_API_KEY ยังไม่ได้ตั้งค่าใน Vercel Environment Variables' });

  try {
    const body = req.body || {};
    if (!body.model) body.model = 'claude-sonnet-4-6';
    if (!body.max_tokens) body.max_tokens = 1024;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || `Anthropic API error ${response.status}`,
        detail: data,
      });
    }

    // normalise: ส่ง content เป็น string เสมอ
    const raw = data.content;
    const text = Array.isArray(raw)
      ? raw.map(b => b.text || '').join('')
      : (typeof raw === 'string' ? raw : JSON.stringify(raw));

    return res.status(200).json({ ...data, content: text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
