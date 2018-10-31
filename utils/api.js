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