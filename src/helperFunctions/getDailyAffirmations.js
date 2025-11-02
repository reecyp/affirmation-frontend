//need to edit this to go with adding new affirmations. just re render when a new one is added
export function getDailyAffirmations(allItems) {
  const today = new Date().toDateString();

  let numberForDate = 0;

  for (let i = 0; i < today.length; i++) {
    numberForDate += today.charCodeAt(i) * (i + 1);
  }

  function selectAffirmations(numberForDate) {
    const affirmations = allItems;
    const selected = [];
    const available = [...affirmations];

    for (let i = 0; i < 3; i++) {
      const randomIndexInArray = (numberForDate + i * 1000) % available.length;
      selected.push(available.splice(randomIndexInArray, 1)[0]);
    }
    return selected;
  }
  return selectAffirmations(numberForDate);
}
