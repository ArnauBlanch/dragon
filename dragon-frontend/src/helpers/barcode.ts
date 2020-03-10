import { getPreferredDeviceId, setPreferredDeviceId } from './localStorage';

/* eslint-disable no-console */
export const getDevices = () =>
  new Promise<string[]>((resolve, reject) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('Cannot enumerate devices');
      reject();
      return;
    }

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const ids: string[] = devices.filter((x) => x.kind === 'videoinput').map((x) => x.deviceId);
      resolve(ids);
    });
  });

export const getConfig = (deviceId: string, target: string) => ({
  frequency: 5,
  numOfWorkers: 4,
  locate: true,
  inputStream: {
    name: 'Live',
    type: 'LiveStream',
    target,
    constraints: {
      deviceId,
    },
    area: {},
  },
  decoder: {
    readers: ['ean_reader'],
  },
  locator: {
    halfSample: false,
    patchSize: 'medium',
  },
});

let devices: string[] = [];
export const getDeviceId = async () => {
  const ids = await getDevices();
  devices = ids;
  const deviceId = getPreferredDeviceId();
  if (deviceId && ids.indexOf(deviceId) !== -1) return Promise.resolve(deviceId);
  if (ids.length > 0) {
    setPreferredDeviceId(ids[0]);
    return ids[0];
  }
  return 'NO_CAMERA';
};

export const changeDevice = async () => {
  const deviceId = getPreferredDeviceId();
  if (devices && deviceId) {
    const currentIndex = devices.indexOf(deviceId);
    if (currentIndex !== -1) {
      const newDevice = devices[currentIndex === devices.length - 1 ? 0 : currentIndex + 1];
      setPreferredDeviceId(newDevice);
      return newDevice;
    }
  }
  return undefined;
};

export const getActiveTrack = (): MediaStreamTrack | undefined => {
  const video = document.querySelector('video');
  if (video && video.srcObject) {
    const tracks = (video.srcObject as MediaStream).getVideoTracks();
    if (tracks && tracks.length) {
      console.log(tracks);
      return tracks[0];
    }
  }
  return undefined;
};

export const hasTorch = () => {
  const track = getActiveTrack();
  if (track) {
    const capabilities = track.getCapabilities();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (capabilities as any)?.torch === true;
  }
  return false;
};

export const toggleTorch = (activated: boolean) => {
  const track = getActiveTrack();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (track) track.applyConstraints({ advanced: [{ torch: activated }] } as any);
};
