const weatherTypes = {
  0: ['☀️', 'Clear sky'], 1: ['🌤️', 'Mainly clear'], 2: ['⛅', 'Partly cloudy'], 3: ['☁️', 'Overcast'],
  45: ['🌫️', 'Foggy'], 48: ['🌫️', 'Foggy'], 51: ['🌦️', 'Light drizzle'], 53: ['🌦️', 'Drizzle'],
  55: ['🌧️', 'Heavy drizzle'], 61: ['🌧️', 'Light rain'], 63: ['🌧️', 'Rain'], 65: ['🌧️', 'Heavy rain'],
  71: ['🌨️', 'Light snow'], 73: ['🌨️', 'Snow'], 75: ['❄️', 'Heavy snow'], 80: ['🌦️', 'Rain showers'],
  81: ['🌧️', 'Rain showers'], 82: ['⛈️', 'Heavy showers'], 95: ['⛈️', 'Thunderstorm'],
}

export default function WeatherCard({ weather }) {
  const [icon, description] = weatherTypes[weather.code] ?? ['🌡️', 'Current weather']

  return (
    <section className="mt-4 border p-4">
      <p>{weather.place}</p>
      <div className="my-4 flex items-center gap-4">
        <span className="text-4xl" role="img" aria-label={description}>{icon}</span>
        <div><p className="text-4xl">{weather.temperature}°</p><p>{description}</p></div>
      </div>
      <div className="grid grid-cols-3 border-t pt-4">
        <Detail label="Feels like" value={`${weather.feelsLike}°`} />
        <Detail label="Humidity" value={`${weather.humidity}%`} />
        <Detail label="Wind" value={`${weather.windSpeed} km/h`} />
      </div>
    </section>
  )
}

function Detail({ label, value }) {
  return <div><p>{value}</p><p className="text-sm">{label}</p></div>
}
