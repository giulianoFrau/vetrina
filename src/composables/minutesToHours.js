export function minutesToHours(time) {
  const hour = {
    h: String(String(time?.toFixed(2) / 60).split(".")[0]),
    m: String((time / 60)?.toFixed(2).split(".")[1] * 60),
  };
  return hour.h + ":" + (hour.m < 10 ? "0" + hour.m : hour.m);
}
