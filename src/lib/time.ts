/**
 * Returns a greeting message based on the current time of day.
 *
 * This function checks the current hour and returns a greeting
 * message: "Good Morning", "Good Afternoon", or "Good Evening".
 *
 * @returns {string} The greeting message based on the current time of day.
 */
function timeToMessage(): string {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 12) {
    return 'Good Morning';
  } else if (hours < 18) {
    return 'Good Afternoon';
  } else {
    return 'Good Evening';
  }
}

export default timeToMessage;
