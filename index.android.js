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
  Text,
  View
} from 'react-native'
import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming'
import secret from './secret.json'

const URL = `http://api.soundcloud.com/users/126621567/tracks?client_id=${secret.SOUNDCLOUD_CLIENT_ID}`

export default class appscoast extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTrack: '',
      playlists: []
    }
  }
  componentDidMount () {
    fetch(URL)
      .then((result) => result.json())
      .then((data) => {
        const currentTrack = data[0].stream_url + `?client_id=${secret.SOUNDCLOUD_CLIENT_ID}`

        const playlists = data.map(track => {
          return track.stream_url + `?client_id=${secret.SOUNDCLOUD_CLIENT_ID}`
        })
        this.setState({
          currentTrack,
          playlists
        })
      })
      .catch(err => console.error(err))
  }
  onNextButtonPress () {
    ReactNativeAudioStreaming.stop()
    const randomTrackNumber = Math.floor(Math.random() * (0, this.state.playlists.length))
    this.setState({
      currentTrack: this.state.playlists[randomTrackNumber]
    })
    ReactNativeAudioStreaming.play(this.state.currentTrack, {
      showInAndroidNotifications: false
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <Button title='Shuffle' onPress={this.onNextButtonPress.bind(this)} />
        <Player url={this.state.currentTrack} />
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
