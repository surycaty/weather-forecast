import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WeatherScreen from './components/weather';
import HomeScreen from './components/home';
import SearchCityScreen from './components/search-city';

const NavigationStack = createStackNavigator({

    Home: {
      screen: HomeScreen,
      navigationOptions: { headerShown: false, }
    },
    Weather: {
      screen: WeatherScreen,
      navigationOptions: { headerShown: false, }
    },
    Search: {
      screen: SearchCityScreen,
      navigationOptions: { headerShown: false, }
    },
  });

const Routes = createAppContainer(NavigationStack);

export default Routes;
