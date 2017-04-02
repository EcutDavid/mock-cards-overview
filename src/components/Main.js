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

    return mockData.filter(({name, types}) => {
      if (name.indexOf(filter) !== -1) return true;
      if (types.some(d => d.indexOf(filter) !== -1)) return true;
    });
  }

  render() {
    return (
      <div className="index">
        <input
          type='text'
          placeholder='input'
          onKeyUp={this.keyHandle.bind(this)}
          ref='filterInput'
        />
        {
          this.filterCardsData().map((d, i) => (
            <Card {...d} key={i} />
          ))
        }
      </div>
    );
  }
}
