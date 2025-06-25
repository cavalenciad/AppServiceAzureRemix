import type { WeatherForecast } from '~/services/weatherForecastService';

interface WeatherForecastProps {
    forecasts: WeatherForecast[];
    error?: string;
}

export default function WeatherForecastComponent({ forecasts, error }: WeatherForecastProps) {
    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    if (forecasts.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No weather data available.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-center text-4xl font-bold text-gray-200 mb-6">Weather Forecast</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {forecasts.map((forecast, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {new Date(forecast.date).toLocaleDateString()}
                            </h3>
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {forecast.temperatureC}°C
                            </div>
                            <div className="text-sm text-gray-500 mb-3">
                                ({forecast.temperatureF}°F)
                            </div>
                            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {forecast.summary}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
