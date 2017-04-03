import React from 'react';
import Card from './Card';
import mockData from 'constants/mockData';

const KEYCODE_ENTER = 13;

import 'styles/main.scss';

export default class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = { filter: '' };
  }

  keyHandle(event) {
    if (event.keyCode === KEYCODE_ENTER) {
      const { value } = this.refs.filterInput;
      if (value !== this.state.filter) {
        this.setState({ filter: value });
      }
    }
  }

  filterCardsData() {
    let { filter } = this.state;
    filter = filter.trim();
    if (filter.trim() === '') return mockData;

    const regex = new RegExp(filter, 'i');
    return mockData.filter(({name, types}) => {
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
          <i className='search-icon' />
        </div>
        {
          this.filterCardsData().map((d, i) => (
            <Card {...d} key={i} />
          ))
        }
      </div>
    );
  }
}
