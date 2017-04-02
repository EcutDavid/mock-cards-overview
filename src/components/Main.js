import React from 'react';
import Card from './Card';
import faker from 'faker';

const KEYCODE_ENTER = 13;

import 'styles/main.scss';

const mockData = [{
  types: []
}, {
  types: []
}, {
  types: []
}, {
  types: []
}, {
  types: []
}];

const LARGEST_DISCOUNT = 95;
const MAX_TYPE_COUNT = 4;
for (const element of mockData) {
  element.name = faker.commerce.productName();
  // At least 5% discount...
  element.discountPercentage = Number.parseInt(Math.random() * LARGEST_DISCOUNT) + 5;

  // Atleast 1 type exist...
  const typeCount = Number.parseInt(Math.random() * MAX_TYPE_COUNT) + 1;
  for (let i = 0; i < typeCount; i++) {
    if (!element.types) element.types = [faker.commerce.product()];
    element.types.push(faker.commerce.product());
  }

}

class AppComponent extends React.Component {
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

export default AppComponent;
