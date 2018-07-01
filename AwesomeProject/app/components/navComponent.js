import Authuser from './authuserComponent';
import Convo from './convoComponent';
import Convos from './convosComponent';
import Followers from './followersComponent';
import Followings from './followingsComponent';
import Login from './loginComponent';
import Mojis from './mojisComponent';
import User from './userComponent';

// import: navigator
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// export: user navigator
export const UserStackNavigator = createStackNavigator({
    Authuser: { screen: Authuser },
    User: { screen: User },
    Followings: { screen: Followings },
    Followers: { screen: Followers }
}, {
    initialRouteName: 'Authuser',
});

// export: convo navigator
export const ConvoStackNavigator = createStackNavigator({
    Convos: { screen: Convos },
    Convo: { screen: Convo },
    User: { screen: User },
    Followings: { screen: Followings },
    Followers: { screen: Followers }
}, {
    initialRouteName: 'Convos',
});

// export: moji navigator
export const MojiStackNavigator = createStackNavigator({
    Mojis: { screen: Mojis }
}, {
    initialRouteName: 'Mojis',
});

// export: tab navigator
export const TabNavigator = createBottomTabNavigator({
    Convos: { screen: ConvoStackNavigator },
    Profile: { screen: UserStackNavigator },
    Mojis: { screen: MojiStackNavigator }
}, {
    initialRouteName: 'Profile',
    tabBarPosition: 'bottom'
});
