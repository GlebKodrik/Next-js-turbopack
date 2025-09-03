import { NextRequest, NextResponse } from 'next/server';

async function fetchWithProxy(
  request: NextRequest,
  context: { params: Promise<{ proxy: Array<string> }> },
  requestBody?: BodyInit,
) {
  const { proxy } = await context.params;
  const apiPath = proxy.join('/');
  const targetUrl = `${process.env.NEXT_PUBLIC_LMS_PROXY_URL}/${apiPath}`;

  const incomingHeaders = new Headers(request.headers);
  const deviceId = incomingHeaders.get('deviceid');

  const proxyHeaders = new Headers();
  proxyHeaders.set('deviceid', deviceId ?? '');

  const apiResponse = await fetch(targetUrl, {
    method: request.method,
    headers: proxyHeaders,
    body: requestBody,
    credentials: 'include',
  });

  const responseHeaders = new Headers(apiResponse.headers);
  const setCookieHeader = responseHeaders.get('set-cookie');

  if (setCookieHeader && !process.env.NEXT_PUBLIC_APP_URL?.includes('https')) {
    responseHeaders.set(
      'set-cookie',
      setCookieHeader.replace(/Domain=[^;]+;?/gi, ''),
    );
  }

  const responseBody = await apiResponse.arrayBuffer();

  return new NextResponse(responseBody, {
    status: apiResponse.status,
    headers: responseHeaders,
  });
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ proxy: Array<string> }> },
) {
  const requestBody = await request.text();
  return fetchWithProxy(request, context, requestBody);
}
