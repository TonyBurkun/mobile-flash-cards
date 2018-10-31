import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { black, white } from '../utils/colors'
import { saveDeckTitle, getDecks, clearDecks} from '../utils/api'
import { connect } from 'react-redux'
import { saveDeckTitleAction } from '../actions'



class AddDeck extends Component {
    state = {
        nameDeck: ''
    };

    nameDeck = (text) => {
        this.setState({
            nameDeck: text
        })
    };

    handleSubmitBtn = () => {
        const {nameDeck} = this.state;

        saveDeckTitle(nameDeck)
            .then(this.props.dispatch(saveDeckTitleAction(nameDeck)));



        this.setState({
            nameDeck: ''
        });

        this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'DecksList'}));

    };

    handleRemoveBtn = () => {
        clearDecks();
        getDecks();
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <KeyboardAvoidingView behavior="padding" style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={styles.title}>What is the title of your new deck?</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.nameDeck(text)}
                        placeholder="Enter a title of the Deck"
                        value={this.state.nameDeck}
                    />
                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.handleSubmitBtn}
                    >
                        <Text style={styles.submitBtnText}>CREATE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.submitBtn}
                        onPress={this.handleRemoveBtn}
                    >
                        <Text style={styles.submitBtnText}>REMOVE STORAGE</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
};


const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginTop: 40,
        padding: 20,
        textAlign: 'center'
    },
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
    submitBtn: {
        height: 40,
        alignSelf: 'stretch',
        marginRight: 15,
        marginLeft: 15,
        marginTop: 15,
        padding: 10,
        backgroundColor: black
    },
    submitBtnText: {
        color: white,
        alignSelf: 'center'
    }

});



function mapStateToProps(store){
    // console.log('Add Deck connect: ', store);

    return {

    }
}


export default connect(mapStateToProps)(AddDeck)
