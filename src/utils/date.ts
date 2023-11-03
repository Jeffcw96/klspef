export function formatDate(date: Date) {
  const todayDate = date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const dayOfWeek = date.getDay();
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const todayDay = dayLabels[dayOfWeek - 1];

  return { todayDate, todayDay };
}
