import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const Youtube = () => {
  const CLIENT_ID = '133244074560-6tepsbitnh58aj32ebucgbapv1q72vsu.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyCPg0CcAIkrr0evRZF3iVQplTFWQqJxFXE';
  const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

  const [channelIds, setChannelIds] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [loading, setLoading] = useState(false);

  const authenticate = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        console.log('Sign-in successful');
        loadClient();
      })
      .catch((error) => console.error('Error signing in', error));
  };

  const loadClient = () => {
    gapi.client
      .setApiKey(API_KEY);
    gapi.client
      .load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
      .then(() => {
        console.log('GAPI client loaded for API');
        listChannels();
      })
      .catch((error) => console.error('Error loading GAPI client', error));
  };

  const listChannels = () => {
    gapi.client.youtube.channels
      .list({
        part: 'id,snippet',
        mine: true,
      })
      .then((response) => {
        console.log('Channels:', response.result.items);
        const ids = response.result.items.map((item) => item.id);
        setChannelIds(ids);
        console.log('Channel IDs:', ids);
      })
      .catch((error) => console.error('Error fetching channels', error));
  };

  const fetchAllChannelData = async () => {
    if (channelIds.length === 0) return;

    setLoading(true);
    try {
      const data = await Promise.all(
        channelIds.map(async (id) => {
          const response = await gapi.client.youtube.channels.list({
            part: 'snippet,statistics',
            id: id,
          });
          return response.result.items[0];
        })
      );
      setChannelData(data);
      console.log('All Channel Data:', data);
    } catch (error) {
      console.error('Error fetching channel data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gapi.load('client:auth2', () => {
      gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: SCOPES,
      });
    });
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>YouTube Channels</h1>
      <button onClick={authenticate}>Sign In and Fetch Channels</button>
      {channelIds.length > 0 && (
        <button onClick={fetchAllChannelData}>Fetch Channel Data</button>
      )}
      {channelData.length > 0 ? (
        <div>
          <h2>Channel Data:</h2>
          <ul>
            {channelData.map((channel, index) => (
              <li key={index} className='p-4 border rounded mb-4'>
                <img
                  src={channel.snippet.thumbnails.default.url}
                  alt={channel.snippet.title}
                  className='w-16 h-16 rounded-full'
                />
                <h3>{channel.snippet.title}</h3>
                <p>{channel.snippet.description}</p>
                <p>
                  Subscribers: {channel.statistics.subscriberCount || 'N/A'}
                </p>
                <p>
                  Videos: {channel.statistics.videoCount || 'N/A'}
                </p>
                <p>
                  Views: {channel.statistics.viewCount || 'N/A'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No channels data to display</div>
      )}
    </div>
  );
};

export default Youtube;
