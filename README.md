# Weather Journal App
By using [Geonames](http://www.geonames.org/export/web-services.html) API, [Weatherbit](https://www.weatherbit.io/account/create) API, and [Pixabay](https://pixabay.com/api/docs/) API.
This application allow you to submit your trip destination and departure & return date to get back more details about your destination, such as the expected temperature, the number of days left, a picture of the city, etc.


## Additional features:
- You can display length of trip.
- You can view the forecast for multiple days.


## How to start
- Using terminal clone the repository
```sh
$ git clone https://github.com/LamaAlhirbish/travel-app
```
- Enter the repository folder
```sh
$ cd travel-app
```
- Install dependencies.
```sh
$ npm install.
```
- Build dist folder.
```sh
$ npm run build
```
- Run the application.
```sh
$ npm run start
```
- Using your browser go to http://localhost:6543 and here you are


### Geonames URL
geonamesURL = http://api.geonames.org/searchJSON?name_equals=
geonamesKey = &username=lliillhhll

### Weatherbit URL
WeatherbitAPI = https://api.weatherbit.io/v2.0/forecast/daily?lat=
weatherbitKey = &key=fe2cca109a1843feb206f2111ea294d9&lon=

### Pixabay URL
pixabayURL = https://pixabay.com/api/?image_type=photo&q=
pixabayKey = &key=5247586-0cea9f794014bc37cec4b0622
