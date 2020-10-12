const api = {
    key: 'a4b8d5ed861c786d1137d1526c1a77b4',
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchBox = document.querySelector('.search-box')

const searchButton = document.querySelector("button");
searchButton.addEventListener('click',function (){
    fetch(`${api.baseurl}weather?q=${searchBox.value}&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults)
})

function displayResults (weather){
    try{
        let city = document.querySelector('.location .city')
    city.innerHTML = `${weather.name}, ${weather.sys.country}`

    let now = new Date()
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp/10)}<span>&#176;c</span>`

    let discription = document.querySelector('.current .weather')
    discription.innerHTML = `${weather.weather[0].description}`

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `${Math.round(weather.main.temp_min/10)}&#176;c / ${Math.round(weather.main.temp_max/10)}&#176;c`

    let latitude = document.querySelector('.other .latlong .latitude')
    latitude.innerHTML = `${weather.coord.lat}`
    let longitude = document.querySelector('.other .latlong .longitude')
    longitude.innerHTML = `${weather.coord.lon}`

    let speed = document.querySelector('.other .wind .speed')
    speed.innerHTML = `${weather.wind.speed}`
    let degree = document.querySelector('.other .wind .degree')
    degree.innerHTML = `${weather.wind.deg/10}`
    
    let rise = document.querySelector('.sun .rise')
    let sunrise = weather.sys.sunrise
    rise.innerHTML = `${new Date(sunrise*1000)}`
    let set = document.querySelector('.sun .set')
    let sunset = weather.sys.sunset
    set.innerHTML = `${new Date(sunset*1000)}`


function dateBuilder (d){
    let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Satruday"]
    let day = days[d.getDay()];
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`

    }
    
}catch(err){
    let date = document.querySelector('.location .date');
    date.innerText = ''
        let city = document.querySelector('.location .city')
    city.innerHTML = ""

    let discription = document.querySelector('.current .weather')
    discription.innerHTML = ""

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = ''

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = 'No city with ' + searchBox.value
}
}
