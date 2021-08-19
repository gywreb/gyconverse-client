export const timerFormat = (hours, minutes, seconds) => {
  return (
    (hours < 10 ? "0" + hours : "" + hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : "" + minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : "" + seconds)
  );
};
