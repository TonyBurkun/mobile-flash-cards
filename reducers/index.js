import { SAVE_DECK_TITLE, GET_DECKS } from '../actions'

const initialState = {
    decksList: {},
};

function entries (state = initialState, action) {

    console.log('reducer: ', action);

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

        default:
            return state

    }
}

export default entries;