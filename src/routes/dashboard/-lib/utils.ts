function timeToMessage(): string {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12 && hours >= 3) {
    return 'Good Morning';
  }

  if (hours >= 12 && hours < 18) {
    return 'Good Afternoon';
  }

  return 'Good Evening';
}

export { timeToMessage };
