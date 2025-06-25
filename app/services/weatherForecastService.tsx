export interface WeatherForecast {
    date: string;
    temperatureC: number;
    summary: string;
    temperatureF: number;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

export class WeatherForecastService {
    private baseUrl: string;

    constructor() {
        this.baseUrl =
            process.env.WEATHER_API_URL ||
            "https://appweatherforecastapi.azurewebsites.net";
    }

    async getWeatherForecast(): Promise<ApiResponse<WeatherForecast[]>> {
        try {
            const response = await fetch(`${this.baseUrl}/weatherforecast`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data: WeatherForecast[] = await response.json();

            return {
                data,
                success: true,
                message: "Weather forecast fetched successfully",
            };
        } catch (error) {
            console.error("Error fetching weather forecast:", error);
            return {
                data: [],
                success: false,
                message:
                    error instanceof Error ? error.message : "Unknown error occurred",
            };
        }
    }
}

// Instancia singleton del servicio
export const weatherForecastService = new WeatherForecastService();
