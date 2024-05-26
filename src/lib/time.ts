function timeToMessage() {
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
