import Quagga from "quagga";

const getConfig = deviceId => ({
  frequency: 5,
  numOfWorkers: 2,
  locate: true,
  inputStream: {
    name: "Live",
    type: "LiveStream",
    constraints: { deviceId },
    area: {
      top: "0%",
      right: "0%",
      left: "0%",
      bottom: "0%"
    }
  },
  decoder: { readers: ["ean_reader"] },
  locator: {
    halfSample: true,
    patchSize: "medium"
  }
});

class Scanner {
  instance = null;

  create = deviceId => {
    const config = getConfig(deviceId);
    Quagga.config(config).fromSource({
      ...config.inputStream,
      target: ".viewport"
    });
  };

  getActiveTrack = () => {
    const video = document.querySelector("video");
    if (video && video.srcObject) {
      const tracks = video.srcObject.getVideoTracks();
      if (tracks && tracks.length) {
        return tracks[0];
      }
    }
  }
}
