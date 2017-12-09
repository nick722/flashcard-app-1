import React from 'react';
import ReactDOM from 'react-dom';
// connet is used to connect mapping functions to 
// presentational component
import { connect } from 'react-redux';
import { addDeck, showAddDeck, hideAddDeck } from '../actions';
import { Link } from 'react-router';
var createReactClass = require('create-react-class');

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
const Sidebar = createReactClass({
  componentDidUpdate() {
    var el = ReactDOM.findDOMNode(this.refs.add);
    if (el) el.focus();
  },
  render() {
    let props = this.props;

    return (
      <div className='Sidebar'>
        <h2>All Decks </h2>
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