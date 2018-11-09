import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import {getDecks} from '../utils/api'
import { getDecksAction } from '../actions'
import { connect } from 'react-redux'
import Deck from '../components/Deck'

class DecksList extends Component{
    componentDidMount(){
        const { dispatch } = this.props;

        getDecks()
            .then( response => {
                console.log(response);
                dispatch(getDecksAction(JSON.parse(response)))
            })
    }

    // shouldComponentUpdate (nextProps) {
    //
    //     console.log('!!!!!', nextProps);
    //
    //     return true
    // };

    render () {

        const { decksList } = this.props;
        // console.log('RENDER Deck List: ', JSON.stringify(decksList));
        const decksListKeysArr = Object.keys(decksList).sort((a,b) => {
            return a > b
        });



        return (
            <View style={styles.scrollBlock}>

                {decksListKeysArr.length === 0 && (
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>NOTHING TO SHOW YET</Text>
                    </View>
                )}

                <FlatList
                    data = {decksListKeysArr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ ({item}) => {

                        return (
                            <Deck currentDeck={decksList[item]}
                                  navigation={this.props.navigation}

                            />
                        )
                    }}
                >

                </FlatList>i
            </View>
        )
    }
}


const styles = StyleSheet.create({
    scrollBlock: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        flexBasis: '100%'
    },
    emptyText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,

    },


});

function mapStateToProps(store) {
    // console.log('STORE DecksList: ', store);
    // console.log('decksList', store.decksList);

    return {
        decksList: store.decksList,
    }
}

export default connect(mapStateToProps)(DecksList)