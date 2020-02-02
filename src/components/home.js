import React from 'react';
import { View, Button, Text, StyleSheet, PermissionsAndroid } from 'react-native';
import { API_KEY } from '../utils/WeatherAPIKey';
import Geolocation from '@react-native-community/geolocation';


export default class HomeScreen extends React.Component {

  state = {
    isLoading: false,
    temperature: 0,
    localName: null,
    weatherCondition: null,
    error: null
  };
  
  componentDidMount() {

    this.pegaPermissao();    
  
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
  
          Geolocation.getCurrentPosition(
            position => { 
              this.fetchWeather(position.coords.latitude, position.coords.longitude);
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
          console.log("Retorno", json);
          this.setState({
            temperature: json.main.temp,
            localName: json.name,
            weatherCondition: json.weather[0].main,
            isLoading: false
          });
        });
    }
  
    render() {
      const { isLoading, weatherCondition, temperature, localName } = this.state;
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          {isLoading ? <Text>Fetching The Weather</Text> 
          : 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
          <Text>{localName} - {temperature}</Text>
            </View>
            <Text>Home ;D</Text>
            <Button 
              title="Ir para Weather"
              onPress={() => navigate('Weather', {weather: weatherCondition, temperature: temperature}) }
            />
          </View>
          }
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

HomeScreen.navigationOptions = {
  title: 'Home',
}
