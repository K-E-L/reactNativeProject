import {
    createStackNavigator
} from 'react-navigation';
import {
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import Login from '../components/login';

const AppNavigator = createStackNavigator({
    Login: { screen: Login },
});
const navReducer = createNavigationReducer(AppNavigator);

export default navReducer;
