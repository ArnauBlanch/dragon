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

export const getConfig = (deviceId: string) => ({
  frequency: 10,
  numOfWorkers: 4,
  locate: true,
  inputStream: {
    name: 'Live',
    type: 'LiveStream',
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
    patchSize: 'x-small',
  },
  debug: {
    showCanvas: false,
    showPatches: false,
    showFoundPatches: false,
    drawBoundingBox: true,
    showFrequency: false,
    drawScanline: false,
    showPattern: false,
    showSkeleton: false,
    showLabels: false,
    showPatchLabels: false,
    showRemainingPatchLabels: false,
    boxFromPatches: {
      showTransformed: false,
      showTransformedBox: false,
      showBB: false,
    },
  },
});

const PREFERRED_DEVICE_ID = 'preferredDeviceId';
let devices: string[] = [];
export const getDeviceId = async () => {
  const ids = await getDevices();
  devices = ids;
  const deviceId = localStorage.getItem(PREFERRED_DEVICE_ID);
  if (deviceId && ids.indexOf(deviceId) !== -1) return Promise.resolve(deviceId);
  if (ids.length > 0) {
    localStorage.setItem(PREFERRED_DEVICE_ID, ids[0]);
    return ids[0];
  }
  return 'NO_CAMERA';
};

export const changeDevice = async () => {
  const deviceId = localStorage.getItem(PREFERRED_DEVICE_ID);
  if (devices && deviceId) {
    const currentIndex = devices.indexOf(deviceId);
    if (currentIndex !== -1) {
      const newDevice = devices[currentIndex === devices.length - 1 ? 0 : currentIndex + 1];
      localStorage.setItem(PREFERRED_DEVICE_ID, newDevice);
      return newDevice;
    }
  }
  return undefined;
};
