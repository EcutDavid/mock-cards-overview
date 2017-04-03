import React from 'react';
import Card from './Card';
import mockData from 'constants/mockData';

const KEYCODE_ENTER = 13;

import 'styles/main.scss';

export default class AppComponent extends React.Component {
  constructor() {
    super();
    // Should use deepcopy in real life application to prevent mockData src modified.
    this.state = { filter: '', cards: mockData, presentedCardCount: 0 };
  }

  componentDidMount() {
    let { cards, presentedCardCount } = this.state;

    const presentCard = () => {
      if (presentedCardCount !== cards.length) {
        cards[presentedCardCount++].shouldPresent = true;
        this.setState(cards);
        setTimeout(presentCard, 100);
      }
    };
    setTimeout(presentCard, 50);
  }

  updateFilter() {
    const { value } = this.refs.filterInput;
    if (value !== this.state.filter) {
      this.setState({ filter: value });
    }
  }

  keyHandle(event) {
    if (event.keyCode === KEYCODE_ENTER) {
      this.updateFilter();
    }
  }

  filterCardsData() {
    let { filter, cards } = this.state;
    filter = filter.trim();
    if (filter === '') return cards;

    const regex = new RegExp(filter, 'i');
    return cards.filter(({name, types}) => {
      if (regex.test(name)) return true;
      if (types.some(d => regex.test(d))) return true;
    });
  }

  render() {
    return (
      <div className="index">
        <div className='filter-input'>
          <input
            type='text'
            placeholder='Search coupons e.g. Amazon'
            onKeyUp={this.keyHandle.bind(this)}
            ref='filterInput'
          />
          <i className='search-icon' onClick={this.updateFilter.bind(this)} />
        </div>
        <div className='cards-container'>
          {
            this.filterCardsData().map((d, i) => (
              <Card {...d} key={i} />
            ))
          }
        </div>
      </div>
    );
  }
}
