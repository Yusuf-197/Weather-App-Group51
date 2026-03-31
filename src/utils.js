// parsing time functions
export function parseTime(time) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(time);
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}