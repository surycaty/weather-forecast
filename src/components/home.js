import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { FlatList, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_KEY } from '../utils/WeatherAPIKey';
import { weatherConditions } from '../utils/WeatherConditions';

export default class HomeScreen extends React.Component {

  state = {
    isLoading: false,
    locals: [],
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
        const arrItem= [
          {
            key: json.id.toString(), 
            subtitle: json.name,
            temperature: Math.round(json.main.temp),
            weatherCondition: json.weather[0].main,
          },
          {
            key: '123',
            subtitle: 'Fortaleza-CE',
            temperature: 30,
            weatherCondition: 'Clear'
          },
          {
            key: '1234',
            subtitle: 'São Paulo',
            temperature: 25, 
            weatherCondition: 'Rain'
          },
        ]

        this.setState({
          temperature: json.main.temp,
          localName: json.name,
          weatherCondition: json.weather[0].main,
          locals: arrItem,
          isLoading: false
        })

      });
  }

  render() {

    const { isLoading, locals } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.main}>
        {isLoading ? <Text>Fetching The Weather</Text> 
        : 
          <View style={styles.container}>
            <FlatList
              data={locals}
              renderItem={({item}) => 
                <View style={styles.listItem}>
                  <MaterialCommunityIcons.Button 
                    size={48}
                    color={'#EEE'}
                    name={weatherConditions[item.weatherCondition].icon} 
                    onPress={() => 
                      navigate('Weather', {weather: item.weatherCondition, temperature: item.temperature}) }>
                    <Text style={styles.textItem}>{item.subtitle} - {item.temperature}°</Text>
                  </MaterialCommunityIcons.Button>
                </View>
              }
            />
          </View>
        }
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
  },
  listItem: { 
    flex:1, 
    backgroundColor: '#456'
  },
  textItem: {
    color:'#EEE', 
    fontSize:18, 
    fontWeight:"bold"
  }
});

HomeScreen.navigationOptions = {
  title: 'Home',
}
