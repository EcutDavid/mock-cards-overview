import React from 'react';

import 'styles/card.scss';

export default class Card extends React.Component {
  render() {
    const {
      name,
      types,
      discountPercentage,
      provider,
      shouldPresent
    } = this.props;

    return (
      <div className={`card ${shouldPresent ? 'present' : ''}`}>
        <div className={`provider-thumbnail ${provider}`}></div>
        <div className='discount'>
          <p>UP TO</p>
          <p>{`${discountPercentage}%`}</p>
        </div>
        <section className='description'>
          <h4 className='card-name'>{name}</h4>
          <p className='card-type'>
            {types.join(', ')}
          </p>
        </section>
        <div className='details-button mobile' />
        <div className='details-button desktop'>Details</div>
      </div>
    );
  }
}
