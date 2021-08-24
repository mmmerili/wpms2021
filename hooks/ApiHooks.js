import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    // https://scriptverse.academy/tutorials/js-self-invoking-functions.html
    (async () => {
      setMediaArray(await loadMedia());
    })();
  }, []);

  const loadMedia = async () => {
    try {
      const response = await fetch(baseUrl + 'media');
      const mediaIlmanThumbnailia = await response.json();
      const kaikkiTiedot = mediaIlmanThumbnailia.map(async (media) => {
        return await loadSingleMedia(media.file_id);
      });
      return Promise.all(kaikkiTiedot);
    } catch (e) {
      console.log(e.message());
    }
  };

  const loadSingleMedia = async (id) => {
    const response = await fetch(baseUrl + 'media/' + id);
    const tiedosto = await response.json();
    return tiedosto;
  };

  return {mediaArray, loadMedia, loadSingleMedia};
};

export {useMedia};
