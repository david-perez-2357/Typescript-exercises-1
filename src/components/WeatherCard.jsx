
function returnDayOfTheWeek(date) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    return days[date.getDay()]
}

function dayIsOnThisWeek(date) {
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(7 - today.getDay() + today.getDate())
    return date <= nextWeek
}

export const WeatherCard = ({weather}) => {
    const date = new Date(weather.day);
    console.log(weather.day)
    const dayOfTheWeek = returnDayOfTheWeek(date);
    const isOnThisWeek = dayIsOnThisWeek(date);

    const showDate = () => {
        const today = new Date()
        const tomorrow = new Date(today)
        const yesterday = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        yesterday.setDate(today.getDate() - 1)

        if (date.getDate() === today.getDate()) {
            return "Hoy"
        }

        if (date.getDate() === tomorrow.getDate()) {
            return "Mañana"
        }

        if (date.getDate() === yesterday.getDate()) {
            return "Ayer"
        }

        if (isOnThisWeek) {
            return dayOfTheWeek;
        }

        return date.toLocaleDateString()
    }

    const weatherIcon = () => {
        if (weather.rain > 0) {
            return "rain";
        }else if (weather.temperature > 25) {
            return "sun";
        }else {
            return "cloud";
        }

    }

    return (
        <div className={"rounded-xl bg-blue-100 flex flex-col p-4 pt-0 border-4  " + (showDate() === "Hoy" ? 'border-blue-500' : 'border-blue-300')}>

            <div className="flex justify-center p-4 rounded-lg rounded-t-none bg-white gap-5 items-center">
                {weatherIcon() === "sun" && <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#ffbd00"
                         className="bi bi-sun-fill" viewBox="0 0 16 16">
                        <path
                            d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                    </svg>}

                {weatherIcon() === "rain" && <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#009eff"
                                                  className="bi bi-cloud-drizzle-fill" viewBox="0 0 16 16">
                    <path
                        d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973"/>
                </svg>}

                {weatherIcon() === "cloud" && <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="#ababab" className="bi bi-cloud-fill" viewBox="0 0 16 16">
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
                </svg>}

                <h2 className="text-2xl font-bold text-gray-700">{weather.temperature} ºC</h2>
            </div>

            <div className="flex justify-between mt-3  flex-col gap-1 items-center">
                <span className="text-gray-800 text-xl mb-1 font-semibold">{showDate()}</span>
                <span className="text-gray-800">{weather.rain} mm de lluvia</span>
                <span className="text-gray-800">{weather.humidity}% de humedad</span>
            </div>

        </div>
    )
}