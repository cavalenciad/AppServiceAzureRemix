import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import WeatherForecastComponent from '~/components/WeatherForecast';
import { weatherForecastService } from '~/services/weatherForecastService';

export async function loader({ request }: LoaderFunctionArgs) {
    const result = await weatherForecastService.getWeatherForecast();

    return json({
        forecasts: result.data,
        error: result.success ? null : result.message,
        success: result.success
    });
}

export default function WeatherPage() {
    const { forecasts, error } = useLoaderData<typeof loader>();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <WeatherForecastComponent forecasts={forecasts} error={error || undefined} />
            </div>
        </div>
    );
}
