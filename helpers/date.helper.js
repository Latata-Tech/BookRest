// 191111291 - Farhan Ismul Afriza
const currentDateTime = () => {
  const now = new Date();
  let date = `${now.getFullYear()}-${addZeroOnFront(
    now.getMonth() + 1
  )}-${addZeroOnFront(now.getDate())}`;
  let time = `${addZeroOnFront(now.getHours())}:${addZeroOnFront(
    now.getMinutes()
  )}:${addZeroOnFront(now.getSeconds())}`;
  return `${date} ${time}`;
};

const addZeroOnFront = (number) => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};
module.exports = currentDateTime;
