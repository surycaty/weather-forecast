import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WeatherScreen from './components/weather';
import HomeScreen2 from './components/home2';

const NavigationStack = createStackNavigator({
  Home: {
    screen: HomeScreen2,
    navigationOptions: { headerShown: false },
  },
  Weather: { screen: WeatherScreen },
});

const Routes = createAppContainer(NavigationStack);

export default Routes;
