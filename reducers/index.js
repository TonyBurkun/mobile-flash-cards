import {
    SAVE_DECK_TITLE,
    GET_DECKS,
    GET_DECK,
    DELETE_DECK,
    ADD_CARD
} from '../actions'

const initialState = {
    decksList: {}
};

function entries (state = initialState, action) {

    switch (action.type) {
        case SAVE_DECK_TITLE:
            return {
                ...state,
                decksList: {
                    ...state.decksList,
                    [action.deckTitle]: {
                        title: action.deckTitle,
                        questions: [],
                    }
                }


            };

        case GET_DECKS:
            return{
                ...state,
                decksList: {
                    ...action.decksList,
                }
            };

        case GET_DECK:
            return {
                ...state,
                currentDeck: action.currentDeck
            };

        case DELETE_DECK:

            const decksList = {...state.decksList};
            delete decksList[action.deckID];

            return {
                ...state,
                decksList: decksList
            };

        case ADD_CARD:

            const { deckID, question } = action.cardData;

            return {
                ...state,
                decksList: {
                    ...state.decksList,
                    [deckID]: {
                        ...state.decksList[deckID],
                        questions: [
                            ...state.decksList[deckID].questions,
                            question

                        ]
                    }
                }

            };

        default:
            return state

    }
}

export default entries;