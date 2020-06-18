import React from 'react';
import styled from 'styled-components/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { TouchableOpacity, FlatList, TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { WeatherAPI } from '../utils/weather-api';
import WeatherModel from '../models/weather.model';


export default class SearchCityScreen extends React.Component {

  weatherApi = new WeatherAPI();
  state = {
    query: '',
    locals: [],
    error: null,
    listIdCities: []
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('listCities');
      console.log("retrieve", value)
      if (value !== null) {
        var arrIds = value.split(',')
        let cities = this.state.listIdCities
        arrIds.forEach(element => cities.push(element))
        this.setState({listIdCities: cities})
        console.log("lista de ids", this.state.listIdCities)
        console.log("--passou", this.state.listIdCities)
      this.getLocalsWeather();
      }
    } catch (error) {
      console.log("papocou foi tudo: não tem cidades")
    }
  };

  componentDidMount() {

    console.log("--comecou", this.state.listIdCities)
    this._retrieveData();
    console.log("--terminou")
  }

  getLocalsWeather = () => {
    console.log("Lecal", this.state.listIdCities)
    if(this.state.listIdCities.length > 0) {
      this.fetchLocalsWeather(this.state.listIdCities.join(','));
      console.log("locals",this.state.locals)
    }
  }

  fetchLocalsWeather = async(cities) => {
    await fetch(this.weatherApi.getEndpointCities(cities),)
    .then(res => res.json())
    .then(json => {
      let items = []
      json.list.forEach(element => {
        items.push(new WeatherModel(element))
      });
      this.setState({locals: items})
    })
    .catch(error => {
      console.log(error)
      Toast.show('Error Gettig Weather Condtions')
    });
  }

  filterCity = (cityName) => {
    console.log("FilterCity:", cityName)
    if(cityName && cityName.length > 3) {
      console.log("FilterCity:", cityName)
      let arr = [
        {code: 6320062, city: "Fortaleza"}, {code: 524901, city: "São Paulo"}, {code: 703448, city: "Santos"}]

      return arr;
    }
  }

  addCity = async(code) => {

    try {
      let listIdCities = await AsyncStorage.getItem('listCities');

      if (listIdCities !== null) {

        var arrIds = listIdCities.split(',')

        let hasItem = false
        arrIds.forEach(item => {
          if(item == code) {
            hasItem = true
          }
        })

        if(hasItem) {
          Toast.show('Cidade já cadastrada!')
        } else {
          listIdCities = listIdCities.concat(',').concat(code)
        }
      } else {
        listIdCities = code
        console.log("listCities created!", listIdCities)
      }

      await AsyncStorage.setItem('listCities', listIdCities.toString())

      if(!hasItem) {
        this.setState({query: ""});
      }
            
    } catch (error) {
      console.log("Error get Storage", error)
    }
  }

  render() {

    console.log("render", this.state)
    const { query } = this.state;
    const data = this.filterCity(query);

    console.log("query", query)
    console.log("data", data)
    return (
      <View>
        <Header>
          <Autocomplete
            data={data}
            defaultValue={query}
            onChangeText={text => this.setState({ query: text })}
            renderItem={({ item, i }) => (
              <TouchableOpacity onPress={() => this.setState({ query: item })}>
                <Title onPress={() => this.addCity(item.code) } >{item.city}</Title>
              </TouchableOpacity>
            )}
          />
        </Header>
        <Container> 
          <Text>List of Cities</Text>
          <FlatList
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                  data={this.state.locals}
                  renderItem={({ item }) => (<Title>{item.name}</Title>)} />
        </Container>
      </View>
    );
  }
}


const Header = styled.View`
  color: #3c4560;
  font-size: 28px;
  font-weight: 600;
  position: absolute;
  right:0;
  left:0;
  z-index: 1
`;

const Container = styled.View`
  color: #3c4560;
  font-size: 28px;
  font-weight: 600;
  top:50px;
  margin-right: 10;
  margin-left: 10;
`;

const Title = styled.Text`
  color: #3c4560;
  font-size: 28px;
  font-weight: 600;
`;