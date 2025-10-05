export function getName(): string {
  const totalWeight = nicknames.reduce(
    (sum, nickname) => sum + nickname.weight,
    0
  );

  let randomWeight = Math.random() * totalWeight;
  for (const nickname of nicknames) {
    randomWeight -= nickname.weight;
    if (randomWeight <= 0) return nickname.name;
  }

  return nicknames[0].name;
}

// please call me by these names~
const nicknames = [
  { name: "Ethan", weight: 0.8 }, // my real name
  { name: "Gann", weight: 0.1 }, // my gamer name 🎮
  { name: "Estella", weight: 0.1 }, // my err fem name
];
