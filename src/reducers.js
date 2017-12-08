// Pass a CARDS REDUCER (function) with previous state and an action
export const cards = (state, action) => {
  // Deciding what to do depending on what action happend
  switch (action.type) {

    case 'ADD_CARD':
      // Create a new Object based on another one
      let newCard = Object.assign({}, action.data, {
        score: 1,
        // Unique id based on number, made of current date
        id: +new Date
      });

      // Add new card to state
      return state.concat([newCard]);

    // If we receive an action, that we haven't planned for
    default: 
      // return the curren state
      // Or when store creates for the first time ->
      // -> return an empty object
      return state || [];
  }
};

export const decks = (state, action) => {
  switch (action.type) {
    case 'ADD_DECK':
      let newDeck = { name: action.data, id: +new Date };
      return state.concat([newDeck]);
    default: 
      return state || [];
  }
};

export const addingDeck = (state, action) => {
  switch (action.type) {
    case 'SHOW_ADD_DECK': return true;
    case 'HIDE_ADD_DECK': return false;
    default: return !!state;// "!!" converts undefined to false
  }
};