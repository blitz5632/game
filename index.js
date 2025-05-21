// Life Simulation Game - Main Game File

// Game state
const gameState = {
    player: {
        name: "",
        age: 0,
        gender: "",
        health: 100,
        happiness: 100,
        intelligence: 0,
        looks: 0,
        money: 0,
        career: "",
        education: "None",
        relationships: []
    },
    gameOver: false,
    currentYear: new Date().getFullYear()
};

// Initialize game
function initGame() {
    console.clear();
    console.log("=================================");
    console.log("       LIFE SIMULATOR GAME       ");
    console.log("=================================");
    console.log("\nWelcome to Life Simulator!");
    console.log("Live your virtual life from birth to death.\n");
    
    createCharacter();
}

// Character creation
function createCharacter() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Enter your character\'s name: ', name => {
        gameState.player.name = name;
        
        readline.question('Choose gender (M/F): ', gender => {
            gameState.player.gender = gender.toUpperCase() === 'M' ? 'Male' : 'Female';
            
            // Generate random starting stats
            gameState.player.intelligence = Math.floor(Math.random() * 100);
            gameState.player.looks = Math.floor(Math.random() * 100);
            
            readline.close();
            
            console.log(`\nWelcome to the world, ${gameState.player.name}!`);
            console.log(`You were born as a ${gameState.player.gender}.`);
            console.log(`Intelligence: ${gameState.player.intelligence}`);
            console.log(`Looks: ${gameState.player.looks}`);
            
            // Start with age 0 and first year
            ageUp();
        });
    });
}

// Main game loop - REMOVED the continuous while loop
function startLifeLoop() {
    // Only age up once when called
    ageUp();
}

// Age up the character
function ageUp() {
    gameState.player.age++;
    console.log(`\n--- Age ${gameState.player.age} ---`);
    
    // Apply random life events based on age
    applyLifeEvents();
    
    // Show current stats
    displayStats();
    
    // Check if game should end
    if (gameState.player.age >= 80 || gameState.player.health <= 0) {
        endGame();
        return;
    }
    
    // Prompt for actions
    promptActions();
}

// Apply random life events based on age
function applyLifeEvents() {
    if (gameState.player.age < 5) {
        // Early childhood events
        const events = [
            "You said your first word!",
            "You took your first steps!",
            "You had your first birthday party!",
            "You learned to use the potty!",
            "You made a new friend at daycare!"
        ];
        console.log(events[Math.floor(Math.random() * events.length)]);
    } else if (gameState.player.age < 18) {
        // School age events
        const events = [
            "You started school!",
            "You got an A on your test!",
            "You joined a sports team!",
            "You had a fight with your best friend.",
            "You developed a new hobby!"
        ];
        console.log(events[Math.floor(Math.random() * events.length)]);
    } else if (gameState.player.age < 30) {
        // Young adult events
        const events = [
            "You graduated college!",
            "You got your first job!",
            "You went on a date!",
            "You moved into your own place!",
            "You traveled abroad!"
        ];
        console.log(events[Math.floor(Math.random() * events.length)]);
    } else if (gameState.player.age < 60) {
        // Adult events
        const events = [
            "You got a promotion!",
            "You bought a new car!",
            "You got married!",
            "You had a child!",
            "You invested in stocks!"
        ];
        console.log(events[Math.floor(Math.random() * events.length)]);
    } else {
        // Senior events
        const events = [
            "You retired!",
            "You became a grandparent!",
            "You took up gardening!",
            "You joined a book club!",
            "You went on a cruise!"
        ];
        console.log(events[Math.floor(Math.random() * events.length)]);
    }
    
    // Random health changes
    const healthChange = Math.floor(Math.random() * 10) - 5;
    gameState.player.health = Math.max(0, Math.min(100, gameState.player.health + healthChange));
    
    // Random happiness changes
    const happinessChange = Math.floor(Math.random() * 10) - 3;
    gameState.player.happiness = Math.max(0, Math.min(100, gameState.player.happiness + happinessChange));
}

// Display current stats
function displayStats() {
    console.log(`\nStats for ${gameState.player.name}:`);
    console.log(`Age: ${gameState.player.age}`);
    console.log(`Health: ${gameState.player.health}`);
    console.log(`Happiness: ${gameState.player.happiness}`);
    console.log(`Intelligence: ${gameState.player.intelligence}`);
    console.log(`Looks: ${gameState.player.looks}`);
    console.log(`Money: $${gameState.player.money}`);
    console.log(`Education: ${gameState.player.education}`);
    console.log(`Career: ${gameState.player.career || "None"}`);
}

// Prompt for actions based on age
function promptActions() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log("\nWhat would you like to do?");
    
    if (gameState.player.age < 5) {
        console.log("1. Play with toys");
        console.log("2. Learn to read");
        console.log("3. Take a nap");
    } else if (gameState.player.age < 18) {
        console.log("1. Study hard");
        console.log("2. Hang out with friends");
        console.log("3. Play sports");
        console.log("4. Get into trouble");
    } else if (gameState.player.age < 30) {
        console.log("1. Go to college");
        console.log("2. Get a job");
        console.log("3. Date someone");
        console.log("4. Party");
    } else {
        console.log("1. Work harder");
        console.log("2. Spend time with family");
        console.log("3. Exercise");
        console.log("4. Take a vacation");
    }
    
    console.log("5. Age up (continue to next year)");
    
    readline.question('Choose an option: ', option => {
        readline.close();
        
        // Handle the action based on user choice
        handleAction(parseInt(option));
        
        // IMPORTANT CHANGE: Only age up if option 5 was selected
        // Otherwise, prompt for more actions in the same year
        if (parseInt(option) === 5) {
            if (!gameState.gameOver) {
                ageUp();
            }
        } else {
            // If any other option was chosen, prompt for more actions
            // without aging up
            if (!gameState.gameOver) {
                promptForMoreActions();
            }
        }
    });
}

