import {ExerciseContainer} from "../components/ExerciseContainer.jsx";
import {WeatherCard} from "../components/WeatherCard.jsx";

class Weather {
    constructor(day, temperature, rain, humidity) {
        this.day = day;
        this.temperature = temperature;
        this.rain = rain;
        this.humidity = humidity;
    }
}

export const Exercise3 = () => {
    const date = new Date();

    const days = [
        new Date(date.setDate(date.getDate() - 1)).toDateString(),
        new Date(date.setDate(date.getDate() + 1)).toDateString(),
        new Date(date.setDate(date.getDate() + 1)).toDateString(),
        new Date(date.setDate(date.getDate() + 1)).toDateString(),
        new Date(date.setDate(date.getDate() + 1)).toDateString(),
        new Date(date.setDate(date.getDate() + 1)).toDateString(),
        new Date(date.setDate(date.getDate() + 1)).toDateString(),
        new Date(date.setDate(date.getDate() + 1)).toDateString(),
    ]

    const weather = [];

    for (let i in days) {
        weather.push(new Weather(days[i], Math.floor(Math.random() * 20) + 15, Math.floor(Math.random() * 2) * Math.floor(Math.random() * 5), Math.floor(Math.random() * 20) + 60));
    }

    const averageTemperature = weather.reduce((acc, day) => acc + day.temperature, 0) / weather.length;

    return (
        <ExerciseContainer exerciseNumber={3}>
            <h1 className="text-2xl font-bold text-gray-800">Tiempo</h1>
            <p className="text-gray-600">Temperatura promedio de {averageTemperature.toFixed(0)} ºC</p>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-10 mt-5">
                {weather.map((day, index) => (
                    <WeatherCard key={index} weather={day}/>
                ))}
            </div>
        </ExerciseContainer>
    )
}