export default (deviceId) => ({
    frequency: 10,
    numOfWorkers: 4,
    locate: true,
    inputStream: {
      name: "Live",
      type: "LiveStream",
      constraints: {
        deviceId: deviceId,
      },
      area: {
        top: "0%",
        right: "0%",
        left: "0%",
        bottom: "0%"
      }
    },
    decoder: {
      readers: ["ean_reader"]
    },
    locator: {
      halfSample: true,
      patchSize: "small"
    }
  });