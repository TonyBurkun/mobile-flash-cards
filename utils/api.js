import { AsyncStorage } from 'react-native'
import {STORAGE_KEY} from './helpers'



export function saveDeckTitle (title) {

    const savedStructure = {
        [title]: {
            title: title,
            questions: [],
        }
    };

    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(savedStructure))
}

export function getDecks() {

    return AsyncStorage.getItem(STORAGE_KEY, (error, result) => {
        console.log('Error: ', error);
        console.log('getDecks result: ', result);
    })
}

export function clearDecks() {
    return AsyncStorage.clear();
}

export function getDeck(deckID) {
   return getDecks()
        .then( (response) => {
            response = JSON.parse(response);
            return response[deckID]
        })
}

export function createNewStorageByKey(key, data) {
    return  AsyncStorage.setItem(key, JSON.stringify(data));
}

export function deleteDeck(deckID) {
    getDecks()
        .then( response => {

            response = JSON.parse(response);
            delete response[deckID];
            createNewStorageByKey(STORAGE_KEY,response);
        })
}