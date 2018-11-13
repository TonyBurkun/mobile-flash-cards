import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect} from 'react-redux'
import {green, red, white, black, gray} from '../utils/colors'
import FlipCard from 'react-native-flip-card'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {

    state = {
        correct: 0,
        incorrect: 0,
        flip: false,
        showAnswerTitle: 'CHECK ANSWER'

    };

    handleFlip = () => {

        this.setState({
            flip: !this.state.flip,
        });

        if (this.state.flip) {
            this.setState({
                showAnswerTitle: 'CHECK ANSWER',
            })
        } else {
            this.setState({
                showAnswerTitle: 'HIDE ANSWER',
            })
        }

    };

    checkQuestionNumber = () => {

        let number = this.props.navigation.state.params.questionNumber || 0;
        const { totalQuestionNumber } = this.props;


        number = ++number;

        if (number === totalQuestionNumber) {

            const { correct, incorrect } = this.state;


            clearLocalNotification()
                .then(setLocalNotification);





            this.setState({
                correct: 0,
                incorrect: 0
            }, () => {
                this.props.navigation.dispatch(NavigationActions.navigate({
                    routeName: 'quizResult',
                    params: {
                        correct: correct,
                        incorrect: incorrect,
                        deckID: this.props.deckID,
                    }
                }));
            });

        } else {
            this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'quiz', params: {questionNumber: number}}));
        }
    };



    handleCorrectBtn = () => {
        let {correct} = this.state;

        this.setState({
            correct: ++correct
        }, () => {
            this.checkQuestionNumber();
        });



    };

    handleIncorrectBtn = () => {
        let {incorrect} = this.state;

        this.setState({
            incorrect: ++incorrect
        }, () => {
            this.checkQuestionNumber();
        });


    };





    render () {

        const { decksList, deckID, totalQuestionNumber } = this.props;
        let currentQuestionNumber = this.props.navigation.state.params.questionNumber;
        const questionText = decksList[deckID].questions.length ? decksList[deckID].questions[currentQuestionNumber].question : '';
        const questionAnswer = decksList[deckID].questions.length ? decksList[deckID].questions[currentQuestionNumber].answer : '';

        currentQuestionNumber = ++currentQuestionNumber;

        return (
            <View style={{flex: 1}} >

                {decksList[deckID].questions.length === 0 && (
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyText}>SORRY, YOU CANNOT TAKE A QUIZ BECAUSE THERE ARE NO CARDS IN THE DECK.</Text>
                    </View>
                )}

                {decksList[deckID].questions.length !== 0 && (
                    <View style={styles.mainView}>
                        <View style={styles.counterBlock}>
                            <Text style={styles.counterText}>{`${currentQuestionNumber} / ${totalQuestionNumber}`}</Text>
                        </View>
                       <View>
                           <FlipCard
                               style={styles.flipBlock}
                               flipHorizontal={true}
                               clickable={false}
                               flipVertical={false}
                               flip={this.state.flip}
                               perspective={500}
                           >
                               <ScrollView style={[styles.cardSide, styles.faceSide]}>
                                   <Text style={styles.questionText}>{questionText}</Text>
                               </ScrollView>
                               <ScrollView style={[styles.cardSide, styles.faceSide]}>
                                   <Text style={styles.questionText}>{questionAnswer}</Text>
                               </ScrollView>
                           </FlipCard>
                           <TouchableOpacity
                               style={styles.btnPosition}
                               onPress={this.handleFlip}
                           >
                               <Text
                                   style={[styles.showAnswerBtn]}
                               >{this.state.showAnswerTitle}</Text>
                           </TouchableOpacity>
                       </View>



                        <View style={styles.buttonBlock}>
                            <TouchableOpacity
                                style={styles.btnPosition}
                                onPress={this.handleCorrectBtn}
                            >
                                <Text
                                    style={[styles.customBtn, styles.greenBtn]}
                                >CORRECT</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnPosition}
                                onPress={this.handleIncorrectBtn}
                            >
                                <Text
                                    style={[styles.customBtn, styles.redBtn]}
                                >INCORRECT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}


            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 100,
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
    counterBlock: {
        marginLeft: 15
    },
    counterText: {
        textAlign: 'left',
        fontSize: 22,
        fontWeight: 'bold'
    },
    flipBlock: {
        flex: 1,
        borderWidth: 1,
        borderColor: black,
        flexBasis: '50%',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
    },
    cardSide: {
        flex: 1,
        // justifyContent: 'center',
    },
    faceSide: {},
    backSide: {},
    tips: {
        textAlign: 'center',
        color: gray,
        marginTop: 5,
    },
    questionText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold'

    },
    buttonBlock: {},
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
    greenBtn: {
        color: white,
        backgroundColor: green,
        borderColor: green,
        overflow: 'hidden',
    },
    redBtn: {
        color: white,
        backgroundColor: red,
        borderColor: red,
        overflow: 'hidden',
    },
    showAnswerBtn: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: gray
    }
});



function mapStateToProps(store, {navigation}) {
    const { deckID } = navigation.state.params;
    const totalQuestionNumber = store.decksList[deckID].questions.length;

    return {
        deckID,
        totalQuestionNumber,
        decksList: store.decksList
    }
}


export default connect(mapStateToProps)(Quiz)