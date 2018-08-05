import AuthUser from './authuserComponent';
import Collec from './collecComponent';
import Comment from './commentComponent';
import Convo from './convoComponent';
import Convos from './convosComponent';
import Followers from './followersComponent';
import Followings from './followingsComponent';
import Images from './imagesComponent';
import Login from './loginComponent';
import Messagable from './messagableComponent';
import Moji from './mojiComponent';
import MojiChoose from './mojiChooseComponent';
import Mojis from './mojisComponent';
import Notifs from './notifsComponent';
import PriMojis from './priMojisComponent';
import PubMojis from './pubMojisComponent';
import SearchMoji from './searchMojiComponent';
import SearchUser from './searchUserComponent';
import TabBar from './tabBarComponent';
import User from './userComponent';

// import: navigator
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// export: user navigator
export const UserStackNavigator = createStackNavigator({
    AuthUser: { screen: AuthUser },

    Followings: { screen: Followings },
    Followers: { screen: Followers },
    User: { screen: User },
    
    Notifs: { screen: Notifs },
    Collec: { screen: Collec },
    PubMojis: { screen: PubMojis },
    PriMojis: { screen: PriMojis },
    SearchUser: { screen: SearchUser }
}, {
    initialRouteName: 'AuthUser',
    headerMode: 'screen'
});

// export: convo navigator
export const ConvoStackNavigator = createStackNavigator({
    Convos: { screen: Convos },
    Convo: { screen: Convo },
    
    // User: { screen: User },
    // Followings: { screen: Followings },
    // Followers: { screen: Followers },
    
    Messagable: { screen: Messagable }
}, {
    initialRouteName: 'Convos',
});

// export: moji navigator
export const MojiStackNavigator = createStackNavigator({
    MojiChoose: { screen: MojiChoose },
    
    Mojis: { screen: Mojis },
    Moji: { screen: Moji },
    Comment: { screen: Comment },
    
    // User: { screen: User },
    // Followings: { screen: Followings },
    // Followers: { screen: Followers },

    SearchMoji: { screen: SearchMoji },
    Images: { screen: Images }
}, {
    initialRouteName: 'MojiChoose',
});

export const TabNav = createBottomTabNavigator({
    Convos: { screen: ConvoStackNavigator },
    Users: { screen: UserStackNavigator },
    Mojis: { screen: MojiStackNavigator }
}, {
    initialRouteName: 'Users',
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom'
});
