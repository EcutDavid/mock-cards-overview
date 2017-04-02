import React from 'react';

import 'styles/card.scss';

export default class Card extends React.Component {
  render() {
    const { name, types, discountPercentage } = this.props;

    return (
      <div className="index">
        <div></div>
        <div>{discountPercentage}</div>
        <h4 className='card-name'>{name}</h4>
        <p className='card-type'>
          {types.join(', ')}
        </p>
        <span className='details-button'>></span>
      </div>
    );
  }
}
