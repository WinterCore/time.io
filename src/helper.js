const addLeadingZero = n => (n < 10 ? `0${n}` : n);

export const secondsToHis = (seconds) => {
	const secs = seconds % 60;
	const mins = Math.floor(seconds / 60) % 60;
	const hrs  = Math.floor(seconds / 60 / 60) % 60;

	return `${addLeadingZero(hrs)}:${addLeadingZero(mins)}:${addLeadingZero(secs)}`;
};

export const getAmPm = date => date.getHours() >= 12 ? "PM" : "AM";

export const areYearsEqual = (x, y) => x.getFullYear() === y.getFullYear();
export const areMonthsEqual = (x, y) => areYearsEqual(x, y) && x.getMonth() === y.getMonth();
export const areDaysEqual = (x, y) => areMonthsEqual(x, y) && x.getDate() === y.getDate();