export const SAVE_DECK_TITLE = 'SAVE DECK TITLE';
export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';


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