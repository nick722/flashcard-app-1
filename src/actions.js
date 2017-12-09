// Action creators
// export const addDeck = name => ({ type: 'ADD_DECK', data: name });
// export const showAddDeck = name => ({ type: 'SHOW_ADD_DECK', data: name });
// export const hideAddDeck = name => ({ type: 'HIDE_ADD_DECK', data: name });
export const addDeck = name => ({ type: 'ADD_DECK', data: name });
export const showAddDeck = () => ({ type: 'SHOW_ADD_DECK' });
export const hideAddDeck = () => ({ type: 'HIDE_ADD_DECK' });