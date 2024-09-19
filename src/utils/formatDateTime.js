const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const tempDate = date.toLocaleDateString().split('/');
  return `${tempDate[2]}-${tempDate[0]}-${tempDate[1]}`;
}

const formatTime = (inputTime) => {
  const time = new Date(inputTime);
  const tempTime = time.toLocaleTimeString().split(':');
  return `${tempTime[0]}:${tempTime[1]}`;
};

export {formatDate, formatTime}