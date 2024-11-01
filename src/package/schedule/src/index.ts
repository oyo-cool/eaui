const calculateTime = (index: number, interval: number) => {
  const hours = Math.floor(index * interval);
  const minutes = (index - Math.floor(hours / interval)) * 60 * interval;
  return [hours, minutes];
};

const formatTime = (hours: number, minutes: number) => {
  const formattedHours = (hours < 10 ? '0' : '') + hours;
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;
  return `${formattedHours}:${formattedMinutes}`;
};

export const generateTimeSlots = (precision: number) => {
  const timeSlots = new Array(24 / precision).fill(0);

  timeSlots.forEach((_, index) => {
    const [startHour, startMinute] = calculateTime(index, precision);
    const [endHour, endMinute] = calculateTime(index + 1, precision);
    const startTimeLabel = formatTime(startHour, startMinute);
    const endTimeLabel = formatTime(endHour, endMinute);

    timeSlots[index] = {
      time: {
        start: {
          hour: startHour,
          minute: startMinute,
        },
        end: {
          hour: endHour,
          minute: endMinute,
        },
      },
      label: {
        start: startTimeLabel,
        end: endTimeLabel,
      },
    };
  });

  return timeSlots;
};
