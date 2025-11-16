'use client';
import { useEffect, useState } from 'react';

const WEATHER_MAP = {
  0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Depositing rime fog', 51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle',
  56: 'Freezing drizzle', 57: 'Freezing drizzle', 61: 'Rain', 63: 'Rain', 65: 'Rain',
  66: 'Freezing rain', 67: 'Freezing rain', 71: 'Snow fall', 73: 'Snow fall', 75: 'Snow fall',
  77: 'Snow grains', 80: 'Rain showers', 81: 'Rain showers', 82: 'Rain showers',
  85: 'Snow showers', 86: 'Snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
};

function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
  return fetch(url).then(r => r.json());
}

export default function Weather() {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    const defaultCoords = { latitude: 40.7128, longitude: -74.0060 }; // NYC fallback
    const load = async (coords) => {
      try {
        const data = await fetchWeather(coords.latitude, coords.longitude);
        const current = data.current;
        const daily = data.daily;
        setState({
          loading: false,
          temp: Math.round(current.temperature_2m),
          code: current.weather_code,
          high: Math.round(daily.temperature_2m_max[0]),
          low: Math.round(daily.temperature_2m_min[0])
        });
      } catch (e) {
        setState({ loading: false, error: 'Failed to load weather' });
      }
    };

    navigator.geolocation?.getCurrentPosition(
      pos => load(pos.coords),
      () => load(defaultCoords),
      { timeout: 3000 }
    );
  }, []);

  if (state.loading) return <div className="text-sm text-gray-500">Loading?</div>;
  if (state.error) return <div className="text-sm text-red-500">{state.error}</div>;

  return (
    <div className="flex items-end justify-between">
      <div>
        <div className="text-4xl font-semibold">{state.temp}?</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{WEATHER_MAP[state.code] ?? '?'}</div>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">H: {state.high}? / L: {state.low}?</div>
    </div>
  );
}
