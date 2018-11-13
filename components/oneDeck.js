import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {gray, black, white, red} from '../utils/colors'
import {connect} from 'react-redux'
import {getDeck, deleteDeck} from '../utils/api'
import { getDeckAction, deleteDeckAction }  from '../actions'
import { NavigationActions } from 'react-navigation'

class oneDeck extends Component {


    static navigationOptions = (props) => {

        const title = props.navigation.state.params.deckID;
        return {title: `${title}`}

    };



    handleAddCard = () => {
        const {deckID} = this.props;
        this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'addCard', params: {deckID: deckID}}));
    };

    handleStartQuiz = () => {

        this.props.navigation.dispatch(NavigationActions.navigate({
            routeName: 'quiz',
            params: {
                questionNumber: 0,
                deckID: this.props.deckID,
            }
        }));
    };

    handleDeleteDeck = () => {

        const {deckID} = this.props;
        this.props.dispatch(deleteDeckAction(deckID));
        this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'DecksList'}));

        deleteDeck(deckID);
    };



    render () {

        const {questions, title} = this.props;
        const cardsLength = questions.length;


        return (
            <View style={styles.mainView}>
                <View style={styles.cardsBlock}>
                    <View>
                        <Text style={styles.deckTitle}>
                            {title}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.cardsTitle}>
                            { `${cardsLength} cards`}
                        </Text>
                    </View>
                </View>
                <View style={styles.buttonBlock}>
                    <TouchableOpacity
                        style={styles.btnPosition}
                        onPress={this.handleAddCard}
                    >
                        <Text style={[styles.whiteBtn, styles.customBtn]}>ADD CARD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnPosition}
                        onPress={this.handleStartQuiz}
                    >
                        <Text  style={[styles.blackBtn, styles.customBtn]}>START QUIZ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnPosition}
                        onPress={this.handleDeleteDeck}
                    >
                        <Text  style={[styles.customBtn, styles.linkBtn]}>DELETE DECK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 50,
        marginBottom: 100,
    },
    deckTitle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: black
    },
    cardsTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: gray,
    },
    buttonBlock:{

    },
    btnPosition: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    customBtn: {
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontWeight: 'bold',

    },
    whiteBtn: {
        color: black,
        backgroundColor: white,
        borderColor: black,
    },
    blackBtn: {
        color: white,
        backgroundColor: black,
        borderColor: black,
        overflow: 'hidden',
    },
    linkBtn: {
        color: red,
        borderWidth: 0
    }


});


function mapStateToProps (store, {navigation}) {
    const {deckID} = navigation.state.params;
    const currentDeck = store.decksList[deckID];
    return {
        deckID,
        questions: currentDeck === undefined ? [] : currentDeck.questions,
        title: currentDeck === undefined ? '' : currentDeck.title,
    }
}

export default connect(mapStateToProps)(oneDeck)
