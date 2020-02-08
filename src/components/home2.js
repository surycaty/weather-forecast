import React from 'react';
import { PermissionsAndroid, FlatList } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import Card from './Card';
import { weatherConditions } from '../utils/weather-conditions';
import Geolocation from '@react-native-community/geolocation';
import { API_KEY } from '../utils/weather-api-key';

export default class HomeScreen2 extends React.Component {
  state = {
    isLoading: false,
    locals: [],
    error: null,
    refreshing: false,
  };

  componentDidMount() {
    this.getPermission();
  }

  async getPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Libera o GPS ai',
          message: 'Ei mah, deixa ai vai lá',
          buttonNegative: 'Aidento',
          buttonPositive: 'Arrocha',
        },
      );

      this.getPositionWeather(granted);

    } catch (err) {
      console.warn(err);
    }
  }

  getPositionWeather = (granted) => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          this.fetchWeather(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        () => {
          this.setState({
            error: 'Error Gettig Weather Condtions',
          });
        },
      );
    } else {
      console.log('GPS permission denied');
    }
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`,
    )
    .then(res => res.json())
    .then(json => {
      const arrItem = [
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
          weatherCondition: 'Clear',
        },
        {
          key: '1234',
          subtitle: 'São Paulo',
          temperature: 25,
          weatherCondition: 'Rain',
        },
      ];

      this.setState({
        temperature: json.main.temp,
        localName: json.name,
        weatherCondition: json.weather[0].main,
        locals: arrItem,
        isLoading: false,
        refreshing: false,
      });
    })
    .catch(error => {
      Toast.show('Error Gettig Weather Condtions')
    });
  }

  theme = {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  };

  onRefresh = () => {
    console.log("refreshing");

    this.getPermission();

    return true;
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <Container>
          <Titlebar>
            <Title>Weather Forecast</Title>
          </Titlebar>
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            data={this.state.locals}
            renderItem={({ item }) => (
              <Card
                key={item.key}
                city={item.subtitle}
                temperature={item.temperature}
                weather={weatherConditions[item.weatherCondition]}
              />
            )}
          />
        </Container>
      </ThemeProvider>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;
const Titlebar = styled.View`
  width: 100%;
  margin-top: 30px;
  padding-left: 60px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
`;
const Title = styled.Text`
  font-size: 40px;
  font-weight: 500;
  color: #b8bece;
`;
