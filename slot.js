(() => {
  const symbols = [
    "☠️",  // skull
    "🧟‍♂️", // zombie
    "🔪",   // knife
    "💀",  // skull 2
    "⚡",   // lightning bolt
    "👾"    // alien monster
  ];

  const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
  ];

  const spinBtn = document.getElementById("spin-btn");
  const resultMessage = document.getElementById("result-message");
  const chatbotText = document.getElementById("chatbot-text");

  let spinning = false;

  // Very low chance to get all 3 matching (around 6% total)
  // We simulate a biased spin by randomizing with weights
  function weightedRandomSymbol() {
    // 80% chance to pick any random symbol (weighted to 'lose')
    // 20% chance for 'skull' symbol to help win occasionally
    let rand = Math.random();
    if (rand < 0.2) {
      return symbols[0]; // skull
    } else {
      return symbols[Math.floor(Math.random() * symbols.length)];
    }
  }

  function spinReels() {
    if (spinning) return;
    spinning = true;
    spinBtn.disabled = true;
    resultMessage.textContent = "SPINNING...";
    chatbotText.textContent = "Calculating odds...";

    // Animate reel spins with delay
    let results = [];
    let spinCount = 15; // how many frames spins last
    let currentSpin = 0;

    const spinInterval = setInterval(() => {
      reels.forEach((reel, i) => {
        reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      });
      currentSpin++;
      if (currentSpin >= spinCount) {
        clearInterval(spinInterval);

        // Choose final results biased for tough difficulty
        results = [
          weightedRandomSymbol(),
          weightedRandomSymbol(),
          weightedRandomSymbol()
        ];
        reels.forEach((reel, i) => {
          reel.textContent = results[i];
        });

        checkResult(results);
        spinning = false;
        spinBtn.disabled = false;
      }
    }, 70);
  }

  function checkResult(results) {
    const [a,b,c] = results;
    if (a === b && b === c) {
      // JACKPOT
      resultMessage.textContent = "JACKPOT! VOID-11 HARPER approves...";
      glitchEffect(true);
      chatbotText.textContent = "You won... but at what cost?";
    } else if (a === b || b === c || a === c) {
      // Close
      resultMessage.textContent = "Close! The void watches you...";
      chatbotText.textContent = "Almost... but no.";
      glitchEffect(false);
    } else {
      resultMessage.textContent = "No win. Try again.";
      chatbotText.textContent = "Better luck next time...";
      glitchEffect(false);
    }
  }

  // Simple glitch effect on background on win
  function glitchEffect(jackpot) {
    if (jackpot) {
      document.body.style.animation = "glitchFlash 0.4s ease-in-out 4";
      setTimeout(() => {
        document.body.style.animation = "";
      }, 1600);
    } else {
      // Slight stutter flicker on lose
      const slotMachine = document.getElementById("slot-machine");
      slotMachine.style.animation = "flicker 0.3s ease-in-out 2";
      setTimeout(() => {
        slotMachine.style.animation = "";
      }, 600);
    }
  }

  // Keyframe animations injected dynamically
  const style = document.createElement("style");
  style.textContent = `
    @keyframes glitchFlash {
      0%, 100% { background-color: #000000; }
      25%, 75% { background-color: #ff00ff; }
      50% { background-color: #00ffff; }
    }
    @keyframes flicker {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);

  spinBtn.addEventListener("click", spinReels);
})();
