document.write("Hello WORLD!!");
alert("YUYU");
console.log("Helo");
window.onload = function() {
	setInterval(function() {
		var dd = new Date();
		document.write(
			"\r".concat(
			dd.toLocaleString(),"\n"
			)
			);
		console.log(
			"\r".concat(
			dd.toLocaleString()
			));
	}, 1000);
}