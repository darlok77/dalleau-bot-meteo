const request = require('request');

module.exports = class BotMeteo {
  constructor (name) {
    this.name = name;
  }

  /**
   * Initialize
   * @return {string} body
   */
  init (callback) {
    const options = {
      'method': 'GET',
      'url': 'https://api.openweathermap.org/data/2.5/weather',
      'qs': {
        'q': this.name,
        'APPID': 'your-APPID',//change
        'lang': 'fr',
        'units': 'metric'
      },
      'headers': {
        'accept': 'application/json',
        'x-ibm-client-secret': 'your-client-secret',//change
        'x-ibm-client-id': 'your-client-id'//change
      }
    };

    request(options, (err, res, body) => {
      if (err) {
        throw err;
      }
      callback(body);
      return body;
    });
  }

  /**
   * Run
   * @return {BotYoutube} 
   */
  run () {
    let sync = true;

    this.init(result => {
      this.json = JSON.parse(result);
      sync = false;
    });
    while (sync) {
      require('deasync').sleep(100);
    }
  }
  /**
   * getJson
   * @return {string} this.json
   */
  getJson () {
    return this.json;
  }
  /**
   * getWeather
   * @return {string} description
   */
  getWeatherDesc () {
    return this.json.weather[0].description;
  }
  /**
   * getTemperature
   * @return {string} temperature
   */
  getTemperature () {
    return this.json.main.temp;
  }
  /**
   * getTemperature
   * @return {string} temperature
   */
  getCity() {
    return this.json.name;
  }
};
