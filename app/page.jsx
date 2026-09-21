'use client'

import { useEffect, useState } from 'react'
import WeatherCard from './component.jsx'

function App() {
  const [weather, setWeather] = useState(null)

  async function getWeather(location) {
    try {

      // https://geocoding-api.open-meteo.com/v1/search?name=${}&count=1&language=en&format=json

      // https://api.open-meteo.com/v1/forecast?latitude=${}&longitude=${}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto

      setWeather({
        place: "",
        temperature: "",
        feelsLike: "",
        humidity: "",
        windSpeed: "",
        code: "",
      })
    } catch (err) {
      // TODO
    } finally {
      // TODO
    }
  }

  return (
    <main className="p-4">
      <div className="mx-auto max-w-md">
        <form className="mb-4">
          <label htmlFor="city">City or location</label>
          <div>
            <input id="city" placeholder="Singapore" className="border p-1" />
            <button className="border bg-blue-600 p-1 text-white">Search</button>
          </div>
        </form>

        <WeatherCard />
      </div>
    </main>
  )
}

export default App
