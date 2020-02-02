import React from 'react';
import { View, Button, Text, StyleSheet, PermissionsAndroid, FlatList } from 'react-native';
import { API_KEY } from '../utils/WeatherAPIKey';
import Geolocation from '@react-native-community/geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { MaterialCommunityIcons } from '@expo/vector-icons';

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

      const list = [
        {
          key: 'Fortaleza',
          subtitle: 'Fortaleza-CE',
          icon: 'weather-cloudy',
          temperature: 30
        },
        {
          key: 'Sao Paulo',
          subtitle: 'São Paulo', 
          icon: 'weather-sunny',
          temperature: 25
        },
      ]

      return (
        <View style={styles.container}>
          {isLoading ? <Text>Fetching The Weather</Text> 
          : 
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.listCity}>
              <Text>{localName} - {temperature}</Text>
            </View>
            <View style={styles.container}>
              <FlatList style={{ flex:1}}
                data={list}
                renderItem={({item}) => 
                  <View style={{ flex:1, backgroundColor: '#456'}}>
                    <MaterialCommunityIcons.Button size={48} name={item.icon} color={'#fff'}
                    onPress={() => navigate('Weather', {weather: weatherCondition, temperature: temperature}) }>
                      <Text>{item.subtitle}</Text>
                    </MaterialCommunityIcons.Button>
                  </View>
                }
              />
            </View>
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
    },
    listCity: {
      backgroundColor: '#456'
    }
  });

HomeScreen.navigationOptions = {
  title: 'Home',
}
