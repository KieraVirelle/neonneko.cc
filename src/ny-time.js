const NYTimeUtils = (() => {
  const { DateTime } = luxon;

  /**
   * Returns a Luxon DateTime object in America/New_York timezone.
   * @param {string} isoString - ISO 8601 date string (e.g. "2025-07-27T22:00:00").
   * @returns {DateTime}
   */
  function fromNY(isoString) {
    return DateTime.fromISO(isoString, { zone: "America/New_York" });
  }

  /**
   * Converts a DateTime in NY time to the user's local time zone.
   * @param {DateTime} nyDateTime - Luxon DateTime object in America/New_York.
   * @returns {DateTime}
   */
  function toLocal(nyDateTime) {
    return nyDateTime.toLocal();
  }

  /**
   * Formats a NY time into readable local string.
   * @param {string} isoString - ISO datetime in NY time.
   * @param {string} format - Optional Luxon format string.
   * @returns {string} - Formatted in user's local time zone.
   */
  function formatLocalTime(isoString, format = "cccc, LLL d @ h:mm a ZZZZ") {
    return fromNY(isoString).toLocal().toFormat(format);
  }

  /**
   * Returns both NY and Local formatted versions of the given ISO datetime.
   * @param {string} isoString - ISO datetime string in NY time.
   * @returns {{ ny: string, local: string }}
   */
  function dualDisplay(isoString) {
    const ny = fromNY(isoString);
    const local = ny.toLocal();
    return {
      ny: ny.toFormat("h:mm a ZZZZ"),
      local: local.toFormat("h:mm a ZZZZ")
    };
  }

  /**
   * Returns Luxon DateTime for the next Saturday at 10PM ET.
   * If today is Saturday but before 10PM ET, returns today at 10PM.
   */
  function getNextSaturday10pmET() {
  const now = DateTime.now().setZone("America/New_York");

  let target = now.set({ hour: 22, minute: 0, second: 0, millisecond: 0 });

  if (now.weekday !== 6 || now > target) {
    // If not Saturday or it's already past 10PM, go to next Saturday
    const daysUntilSaturday = (6 - now.weekday + 7) % 7 || 7; // Ensure it's never 0
    target = now.plus({ days: daysUntilSaturday }).set({ hour: 22, minute: 0, second: 0, millisecond: 0 });
  }

  return target;
}


  /**
   * Returns a diff object between now and the next Saturday at 10PM ET.
   * @returns {{ days: number, hours: number, minutes: number, seconds: number }}
   */
  function getCountdownParts() {
    const now = DateTime.now();
    const target = getNextSaturday10pmET().setZone(now.zoneName);
    const diff = target.diff(now, ['days', 'hours', 'minutes', 'seconds']).toObject();

    return {
      days: Math.floor(diff.days),
      hours: Math.floor(diff.hours),
      minutes: Math.floor(diff.minutes),
      seconds: Math.floor(diff.seconds)
    };
  }

  return {
    fromNY,
    toLocal,
    formatLocalTime,
    dualDisplay,
    getNextSaturday10pmET,
    getCountdownParts
  };
})();
