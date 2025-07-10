const player1 = {
  name: "Mario",
  speed: 4,
  handling: 3,
  power: 3,
  score: 0
};

const player2 = {
  name: "Luigi",
  speed: 3,
  handling: 4,
  power: 4,
  score: 0
};

const SECTION_STRETCH = "STRETCH";
const SECTION_CORNER = "CORNER";
const SECTION_CONTEST = "CONTEST";

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomSection() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = SECTION_STRETCH;
      break;
    case random < 0.66:
      result = SECTION_CORNER;
      break;
    default:
      result = SECTION_CONTEST;
      break;
  }

  return result;
}

async function logDiceRollResult(name, attributeName, rollResult, playerAttribute) {
  console.log(`🎲 ${name} rolled ${rollResult} in ${attributeName} for a total of ${playerAttribute + rollResult} (${playerAttribute} + ${rollResult})`);
}

async function showWinner(player1, player2) {
  let winner;

  console.log("🥁 And the WINNER is... 🥁");

  if (player1.score === player2.score) return console.log("No winners! We have a DRAW! 😮");

  if (player1.score > player2.score) {
    winner = player1.name;
  } else {
    winner = player2.name;
  }

  if (!!winner.length) {
    console.log(`\n🏆 ${winner.toUpperCase()} WON!!! Congratulations!!! 🏆`);
    console.log(`\n💎 FINAL SCORE:`);
    console.log(`${player1.name}: ${player1.score}`);
    console.log(`${player2.name}: ${player2.score}`);
  }

}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    let roundWinner;

    console.log(`🏁 Round ${round}`);

    let section = await getRandomSection();
    console.log(`\nSection: ${section}\n`);

    // dice roll results
    let player1RollResult = await rollDice();
    let player2RollResult = await rollDice();

    // total skill test
    let player1SkillTest = 0;
    let player2SkillTest = 0;

    if (section === SECTION_STRETCH) {
      player1SkillTest = player1RollResult + character1.speed;
      player2SkillTest = player2RollResult + character2.speed;

      await logDiceRollResult(player1.name, "speed", player1RollResult, player1.speed);
      await logDiceRollResult(player2.name, "speed", player2RollResult, player2.speed);
    }

    if (section === SECTION_CORNER) {
      player1SkillTest = player1RollResult + character1.handling;
      player2SkillTest = player2RollResult + character2.handling;

      await logDiceRollResult(player1.name, "handling", player1RollResult, player1.handling);
      await logDiceRollResult(player2.name, "handling", player2RollResult, player2.handling);
    }

    if (section === SECTION_CONTEST) {
      player1SkillTest = player1RollResult + character1.power;
      player2SkillTest = player2RollResult + character2.power;
      await logDiceRollResult(player1.name, "power", player1RollResult, player1.power);
      await logDiceRollResult(player2.name, "power", player2RollResult, player2.power);

      if (player1SkillTest > player2SkillTest && player2.score > 0) {
        player2.score--;
        console.log(`\n🐢 ${player1.name} won the contest! ${player2.name} lost a point! `);
      } else if (player1SkillTest < player2SkillTest && player1.score > 0) {
        console.log(`\n🐢 ${player2.name} won the contest! ${player1.name} lost a point!`);
        player1.score--;
      }
    }

    // check who won the round
    if (player1SkillTest > player2SkillTest) {
      roundWinner = player1.name;
      player1.score++;
    } else if (player1SkillTest < player2SkillTest) {
      roundWinner = player2.name;
      player2.score++;
    } else {
      console.log("\n✋ Draw!");
    }

    if (!!roundWinner) {
      console.log(`%c\n${roundWinner} won the round!`, 'color: yellow;');
    }
    console.log("\n----------------------------------------------\n");
  }

  await showWinner(player1, player2);
}

(async function main() {
  console.log(`🏁 Start Race! 🏁`);
  console.log(`🔵 ${player1.name} vs ${player2.name} 🔴`);
  console.log(`3... \n2... \n1... \nGO!!!`);
  await playRaceEngine(player1, player2);

})();
