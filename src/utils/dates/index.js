export const isOffWorkingHours = (startTime, endTime) => {
  const start = startTime;
  const end = endTime;
  const currentTime = new Date();

  const convertStringToDate = stingTime => {
    const timeArr = stingTime.split(":");
    const datetime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      Number(timeArr[0]),
      Number(timeArr[1]),
      Number(timeArr[2])
    );
    return datetime;
  };

  const startDateTime = convertStringToDate(start);
  const endDateTime = convertStringToDate(end);
  const isOffWork =
    !(currentTime >= startDateTime && currentTime <= endDateTime) || false;
  return isOffWork;
};
