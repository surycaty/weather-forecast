import React from 'react';
import { PermissionsAndroid, FlatList } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import Card from './card';
import { weatherConditions } from '../utils/weather-conditions';
import Geolocation from '@react-native-community/geolocation';
import { WeatherAPI } from '../utils/weather-api';
import Toast from 'react-native-simple-toast';
import WeatherModel from '../models/weather.model';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/EvilIcons';
import SideBar from './side-bar';
import Drawer from 'react-native-drawer';

export default class HomeScreen extends React.Component {

  weatherApi = new WeatherAPI();
  listIdCities= [];
  state = {
    isLoading: false,
    locals: [],
    error: null,
    refreshing: false,
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('listCities');
      if (value !== null) {
        console.log(value);
      }
    } catch (error) {
      console.log("papocou foi tudo")
    }
  };

  componentDidMount() {

    this._retrieveData();
    //TODO: TESTS
    // this.listIdCities.push('6320062');
    // this.listIdCities.push('524901');
    // this.listIdCities.push('703448');

    // this.listIdCities.push('2643743');
    // this.listIdCities.push('6325494');
    // this.listIdCities.push('2962943');
    
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

      this.getLocalsWeather(granted);

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

  fetchWeather(lat = -3.72, lon = -38.52) {
    fetch(this.weatherApi.getEndpointCurrentLocation(lat, lon),)
    .then(res => res.json())
    .then(json => {
      this.setState({
        locals: [new WeatherModel(json)],
        isLoading: false,
        refreshing: false,
      });
    })
    .catch(error => {
      Toast.show('Error Gettig Weather Condtions')
    });
  }

  getLocalsWeather = (granted) => {
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      if(this.listIdCities.length > 0) {
        this.fetchLocalsWeather(this.listIdCities.join(','));
      }

    } else {
      console.log('GPS permission denied');
    }
  }

  fetchLocalsWeather(cities) {
    fetch(this.weatherApi.getEndpointCities(cities),)
    .then(res => res.json())
    .then(json => {
      json.list.forEach(element => {
        this.state.locals.push(new WeatherModel(element))
      });
    })
    .catch(error => {
      console.log(error)
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

closeControlPanel = () => {
  this._drawer.close()
};
openControlPanel = () => {
  this._drawer.open()
};
  render() {
    return (
      <Drawer 
        side="right"
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}

        >
        <Header>
          <MaterialCommunityIcons onPress={() => this.openControlPanel()} name="navicon" size={26} 
            color="#fff" style={{marginRight: 6}} />
        </Header>

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
                  <Card item={item}
                    weather={weatherConditions['pt-br'][item.weather.main]}
                  />
                )}
              />
            </Container>
          </ThemeProvider>

          <ActionButton buttonColor="rgba(0,0,0, 0.6)" 
            onPress={()=>console.log("clicado")} />
         
      </Drawer>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Titlebar = styled.View`
  width: 100%;
  margin-top: 26px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  align-items: flex-end;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 500;
  color: #b8bece;
`;

const Header = styled.View`
  background-color: #000;
  align-items: flex-end;
  height: 24px;
`;