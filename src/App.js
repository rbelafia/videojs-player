import React, {useRef, useState} from 'react';
import VideoPlayer from './VideoPlayer';
import './App.css';
import videojs from "video.js";

const App = () => {
    const [urlChanging, setUrlChanging] = useState('');
    const [url, setUrl] = useState('');
    const playerRef = useRef(null);
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: url,
            },
        ],
    };
    const handlePlayerReady = (player) => {
        playerRef.current = player;

        // You can handle player events here, for example:
        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };
  return (
      <div className="App">
        <h1>Video.js Player</h1>
          <form onSubmit={(e) => {
              e.preventDefault();
              setUrl(urlChanging);
          }}>
              <label className="App-label">
                  Url
                  <input type={"url"} value={urlChanging} onChange={({target: {value}}) => {
                      setUrlChanging(value)
                  }}/>
              </label>

          </form>
          {url !== '' && <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady}/>}
      </div>
  );
};

export default App;
