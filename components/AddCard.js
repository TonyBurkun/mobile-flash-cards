import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native'
import {white, black} from '../utils/colors'
import {NavigationActions} from 'react-navigation'
import {connect} from 'react-redux'
import { addCardAction} from '../actions'
import {getDecks, clearDecks, createNewStorageByKey} from '../utils/api'
import {STORAGE_KEY} from '../utils/helpers'


class AddCard extends Component {

    state = {
        question: '',
        answer: ''
    };

    handleSubmit = () => {
        console.log('PRESS SUBMIT');

        const { question, answer } = this.state;
        const { deckID } = this.props;


        if (question && answer) {

            let questionData = {
                deckID,
                question: {
                    question: question,
                    answer: answer
                }
            };


            this.props.dispatch(addCardAction(questionData));

            getDecks()
                .then(response => {
                    response = JSON.parse(response);
                    response[deckID].questions.push(questionData.question);

                    clearDecks()
                        .then(() => {
                            createNewStorageByKey(STORAGE_KEY, response)
                        })
                });

            this.setState({
                question: '',
                answer: ''
            });

            this.props.navigation.dispatch(NavigationActions.back());
        } else {
            Alert.alert('Notice', 'In order to add the new card you have to fill out the question and answer fields',);
        }







    };


    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.inputsBlock}>
                    <TextInput
                        style={styles.input}
                        placeholder="Question"
                        value={this.state.question}
                        onChangeText={(text) => this.setState({question: text})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Answer"
                        value={this.state.answer}
                        onChangeText={(text) => this.setState({answer: text})}
                    />
                </View>

                <TouchableOpacity
                    style={styles.btnPosition}
                    onPress={this.handleSubmit}
                >
                    <Text style={[styles.customBtn, styles.blackBtn]}>SUBMIT</Text>
                </TouchableOpacity>

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
    inputsBlock: {},
    input: {
        marginTop: 40,
        height: 40,
        alignSelf: 'stretch',
        marginRight: 15,
        marginLeft: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: black,
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

function mapStateToProps (store, {navigation}) {

    const {deckID} = navigation.state.params;
    return {
        deckID,
        decksList: store.decksList
    }
}


export default connect (mapStateToProps)(AddCard)