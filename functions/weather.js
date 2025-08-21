// Cloudflare Pages Function: /api/weather
// This function acts as a secure proxy to the OpenWeatherMap API.
// It reads the API key from environment variables and never exposes it to the client.

export async function onRequest(context) {
  // Get the city from the query string
  const { searchParams } = new URL(context.request.url);
  const city = searchParams.get('city');
  if (!city) {
    return new Response(JSON.stringify({ error: 'City is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get the API key from environment variables
  const apiKey = context.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Build the OpenWeatherMap API URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  // Fetch weather data from OpenWeatherMap
  const apiRes = await fetch(url);
  const data = await apiRes.json();
  return new Response(JSON.stringify(data), {
    status: apiRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
