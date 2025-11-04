addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  const searchParams = url.searchParams;
  const params = searchParams.get('params');
  const imageUrl_b64 = searchParams.get('url_b64');

  if (!params || !imageUrl_b64) {
    return new Response('Missing params or url_b64', { status: 400 });
  }

  const imageUrl = atob(imageUrl_b64);

  const cfUrl = `https://gallery.tahmidul612.com/cdn-cgi/image/${params}/${imageUrl}`

  return Response.redirect(cfUrl, 302);
}
