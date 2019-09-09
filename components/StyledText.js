import React from 'react';
import { Text } from 'react-native';

export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}

export class HeaderText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'baloo-bhai', fontSize: 25 }]} />;
  }
}


export class HeaderTextL extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'baloo-bhai', fontSize: 30 }]} />;
  }
}


export class RegularText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'ubuntu', fontSize: 20 }]} />;
  }
}
 