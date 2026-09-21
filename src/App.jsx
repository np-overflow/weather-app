import { useEffect, useState } from 'react'
import WeatherCard from './component.jsx'

function App() {
  const [city, setCity] = useState('Singapore')
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function getWeather(location) {
    setIsLoading(true)
    setError('')

    try {
      const placeResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`,
      )
      const placeData = await placeResponse.json()
      const place = placeData.results?.[0]

      if (!place) throw new Error('City not found. Try another search.')

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`,
      )
      const weatherData = await weatherResponse.json()

      if (!weatherResponse.ok) throw new Error('Weather is unavailable right now.')

      setWeather({
        place: `${place.name}${place.country ? `, ${place.country}` : ''}`,
        temperature: Math.round(weatherData.current.temperature_2m),
        feelsLike: Math.round(weatherData.current.apparent_temperature),
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: Math.round(weatherData.current.wind_speed_10m),
        code: weatherData.current.weather_code,
      })
    } catch (err) {
      setWeather(null)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getWeather(city)
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const nextCity = city.trim()
    if (nextCity) getWeather(nextCity)
  }

  return (
    <main className="p-4">
      <div className="mx-auto max-w-md">
        <form onSubmit={handleSubmit} className="mb-4">
          <label htmlFor="city">City or location</label>
          <div>
            <input id="city" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Singapore" className="border p-1" />
            <button className="border bg-blue-600 p-1 text-white">Search</button>
          </div>
        </form>

        {isLoading && <p className="p-4">Loading weather…</p>}
        {error && <p className="border p-3">{error}</p>}
        {weather && !isLoading && <WeatherCard weather={weather} />}
      </div>
    </main>
  )
}

export default App
