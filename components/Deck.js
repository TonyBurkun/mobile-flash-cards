import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { black, white, gray } from '../utils/colors'

export default function Deck(props){

    const { currentDeck } = props;
    const deckTitle = currentDeck.title;
    const questionNumber = currentDeck.questions.length;


    return (
        <View style={styles.oneDeck}>
            <Text style={styles.deckTitle}>
                {deckTitle}
            </Text>
            <View style={styles.questionsBlock}>
                <Text style={styles.text}>{`${questionNumber} questions`}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    oneDeck: {
        borderWidth: 1,
        borderColor: black,
        marginLeft: 15,
        marginRight: 15,
        height: 150,
        marginTop: 20,
        justifyContent: 'center'
    },
    deckTitle: {
        fontWeight: 'bold',
        backgroundColor: gray,
        color: white,
        padding: 10,
        textAlign: 'center'
    },
    questionsBlock: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold'

    }
});
