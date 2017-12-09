import React from 'react';
import ReactDOM from 'react-dom';
// connet is used to connect mapping functions to 
// presentational component
import { connect } from 'react-redux';
import { addDeck, showAddDeck, hideAddDeck } from '../actions';
import { Link } from 'react-router-dom';
var createReactClass = require('create-react-class');

// Takes the current state object from the store and
// return data that presentational component
// will need
// Parameters are taken from the state
const mapStateToProps = ({decks, addingDeck}) => ({
  decks,
  addingDeck
}); 

// Map dispatch function to 3 callbacks for Sidebar
const mapDispatchToProps = dispatch => ({
  addDeck: name => dispatch(addDeck(name)),
  showAddDeck: () => dispatch(showAddDeck()),
  hideAddDeck: () => dispatch(hideAddDeck())
});

// DEPRECATED class creation via variable required from 'create-react-class'
// Sidebar is a presentational component
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
            <li key={i}> 
            <Link to={`/deck/${deck.id}`}> {deck.name} </Link>
            </li>
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

// Exporting container component
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);