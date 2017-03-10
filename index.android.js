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

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (min, max))
}

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
        const playlists = data.map(track => {
          return {
            stream_url: track.stream_url + `?client_id=${secret.SOUNDCLOUD_CLIENT_ID}`,
            title: track.title
          }
        })

        const currentTrack = {
          stream_url: data[randomNumber(0, playlists.length)].stream_url + `?client_id=${secret.SOUNDCLOUD_CLIENT_ID}`,
          title: data[randomNumber(0, playlists.length)].title
        }

        this.setState({
          currentTrack,
          playlists
        })
      })
      .catch(err => console.error(err))
  }
  onNextButtonPress () {
    ReactNativeAudioStreaming.stop()
    const randomTrackNumber = randomNumber(0, this.state.playlists.length)
    this.setState({
      currentTrack: this.state.playlists[randomTrackNumber]
    })
    ReactNativeAudioStreaming.play(this.state.currentTrack.stream_url, {
      showInAndroidNotifications: false
    })
  }
  render () {
    return (
      <View style={styles.container}>
        {this.state.currentTrack ? <Text>{this.state.currentTrack.title}</Text> : <Text>Loading the title</Text>}
        <Button title='Shuffle' onPress={this.onNextButtonPress.bind(this)} />
        {this.state.currentTrack ? <Player url={this.state.currentTrack.stream_url} /> : <Text>Loading player...</Text> }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 66
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
