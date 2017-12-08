import React from 'react';
import ReactDOM from 'react-dom';
var createReactClass = require('create-react-class');

// DEPRECATED class creation via variable required from 'create-react-class'
const Sidebar = createReactClass({

  // lifecircle method
  // to focus on input bar when 'New Deck' button is clicked
  componentDidUpdate() {
    // el means element
    var el = ReactDOM.findDOMNode(this.refs.add);
    if (el) el.focus();
  },
  render() {
    let props = this.props;

    return (
      <div className='Sidebar'>
        <h2>All Decks </h2>

        <button onClick={ e => this.props.showAddDeck() }> New Deck </button>

          <ul>
          {props.decks.map((deck, i) => 
            <li key={i}> {deck.name} </li>
          )}
          </ul>
        {/* if props.addingDeck than...*/}
          { props.addingDeck && <input ref='add' onKeyPress={this.createDeck} /> }
      </div>
    );
  },
  createDeck(evt) {
    // if event not Enter key
    if (evt.which !== 13) return;

    // else Get the value of event (key pressed)
    var name = ReactDOM.findDOMNode(this.refs.add).value;
    this.props.addDeck(name);
    this.props.hideAddDeck();
  }
});

export default Sidebar;