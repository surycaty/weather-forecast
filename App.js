import React from 'react';
import { StyleSheet, Text, View, Animated, PermissionsAndroid } from 'react-native';

import { API_KEY } from './utils/WeatherAPIKey';

  import Weather from './components/Weather';

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null
  };
//-23.6478872,-46.7642939
componentDidMount() {

  this.pegaPermissao();    

    //console.log('Navigator', navigator.geolocation);
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this.fetchWeather(-23.6478872,-46.7642939);
    // //     // this.fetchWeather(position.coords.latitude, position.coords.longitude);
    //   },
    //   error => {
    //     this.setState({
    //       error: 'Error Gettig Weather Condtions'
    //     });
    //   }
    // );
  }

  async pegaPermissao() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          title: "Parmissao GPS",
          message: "deixa ai va la",
          buttonNegative: "Nao",
          buttonPositive: "Sim"
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the GPS');
        await navigator.geolocation.getCurrentPosition(
          position => {
            this.fetchWeather(-23.6478872,-46.7642939);
        //     // this.fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          error => {
            this.setState({
              error: 'Error Gettig Weather Condtions'
            });
          }
        );
      } else {
        console.log('GPS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  fetchWeather(lat = 25, lon = 25) {
     fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <Text>Fetching The Weather</Text> : <Weather weather={weatherCondition} temperature={temperature} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});