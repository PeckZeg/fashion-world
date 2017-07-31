import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import { camelCase } from 'lodash';

const ICONS = [
  'clock', 'location', 'user', 'plus', 'arrow-down', 'back', 'heart', 'error',
  'check', 'play', 'arrow-up'
];

function createIcon(icon) {
  return function(props = {}) {
    return (
      <Icon
        type={require(`./fonts/${icon}.svg`)}
        {...props}
      />
    );
  };
}

export default ICONS.reduce((icons, icon) => {
  icons[camelCase(icon)] = createIcon(icon);
  return icons;
}, {});
