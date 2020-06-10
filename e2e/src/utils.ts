export default function generateRandomEvents(): object[] {
  function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const events: object[] = [];

  for (let i = 0; i < 100; i++) {
    const start = getRandomIntInclusive(0, 700);
    const end = getRandomIntInclusive(start + 10, 720);

    events.push({ start, end });
  }

  return events;
}
