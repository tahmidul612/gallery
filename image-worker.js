addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  if (path !== '/img') {
    return new Response('Not found', { status: 404 })
  }

  const searchParams = url.searchParams;
  const params = searchParams.get('params');
  const imageUrl = searchParams.get('url');

  if (!params || !imageUrl) {
    return new Response('Missing params or url', { status: 400 });
  }

  const cfUrl = `https://gallery.tahmidul612.com/cdn-cgi/image/${params}/${imageUrl}`

  const imageRequest = new Request(cfUrl, {
    headers: request.headers
  })

  return fetch(imageRequest)
}
