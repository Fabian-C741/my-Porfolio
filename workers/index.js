export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Endpoint de demo: /api/hello
    if (url.pathname.startsWith('/api/hello')) {
      return new Response(JSON.stringify({ ok: true, msg: 'Hello from Worker' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Endpoint de ejemplo para llamar a una API externa que requiere secreto.
    // El secreto vive solo del lado del servidor (wrangler secret put SECRET_API_KEY).
    if (url.pathname.startsWith('/api/proxy')) {
      // Reemplaza API_URL por la API real que necesites
      const API_URL = 'https://api.example.com/data';
      const resp = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${env.SECRET_API_KEY}` }
      });
      if (!resp.ok) {
        return new Response(JSON.stringify({ ok: false, status: resp.status }), {
          status: resp.status,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      const json = await resp.json();
      return new Response(JSON.stringify(json), { headers: { 'Content-Type': 'application/json' } });
    }

    return new Response('Not found', { status: 404 });
  }
}