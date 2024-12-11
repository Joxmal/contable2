export default function (dialogForm: any) {
	return new Promise<void>((resolve) => {
		const checkDialog = setInterval(() => {
			if (dialogForm.value && dialogForm.value.dialog) {
				clearInterval(checkDialog);
				resolve();
			}
		}, 100); // Verifica cada 100 ms
	});
}
