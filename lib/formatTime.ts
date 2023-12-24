export function formatTime(timeString: any) {
	if (!timeString) {
		return ""; // Return an empty string if timeString is not provided
	}

	// Parse the input time string
	const parsedTime = new Date(timeString);

	// Check if the parsing was successful
	if (isNaN(parsedTime.getTime())) {
		return "Invalid Date"; // Return an error message if parsing fails
	}

	// Format the time using the user's locale
	const formattedTime = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true,
	}).format(parsedTime);

	return formattedTime;
}
