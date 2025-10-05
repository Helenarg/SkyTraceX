export const extractLatest = (data, parameter) => {
  const paramData = data.find((item) => item.parameter === parameter);
  if (paramData && paramData.coordinates[0]?.dates.length > 0) {
    return paramData.coordinates[0].dates[0].value;
  }
  return null;
};

export const computeMetrics = (data, role) => {
  const temp = extractLatest(data, 't_2m:C');
  const windSpeed = extractLatest(data, 'wind_speed_10m:ms');
  const precip = extractLatest(data, 'precip_1h:mm');
  const pressure = extractLatest(data, 'msl_pressure:hPa');
  const humidity = extractLatest(data, 'relative_humidity_2m:p');

  const sunriseGMT = extractLatest(data, 'sunrise:sql');
  const sunsetGMT = extractLatest(data, 'sunset:sql');
  const sunrise = sunriseGMT ? new Date(sunriseGMT).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;
  const sunset = sunsetGMT ? new Date(sunsetGMT).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  let roleData = {};
  let roleAlert = null;

  if (role === 'farmer') {
    const soilMoisture = extractLatest(data, 'soil_moisture_index_-15cm:idx');
    roleData = { irrigationNeed: soilMoisture < 0.3 ? 'Irrigation needed' : 'Optimal' };
    roleAlert = soilMoisture < 0.3 ? 'Irrigation needed' : null;
  } else if (role === 'fisherman') {
    const waveHeight = extractLatest(data, 'significant_wave_height:m');
    roleData = { waveTideSafety: waveHeight > 2 ? 'Rough seas' : 'Safe' };
    roleAlert = waveHeight > 2 ? 'Rough seas' : null;
  }

  return {
    summary: { temp, windSpeed, precip, pressure, humidity },
    sunrise,
    sunset,
    roleAlert,
    ...roleData,
    hourly: data,
  };
};