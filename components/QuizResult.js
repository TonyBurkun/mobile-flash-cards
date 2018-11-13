import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {white, black, green, red} from '../utils/colors'

export default function QuizResult (props) {

    handleRestart = () => {
        const {deckID} = props.navigation.state.params;
        props.navigation.navigate('quiz', {deckID: deckID, questionNumber: 0,});
    };

    handleBackToDeck = () => {
        const {deckID} = props.navigation.state.params;
        props.navigation.navigate('oneDeck', {deckID: deckID});


    };



    return (
        <View style={styles.mainView}>
            <View style={styles.statisticBlock}>
                <View style={styles.statisticItem}>
                    <Text style={[styles.statisticNumber, {color: green}]}>{props.navigation.state.params.correct}</Text>
                    <Text style={styles.statisticText}>correct answers</Text>
                </View>
                <View style={styles.statisticItem}>
                    <Text style={[styles.statisticNumber, {color: red}]}>{props.navigation.state.params.incorrect}</Text>
                    <Text style={styles.statisticText}>incorrect answers</Text>
                </View>

            </View>

            <View>
                <TouchableOpacity
                    style={styles.btnPosition}
                    onPress={this.handleRestart}
                >
                    <Text style={[styles.customBtn, styles.blackBtn]}>RESTART QUIZ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnPosition}
                    onPress={this.handleBackToDeck}
                >
                    <Text style={[styles.customBtn, styles.blackBtn]}>BACK TO DECK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 100,
    },
    statisticBlock: {
        flex: 2,
        justifyContent: 'center',
    },

    statisticItem: {
        marginTop: 15
    },
    statisticText: {
        textAlign: 'center',
        fontSize: 24
    },
    statisticNumber: {
        fontSize: 80,
        fontWeight: 'bold',
        textAlign: 'center',
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
        fontWeight: 'bold'
    },
    blackBtn: {
        color: white,
        backgroundColor: black,
        borderColor: black,
        overflow: 'hidden',
    },
});

