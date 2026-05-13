// Cloud sync — Upstash Redis REST API
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return res.status(500).json({ error: 'Redis not configured' });

  const h = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  // GET — load data from Redis
  if (req.method === 'GET') {
    try {
      const r = await fetch(`${url}/get/walnut:data`, { headers: h });
      const d = await r.json();
      // d.result is a string we stored with JSON.stringify
      const value = d.result ? JSON.parse(d.result) : null;
      return res.status(200).json({ data: value });
    } catch (e) {
      return res.status(200).json({ data: null }); // fail gracefully
    }
  }

  // POST — save data to Redis (store as JSON string)
  if (req.method === 'POST') {
    try {
      const payload = JSON.stringify(req.body); // stringify once → stored as string
      // Upstash SET via pipeline: [["set","key","value"]]
      await fetch(`${url}/pipeline`, {
        method: 'POST',
        headers: h,
        body: JSON.stringify([['set', 'walnut:data', payload]]),
      });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
