export default function datesThisWeek(): string[] {
  const current = new Date()
  var week = new Array()
  current.setDate(current.getDate() - current.getDay() + 1)
  for (var i = 0; i < 7; i++) {
    week.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return week
}
