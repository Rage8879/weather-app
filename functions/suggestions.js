// Cloudflare Pages Function: /suggestions
// This function fetches city suggestions from the OpenWeatherMap API.

export async function onRequest(context) {
  // CORS headers
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight requests
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Get the query from the URL
  const { searchParams } = new URL(context.request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return new Response(JSON.stringify({ error: 'Query is required' }), {
      status: 400,
      headers: corsHeaders,
    });
  }

  // Get the API key from environment variables
  const apiKey = context.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not set' }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  try {
    // Build the OpenWeatherMap API URL for city suggestions
    const url = `https://api.openweathermap.org/data/2.5/find?q=${encodeURIComponent(query)}&type=like&sort=population&cnt=5&appid=${apiKey}`;

    // Fetch suggestions from OpenWeatherMap
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    
    return new Response(JSON.stringify(data), {
      status: apiRes.status,
      headers: corsHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch suggestions' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
