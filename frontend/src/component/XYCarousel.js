import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

export default class CaaCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { currentIdx: 0 };
  }

  handleCardClick = (...args) => {
    if (typeof this.props.onCardClick == 'function') {
      this.props.onCardClick(...args);
    }
  }

  handleBeforeChange = (from, to) => {
    this.setState({ currentIdx: to });
  }

  render() {
    return (
      <div className="caa-carousel" style={{ height: screen.height * 0.3 }}>
        <Carousel dots={false} infinite={true} autoplay={true} beforeChange={this.handleBeforeChange}>
          {
            this.props.cards && this.props.cards.map((card, idx) => (
              <a
                key={idx}
                className="caa-carousel-item"
                href="javascript:;"
                style={{
                  height: screen.height * 0.3,
                  backgroundImage: `url(${card.thumb})`
                }}
                onClick={() => this.handleCardClick(card)}
              >
              </a>
            ))}
        </Carousel>

        <div
          className="caa-carousel-shadow"
          onClick={() => this.handleCardClick(
            this.props.cards && this.props.cards[this.state.currentIdx]
          )}
        >
          <h2 className="caa-carousel-title">
            {
              this.props.cards.length > 0 ? 'WINE STORIES': null
            }
          </h2>
          <ul className="caa-carousel-dots">
            {this.props.cards && this.props.cards.map((card, idx) => (
              <li className={classNames({
                active: idx == this.state.currentIdx
              })} key={idx}></li>
            ))}
          </ul>
          {/*<WhiteSpace />*/}
        </div>
      </div>
    );
  }
}
