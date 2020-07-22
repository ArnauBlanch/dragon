export const getDevices = () => new Promise((resolve, reject) => {
	if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
		console.log("Can't enumerate devices");
		reject();
		return;
	}

	navigator.mediaDevices.enumerateDevices()
		.then(devices => {
			const ids = devices.filter(x => x.kind === 'videoinput')
				.map(x => x.deviceId)
			resolve(ids);
		})
})
