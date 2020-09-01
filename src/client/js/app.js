// Global variables
let cityBox = document.getElementById('cityName');
let deDateBox = document.getElementById('departureDate');
let reDateBox = document.getElementById('retrunDate');

const today = new Date();
const monthsNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const warning = document.getElementById('warning');

const trips = document.querySelector('.tripList');


// Date generator
const dateGenerator = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }

    date = `${yyyy}-${mm}-${dd}`;
    return date;
}


// Set the date of today as the min date of departureDate box
const minDeDateBox = () => {
    const minDeDate = dateGenerator(today);
    deDateBox.setAttribute("min", minDeDate);
}
minDeDateBox();


// Set the date of departure date as the min date of returnDate box
const minReDateBox = () => {
    deDateBox.addEventListener('input', () => {
        console.log('::Min return date value has been updated::');
        const deDate = new Date(deDateBox.value);
        const minReDate = dateGenerator(deDate);
        reDateBox.setAttribute("min", minReDate);
    })
}
minReDateBox();


// Check if the user entered the values
const Verification = (city, deDate, reDate) => {
    if (city == "" || deDate == "" || reDate == "") {
        warning.innerText = '* Please enter the city and the departure date';
        return 0;
    } else {
        warning.style.display = "none";
        return 1;
    }
}


// Get full date
const fullDate = (date) => {
    const newDate = new Date(date);
    const fullNewDate = `${newDate.getDate()} ${monthsNames[newDate.getMonth()]} ${newDate.getFullYear()}`;
    return fullNewDate;
}


// Get full HTML date
const HTMLDate = (date) => {
    const newDate = new Date(date);
    const newDay = newDate.getDate();
    let sup;

    if (newDay === 1) {
        sup = 'st';
    } else if (newDay === 2) {
        sup = 'nd';
    } else if (newDay === 3) {
        sup = 'rd';
    } else {
        sup = 'th';
    }

    const HTMLDate = `${newDate.getDate()}<sup>${sup}</sup> ${monthsNames[newDate.getMonth()]} ${newDate.getFullYear()}`;
    return HTMLDate;
}


// Get weather index from 0 to 15
const getIndex = (array, date, starterValue) => {
    if (starterValue === 15) {
        return 15;
    } else {
        for (let i = starterValue; i < array.length; i++) {
            if (array[i]["valid_date"] === date) {
                return i;
            }
        }
        return 15;
    }
}


// Get array of weather
const getWeatherArray = (array, deIndex, reIndex) => {
    let tripWeather = [];
    for (let i = deIndex; i <= reIndex; i++) {
        tripWeather.push({
            date: array[i].valid_date,
            low_temp: array[i].low_temp,
            max_temp: array[i].max_temp,
        })
    }
    return tripWeather;
}


// Create weather list
const weatherList = (weatherArray) => {
    const list = document.createElement('ul');

    for (let i = 0; i < weatherArray.length; i++) {
        let item = document.createElement('ul');
        item.setAttribute('class', 'weatherList');
        item.innerHTML = 
                `<li> ${HTMLDate(weatherArray[i].date)} </li>
                <li> Low ${weatherArray[i].low_temp} </li>
                <li> High ${weatherArray[i].max_temp} </li>`;
        list.appendChild(item);
    }
    return list;
}


// Function to count difference in days
const differenceInDays = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    const differenceInMilliseconds = date2.getTime() - date1.getTime();
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    console.log(`Difference in days: ${differenceInDays}`);
    return differenceInDays;
}


// Today || Tomorrow || in days
const daysLeft = (differenceInDays) => {
    if (differenceInDays === 0) {
        return 'today';
    } else if (differenceInDays === 1) {
        return 'tomorrow';
    } else {
        return `in ${differenceInDays} days`;
    }
}


// Length of the trip
const length = (differenceInDays) => {
    if (differenceInDays === 0) {
        return 'You will be back on the same day';
    } else if (differenceInDays === 1) {
        return `The trip will take ${differenceInDays} day`;
    } else {
        return `The trip will take ${differenceInDays} days`;
    }
}


