export const SAVE_DECK_TITLE = 'SAVE DECK TITLE';
export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_CARD = 'ADD_CARD';


export function saveDeckTitleAction (deckTitle){
    return {
        type: SAVE_DECK_TITLE,
        deckTitle
    }
}

export function getDecksAction (decksList){
    return {
        type: GET_DECKS,
        decksList
    }
}

export function getDeckAction (currentDeck){
    return {
        type: GET_DECK,
        currentDeck
    }
}

export function deleteDeckAction (deckID) {
    return {
        type: DELETE_DECK,
        deckID
    }
}

export function addCardAction (cardData) {
    return {
        type: ADD_CARD,
        cardData
    }
}