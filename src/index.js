import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './components/home';
import WeatherScreen from './components/weather';

const NavigationStack = createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
    Weather: {
      screen: WeatherScreen,
      navigationOptions: {
        headerShown: false,
      }
    },
  });

const Routes = createAppContainer(NavigationStack);

export default Routes;