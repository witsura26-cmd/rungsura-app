// Cloud sync — Upstash Redis REST API
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const url   = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return res.status(500).json({ error: 'Redis not configured' });

  const h = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  // GET — load all walnut data from Redis
  if (req.method === 'GET') {
    try {
      const r = await fetch(`${url}/get/walnut:data`, { headers: h });
      const d = await r.json();
      const value = d.result ? JSON.parse(d.result) : null;
      return res.status(200).json({ data: value });
    } catch (e) {
      return res.status(200).json({ data: null });
    }
  }

  // POST — save data to Redis (merges with existing, preserves keys not in body)
  if (req.method === 'POST') {
    try {
      // Read existing data first so we don't accidentally wipe keys
      const existing = await fetch(`${url}/get/walnut:data`, { headers: h })
        .then(r => r.json())
        .then(d => d.result ? JSON.parse(d.result) : {})
        .catch(() => ({}));
      // Merge: incoming body wins for its keys, existing preserved for others
      const merged = Object.assign({}, existing, req.body);
      const payload = JSON.stringify(merged);
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
