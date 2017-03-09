/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Button,
  View
} from 'react-native'

export default class appscoast extends Component {
  constructor (props) {
    super(props)
  }
  _play () {
    console.log('play')
  }
  render () {
    return (
      <View style={styles.container}>
        <Button title='Play' onPress={this._play.bind(this)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

AppRegistry.registerComponent('appscoast', () => appscoast)
