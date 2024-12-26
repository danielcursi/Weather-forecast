function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg
}

function showInfo(json){
    showAlert('')
    document.querySelector('#city_name').value = ''
    document.querySelector('#weather').classList.add('show')
    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`
    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`
    document.querySelector('#temp_description').innerHTML = `${json.description}`
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>ºC</sup>`
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`
}

document.querySelector('#search').addEventListener('submit',async (ev) => {
    ev.preventDefault()

    const cityName = document.querySelector('#city_name').value

    if(!cityName){
        return showAlert('Você precisa digitar uma cidade...')
    }

    const apiKey = "741f6c44fab7b9dcefaa4b571493d5df"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl)
    const json = await results.json()

    if(json.cod === 200){
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity
    
        })
    }else{
        document.querySelector('#weather').classList.remove('show')
        document.querySelector('#city_name').value = ''
        showAlert("Não foi possivel localizar...")
    }
})