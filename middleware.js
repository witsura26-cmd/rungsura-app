export const config = {
  matcher: ['/walnut-song.html', '/walnut-songs.js'],
};

const PASSWORD = '1111';
const COOKIE_NAME = 'walnut_song_auth';

export default async function middleware(request) {
  const url = new URL(request.url);
  const cookieHeader = request.headers.get('cookie') || '';
  const hasAuth = cookieHeader.split(';').some(c => c.trim() === `${COOKIE_NAME}=${PASSWORD}`);

  if (hasAuth) return;

  if (request.method === 'POST') {
    const form = await request.formData();
    const entered = form.get('password');
    if (entered === PASSWORD) {
      return new Response(null, {
        status: 302,
        headers: {
          'Location': url.pathname + url.search,
          'Set-Cookie': `${COOKIE_NAME}=${PASSWORD}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return new Response(loginPageHtml(true), { status: 401, headers: { 'content-type': 'text/html; charset=utf-8' } });
  }

  return new Response(loginPageHtml(false), { status: 401, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

function loginPageHtml(wrong) {
  return `<!DOCTYPE html>
<html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Walnut Song</title>
<style>
  body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f9fafb;}
  form{background:#fff;padding:28px 32px;border-radius:16px;box-shadow:0 4px 16px rgba(0,0,0,.08);text-align:center;}
  input{padding:10px 14px;border-radius:10px;border:1px solid #cfe6f5;font-size:16px;margin:12px 0;width:180px;text-align:center;}
  button{padding:10px 24px;border-radius:10px;border:none;background:#4a9fd4;color:#fff;font-weight:700;cursor:pointer;font-size:14px;}
</style></head>
<body>
  <form method="POST">
    <div style="font-size:28px;margin-bottom:4px;">🎼</div>
    <div style="font-weight:700;color:#345f80;margin-bottom:4px;">Walnut Song</div>
    <div style="font-size:12px;color:#999;">ใส่รหัสผ่านเพื่อเข้าดูเนื้อเพลง</div>
    <br>
    <input type="password" name="password" placeholder="รหัสผ่าน" autofocus required inputmode="numeric">
    ${wrong ? '<div style="color:#c0392b;font-size:12px;margin-top:-6px;margin-bottom:8px;">รหัสผ่านผิด ลองใหม่อีกครั้ง</div>' : ''}
    <br><button type="submit">เข้า</button>
  </form>
</body></html>`;
}
