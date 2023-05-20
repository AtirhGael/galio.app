exports.getMonSunDay = (d) => {
  let d2 = new Date(d);
  var day = d2.getDay(),
    diff = d2.getDate() - (day - (day === 0 ? 6 : 1)); // adjust when day is sunday
  let mon = new Date(d2.getFullYear(), d2.getMonth(), diff + 1)
  let sun = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 7)
  return [mon, sun].map(date => date.toISOString().split('T')[0])
}