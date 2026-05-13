// Cloud sync for Walnut data — reads/writes to Upstash Redis
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return res.status(500).json({ error: 'Redis not configured' });

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  // GET /api/sync — load all walnut data from cloud
  if (req.method === 'GET') {
    try {
      const r = await fetch(`${url}/get/walnut:data`, { headers });
      const d = await r.json();
      const value = d.result ? JSON.parse(d.result) : null;
      return res.status(200).json({ data: value });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // POST /api/sync — save walnut data to cloud
  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      await fetch(`${url}/set/walnut:data`, {
        method: 'POST',
        headers,
        body: JSON.stringify(JSON.stringify(body)), // Redis stores strings
      });
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
