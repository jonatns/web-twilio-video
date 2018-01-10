import React, { Component } from 'react';
import TwilioVideo from 'twilio-video';

import './App.css';

class App extends Component {
  componentDidMount() {

    /*
    TwilioVideo.createLocalVideoTrack({
      audio: true,
      video: { width: 200 },
    }).then(track => {
      var localMediaContainer = document.getElementById('my-video');
      localMediaContainer.appendChild(track.attach());
    });
    */

    TwilioVideo.connect(process.env.REACT_APP_TWILIO_VIDEO_TOKEN, {
      name:'test-room', audio: true, video: { width: 200 },
    }).then(function(room) {
      console.log('Successfully joined a Room: ', room);
      room.on('participantConnected', function(participant) {
        console.log("Participant '" +  participant.identity  + "' connected");

        participant.tracks.forEach(track => {
          document.getElementById('participants-video').appendChild(track.attach());
        });
      });
    }, function(error) {
        console.error('Unable to connect to Room: ' +  error.message);
    });

  }

  render() {
    return (
      <div className="app">
        <div id="participants-video" className="participants">

        </div>
      </div>
    );
  }
}

export default App;
