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
            .then( result => {
                console.log('DecksList :', result );
                dispatch(getDecksAction(JSON.parse(result)))
            })
    }

    render () {

        const {decksList} = this.props;
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
                            <Deck currentDeck={decksList[item]}/>
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
    return {
        decksList: store.decksList,
        question: store.question,
        data: store.data
    }
}

export default connect(mapStateToProps)(DecksList)