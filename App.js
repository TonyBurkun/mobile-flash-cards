import React from 'react'
import {StyleSheet, Text, View, Platform, StatusBar} from 'react-native'
import {createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation'
import AddDeck from './components/AddDeck'
import DecksList from './components/DecksList'
import AddCard from './components/AddCard'
import oneDeck from './components/oneDeck'
import {purple, white, black, gray} from './utils/colors'
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {Constants} from 'expo'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'


function CustomStatusBar({backgroundColor, ...props}) {
    return (
        <View style={{backgroundColor, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}


const RouteConfigs = {
    DecksList: {
        screen: DecksList,
        navigationOptions: {
            tabBarLabel: "Decks",
            tabBarIcon: ({tintColor}) => (
                <Ionicons name='md-list-box' size={30} color={tintColor}/>
            )
        }
    },

    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcons name='playlist-plus' size={30} color={tintColor}/>
            )
        }
    },

};


const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },

    tabBarOptions: {
        activeTintColor: Platform.OS === "ios" ? black : black,
        style: {
            height: 56,
            backgroundColor: Platform.OS === "ios" ? white : gray,
            shadowColor: "rgba(0, 0, 0, 0.24)",
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1,
            paddingTop: 5
        },

        indicatorStyle: {
            backgroundColor: black,
        },
    }
};


const Tabs =
    Platform.OS === 'ios'
        ? createBottomTabNavigator(RouteConfigs, TabNavigatorConfig)
        : createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);


const MainNavigator = createStackNavigator({
    home: {
        screen: Tabs,
        navigationOptions: {
            header: null,
        },
    },
    oneDeck: {
        screen: oneDeck,
        navigationOptions: ({navigation}) => ({
            headerTintColor: white,
            headerStyle: {
                backgroundColor: black
            }


        })
    },
    addCard: {
        screen: AddCard,
        navigationOptions: ({navigation}) => ({
            headerTintColor: white,
            title: 'Add Card',
            headerStyle: {
                backgroundColor: black
            }
        })
    }

});


export default class App extends React.Component {


    render() {

        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <CustomStatusBar backgroundColor={black} barStyle="light-content"/>
                    <MainNavigator/>
                </View>
            </Provider>
        );

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
