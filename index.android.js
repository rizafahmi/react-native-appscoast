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
import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming'
import secret from './secret.json'

export default class appscoast extends Component {
  constructor (props) {
    super(props)
    this.state = {
      streamUrl: ''
    }
  }
  componentWillMount () {
    fetch(`http://api.soundcloud.com/tracks/308967639?client_id=${secret.SOUNDCLOUD_CLIENT_ID}`)
      .then((result) => result.json())
      .then((data) => {
        const streamUrl = data.stream_url + `?client_id=${secret.SOUNDCLOUD_CLIENT_ID}`
        // ReactNativeAudioStreaming.play(streamUrl, {
        //   showInAndroidNotifications: true
        // })
        this.setState({
          streamUrl
        })
      })
      .catch(err => console.error(err))
  }
  render () {
    return (
      <View style={styles.container}>
        <Player url={this.state.streamUrl} />
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
