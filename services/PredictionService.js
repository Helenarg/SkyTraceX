export const predictFarmingConditions = (weatherSummary) => {
  const { temp, precip } = weatherSummary;

  // Calculate drought risk based on precipitation
  const droughtRisk = precip < 0.1 ? 100 : 0; // High risk if precipitation is less than 0.1 mm

  // Calculate flood risk based on precipitation
  const floodRisk = precip > 10 ? 100 : 0; // High risk if precipitation exceeds 10 mm

  return {
    droughtRisk,
    floodRisk,
    avgTemp: Math.round(temp), // Average temperature
  };
};

export const predictHourlyRain = (hourlyData) => {
  if (!hourlyData || hourlyData.length < 4) return [];

  const predictions = [];
  const numHours = hourlyData[0]?.coordinates[0]?.dates?.length || 0;

  for (let i = 3; i < numHours; i++) {
    const temp = extractHourly(hourlyData, 't_2m:C', i);
    const humidity = extractHourly(hourlyData, 'relative_humidity_2m:p', i);
    const pressure = extractHourly(hourlyData, 'msl_pressure:hPa', i);
    const windSpeed = extractHourly(hourlyData, 'wind_speed_10m:ms', i);
    const precip = extractHourly(hourlyData, 'precip_1h:mm', i);

    let lagPrecip = 0, lagHumidity = 0;
    for (let lag = 1; lag <= 3; lag++) {
      lagPrecip += extractHourly(hourlyData, 'precip_1h:mm', i - lag) || 0;
      lagHumidity += extractHourly(hourlyData, 'relative_humidity_2m:p', i - lag) || 0;
    }
    lagPrecip /= 3;
    lagHumidity /= 3;

    let linear = 0;
    linear += (precip || 0) * 80;
    linear += ((humidity || 0) / 100) * 15;
    linear += ((1013 - (pressure || 1013)) * 0.1) * 10;
    linear += (temp >= 20 && temp <= 30 ? 10 : (temp < 15 ? -5 : 0));
    linear += (windSpeed > 10 ? -10 : (windSpeed > 2 && windSpeed < 5 ? 5 : 0));
    linear += lagPrecip * 20 + ((lagHumidity / 100) * 10);

    const prob = Math.min(100, Math.max(0, 100 / (1 + Math.exp(-linear / 100))));
    const willRain = prob > 50;
    const hour = new Date(hourlyData[0].coordinates[0].dates[i]?.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    predictions.push({ hour, rainProb: Math.round(prob), willRain, temp, windSpeed, humidity });
  }
  return predictions;
};

export const extractHourly = (hourlyData, parameter, index) => {
  const paramData = hourlyData.find((item) => item.parameter === parameter);
  if (!paramData || !paramData.coordinates[0]?.dates[index]) return null;
  return paramData.coordinates[0].dates[index].value;
};