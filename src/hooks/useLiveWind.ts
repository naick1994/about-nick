import { useEffect, useState } from 'react';

// Tarifa, Spain — the kite mecca, and where Nicholas is based.
const TARIFA_LAT = 36.0128;
const TARIFA_LON = -5.6079;

export type WindReading = {
  speedKn: number;
  directionDeg: number;
  gustsKn: number;
  temperatureC: number;
};

type WindState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; data: WindReading };

// Real, live wind conditions for Tarifa, fetched once on mount from
// Open-Meteo (no API key, CORS-friendly, no attribution requirements for
// this kind of light client-side use). Not a decorative animation input,
// an actual current reading.
export function useLiveWind(): WindState {
  const [state, setState] = useState<WindState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${TARIFA_LAT}&longitude=${TARIFA_LON}&current=wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_2m&wind_speed_unit=kn&timezone=auto`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('bad response');
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        const c = json.current;
        setState({
          status: 'ready',
          data: {
            speedKn: c.wind_speed_10m,
            directionDeg: c.wind_direction_10m,
            gustsKn: c.wind_gusts_10m,
            temperatureC: c.temperature_2m,
          },
        });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' });
      });

    return () => { cancelled = true; };
  }, []);

  return state;
}
