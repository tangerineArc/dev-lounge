export default function formatDate(dateString) {
  const string = dateString.toString();
  const [_, month, date, __, time] = string.split(" ");
  const [hours, minutes] = time.split(":");

  return `${hours}:${minutes} · ${date} ${month}`;
}