// Submit button event listener to get and process data
const submission = async (event) => {
    event.preventDefault();

    // Variables
    const city = cityBox.value;
    const deDate = deDateBox.value;
    const reDate = reDateBox.value;
    
    // Check if the user entered the values
    if (Verification(city, deDate, reDate) === 1) {
        
        // To get full departure & return date
        const fullDeDate = fullDate(deDate);
        const HTMLDeDate = HTMLDate(deDate);
        console.log(`Departure Date: ${fullDeDate}`);
        const fullReDate = fullDate(reDate);
        console.log(`Return Date: ${fullReDate}`);

        // COUNTDOWN how many days left for the trip from TODAY
        console.log(today);
        console.log(fullDeDate);
        console.log(fullReDate);

        const countdown = daysLeft(differenceInDays(today, fullDeDate));
        // Length of the trip
        const tripLength = length(differenceInDays(fullDeDate, fullReDate));

        // Geonames API
        const citiesInfo = await getCitiesInfo(process.env.geonamesURL, process.env.geonamesKey, city);
        
        const coordinates = {
            latitude: citiesInfo.geonames['0'].lat,
            longitude: citiesInfo.geonames['0'].lng
        }

        // Weatherbit API
        const weather = await getWeather(process.env.WeatherbitAPI, process.env.weatherbitKey, coordinates.latitude, coordinates.longitude);

        // Get Index
        const deIndex = getIndex(weather["data"], deDate, 0);
        const reIndex = getIndex(weather["data"], reDate, deIndex);

        const weatherArray = getWeatherArray(weather["data"], deIndex, reIndex);

        // Pixabay API
        const photo = await getPhoto(process.env.pixabayURL, process.env.pixabayKey, city);

        const data = await postData('/tripInfo', {
            country: citiesInfo.geonames['0'].countryName,
            city_name: weather.city_name,
            weather_array: weatherArray,
            photo: photo.hits[0].webformatURL,
            departure_date: fullDeDate,
            HTML_departure_date: HTMLDeDate,
            return_date: fullReDate,
            countdown: countdown,
            trip_length: tripLength
        });

        // Update UI
        updateUI();
    }
}


// Function to GET cities info from Geonames API
const getCitiesInfo = async (geonamesURL, geonamesKey, city) => {
    const res = await fetch (geonamesURL + city + geonamesKey);
    try {
        const data = await res.json();
        return data;
    } catch(err) {
        console.log("error geonames API ", err);
    }
}


// Function to GET weather from Weatherbit API
const getWeather = async (WeatherbitAPI, weatherbitKey, lat, lng) => {
    const res = await fetch (WeatherbitAPI + lat + weatherbitKey + lng);
    try {
        const data = await res.json();
        return data;
    } catch(err) {
        console.log("error weatherbit API ", err);
    }
}


// Function to GET photo from Pixabay API
const getPhoto = async (pixabayURL, pixabayKey, city) => {
    const res = await fetch (pixabayURL + city + pixabayKey);
    try {
        const data = await res.json();
        return data;
    } catch(err) {
        console.log("error pixabay API ", err);
    }
}


// Function to POST data
const postData = async ( url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
        const newData = await res.json();
        return newData;
    } catch(err) {
        console.log("error POST data ", err);
    }
}


// Function to GET data
const getData = async () => {
    const req = await fetch('/allData');
    try{
        const newData = await req.json();
        return newData;
    } catch (err) {
        console.log("error getData ", err);
    }
}


// Function to GET Project Data and update UI
const updateUI = async () => {
    try {
        const allData = await getData();

        console.log('::updateUI::');

        const weather = weatherList(allData.weather_array);
        
        const cardData = `<div id ="outputData">
            <p id="outputCity"> Your trip to ${allData.city_name}, ${allData.country} </p>
            <p> on ${allData.HTML_departure_date} </p>
            <p> You will travel to ${allData.city_name} ${allData.countdown} </p>
            <p> ${allData.trip_length} </p>
            <p id="outputWeather"> Typical weather is: </p>
            <p id="outputTemp"> </p>
        </div>
        
        <div id ="outputImg">
            <img src="${allData.photo}" alt="${allData.city_name} id="cityImg">
        </div>`;

        
        const trip = document.createElement('li');
        trip.setAttribute('class', 'card');

        trip.innerHTML = cardData;
        
        // Update UI
        trips.insertBefore(trip, trips.firstChild);

        document.getElementById('outputTemp').appendChild(weather);

        // Scroll to view
        const card = document.querySelector('.card');
        card.scrollIntoView();
        
    } catch (err) {
        console.log("error updateUI ", err);
    }
}

export { submission,
differenceInDays,
daysLeft }