// New function to prompt for more actions in the same year
function promptForMoreActions() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log("\nWhat else would you like to do this year?");
    console.log("1. More actions");
    console.log("2. Age up (continue to next year)");
    
    readline.question('Choose an option: ', option => {
        readline.close();
        
        if (parseInt(option) === 1) {
            // If they want more actions, show the action menu again
            promptActions();
        } else {
            // Otherwise, age up
            if (!gameState.gameOver) {
                ageUp();
            }
        }
    });
}

// Handle player action choice
function handleAction(option) {
    switch(option) {
        case 1:
            if (gameState.player.age < 5) {
                console.log("You played with your toys. Happiness +10");
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
            } else if (gameState.player.age < 18) {
                console.log("You studied hard. Intelligence +5");
                gameState.player.intelligence = Math.min(100, gameState.player.intelligence + 5);
            } else if (gameState.player.age < 30) {
                console.log("You enrolled in college. Intelligence +15, Money -5000");
                gameState.player.intelligence = Math.min(100, gameState.player.intelligence + 15);
                gameState.player.money -= 5000;
                gameState.player.education = "College";
            } else {
                console.log("You worked overtime. Money +1000, Happiness -5");
                gameState.player.money += 1000;
                gameState.player.happiness = Math.max(0, gameState.player.happiness - 5);
            }
            break;
        case 2:
            if (gameState.player.age < 5) {
                console.log("You learned to read. Intelligence +5");
                gameState.player.intelligence = Math.min(100, gameState.player.intelligence + 5);
            } else if (gameState.player.age < 18) {
                console.log("You hung out with friends. Happiness +10");
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
            } else if (gameState.player.age < 30) {
                console.log("You got a job. Money +2000");
                gameState.player.money += 2000;
                gameState.player.career = "Entry Level Job";
            } else {
                console.log("You spent time with family. Happiness +10");
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
            }
            break;
        case 3:
            if (gameState.player.age < 5) {
                console.log("You took a nap. Health +5");
                gameState.player.health = Math.min(100, gameState.player.health + 5);
            } else if (gameState.player.age < 18) {
                console.log("You played sports. Health +10, Looks +5");
                gameState.player.health = Math.min(100, gameState.player.health + 10);
                gameState.player.looks = Math.min(100, gameState.player.looks + 5);
            } else if (gameState.player.age < 30) {
                console.log("You went on a date. Happiness +10");
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
                // Chance to add a relationship
                if (Math.random() > 0.7) {
                    gameState.player.relationships.push({
                        type: "Dating",
                        name: ["Alex", "Sam", "Jordan", "Taylor", "Casey"][Math.floor(Math.random() * 5)]
                    });
                    console.log(`You started dating ${gameState.player.relationships[gameState.player.relationships.length - 1].name}!`);
                }
            } else {
                console.log("You exercised. Health +10");
                gameState.player.health = Math.min(100, gameState.player.health + 10);
            }
            break;
        case 4:
            if (gameState.player.age >= 5 && gameState.player.age < 18) {
                console.log("You got into trouble. Happiness +5, Intelligence -5");
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 5);
                gameState.player.intelligence = Math.max(0, gameState.player.intelligence - 5);
            } else if (gameState.player.age < 30) {
                console.log("You partied all night. Happiness +15, Health -5");
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 15);
                gameState.player.health = Math.max(0, gameState.player.health - 5);
            } else {
                console.log("You took a vacation. Happiness +20, Money -2000");
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 20);
                gameState.player.money -= 2000;
            }
            break;
        case 5:
            console.log("Moving to next year...");
            break;
        default:
            console.log("Invalid option. Try again.");
            promptActions();
            break;
    }
}

// End game
function endGame() {
    gameState.gameOver = true;
    console.log("\n=================================");
    console.log("          GAME OVER              ");
    console.log("=================================");
    
    if (gameState.player.health <= 0) {
        console.log(`${gameState.player.name} has died at the age of ${gameState.player.age}.`);
    } else {
        console.log(`${gameState.player.name} has lived a full life and died peacefully at the age of ${gameState.player.age}.`);
    }
    
    console.log("\nLife Summary:");
    console.log(`Education: ${gameState.player.education}`);
    console.log(`Final Career: ${gameState.player.career || "None"}`);
    console.log(`Money Accumulated: $${gameState.player.money}`);
    console.log(`Relationships: ${gameState.player.relationships.length}`);
    
    // Calculate life score
    const lifeScore = gameState.player.happiness + 
                     gameState.player.intelligence + 
                     gameState.player.looks + 
                     Math.min(100, gameState.player.money / 1000);
    
    console.log(`\nFinal Life Score: ${lifeScore}/400`);
    
    if (lifeScore > 300) {
        console.log("You lived an exceptional life!");
    } else if (lifeScore > 200) {
        console.log("You lived a good life.");
    } else if (lifeScore > 100) {
        console.log("You lived an average life.");
    } else {
        console.log("Your life had many struggles.");
    }
    
    // Ask if they want to play again
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    readline.question('\nWould you like to play again? (y/n): ', answer => {
        readline.close();
        if (answer.toLowerCase() === 'y') {
            // Reset game state
            gameState.player = {
                name: "",
                age: 0,
                gender: "",
                health: 100,
                happiness: 100,
                intelligence: 0,
                looks: 0,
                money: 0,
                career: "",
                education: "None",
                relationships: []
            };
            gameState.gameOver = false;
            
            // Start a new game
            initGame();
        } else {
            console.log("Thanks for playing!");
            process.exit();
        }
    });
}

// Start the game
initGame();