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
        relationships: [],
        job: "",
        jobLevel: 0,
        salary: 0
    },
    gameOver: false,
    currentYear: new Date().getFullYear(),
    selectedGender: null,
    achievements: []
};

const achievementsList = [
    { id: 'age18', name: 'Grown Up', description: 'Reach 18 years of age', unlocked: false },
    { id: 'age50', name: 'Middle Age', description: 'Reach 50 years of age', unlocked: false },
    { id: 'age80', name: 'Long Life', description: 'Reach 80 years of age', unlocked: false },
    { id: 'millionaire', name: 'Millionaire', description: 'Accumulate $1,000,000', unlocked: false },
    { id: 'genius', name: 'Genius', description: 'Reach 100 intelligence', unlocked: false },
    { id: 'healthy', name: 'Peak Health', description: 'Maintain 100 health for 5 years', unlocked: false }
];

function checkAchievements() {
    // Check age achievements
    if (gameState.player.age >= 18 && !isAchievementUnlocked('age18')) {
        unlockAchievement('age18');
    }
    if (gameState.player.age >= 50 && !isAchievementUnlocked('age50')) {
        unlockAchievement('age50');
    }
    if (gameState.player.age >= 80 && !isAchievementUnlocked('age80')) {
        unlockAchievement('age80');
    }
    
    // Check money achievement
    if (gameState.player.money >= 1000000 && !isAchievementUnlocked('millionaire')) {
        unlockAchievement('millionaire');
    }
    
    // Check intelligence achievement
    if (gameState.player.intelligence >= 100 && !isAchievementUnlocked('genius')) {
        unlockAchievement('genius');
    }
}

function isAchievementUnlocked(id) {
    return gameState.achievements.includes(id);
}

function unlockAchievement(id) {
    gameState.achievements.push(id);
    
    // Find achievement details
    const achievement = achievementsList.find(a => a.id === id);
    
    // Display notification
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <h3>Achievement Unlocked!</h3>
        <p>${achievement.name}</p>
        <p>${achievement.description}</p>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 1000);
    }, 3000);
}

function addRelationship(type, name, status) {
    const relationship = {
        type: type,
        name: name,
        status: status,
        happiness: 50,
        years: 0
    };
    
    gameState.player.relationships.push(relationship);
    return relationship;
}

function updateRelationships() {
    // Age up all relationships
    gameState.player.relationships.forEach(rel => {
        rel.years++;
        
        // Random happiness changes
        const happinessChange = Math.floor(Math.random() * 10) - 4;
        rel.happiness = Math.max(0, Math.min(100, rel.happiness + happinessChange));
        
        // Relationship might end if happiness is too low
        if (rel.happiness < 20 && Math.random() > 0.7) {
            const index = gameState.player.relationships.indexOf(rel);
            if (index > -1) {
                gameState.player.relationships.splice(index, 1);
                eventText.innerHTML += `<br><br>Your relationship with ${rel.name} ended.`;
                gameState.player.happiness = Math.max(0, gameState.player.happiness - 10);
            }
        }
    });
}

// DOM Elements - Check if they already exist before declaring
// Use var instead of const to avoid block-scoped redeclaration errors
var characterCreationScreen = characterCreationScreen || document.getElementById('character-creation');
var mainGameScreen = mainGameScreen || document.getElementById('main-game');
var gameOverScreen = gameOverScreen || document.getElementById('game-over');

var maleBtn = maleBtn || document.getElementById('male-btn');
var femaleBtn = femaleBtn || document.getElementById('female-btn');
var startLifeBtn = startLifeBtn || document.getElementById('start-life-btn');
var ageUpBtn = ageUpBtn || document.getElementById('age-up-btn');
var playAgainBtn = playAgainBtn || document.getElementById('play-again-btn');
var saveGameBtn = saveGameBtn || document.getElementById('save-game-btn');
var loadGameBtn = loadGameBtn || document.getElementById('load-game-btn');
var actionButtonsContainer = actionButtonsContainer || document.getElementById('action-buttons');
var eventText = eventText || document.getElementById('event-text');

// Stat display elements
var playerName = playerName || document.getElementById('player-name');
var playerStatus = playerStatus || document.getElementById('player-status');
var bankBalance = bankBalance || document.getElementById('bank-balance');
var ageValue = ageValue || document.getElementById('age-value');
var healthBar = healthBar || document.getElementById('health-bar');
var healthValue = healthValue || document.getElementById('health-value');
var happinessBar = happinessBar || document.getElementById('happiness-bar');
var happinessValue = happinessValue || document.getElementById('happiness-value');
var intelligenceBar = intelligenceBar || document.getElementById('intelligence-bar');
var intelligenceValue = intelligenceValue || document.getElementById('intelligence-value');
var looksBar = looksBar || document.getElementById('looks-bar');
var looksValue = looksValue || document.getElementById('looks-value');
var avatarImg = avatarImg || document.getElementById('avatar-img');
var babyIcon = babyIcon || document.getElementById('baby-icon');

// Life stage elements
var lifeStages = lifeStages || document.querySelectorAll('.life-stage');

// Event Listeners - Only add if they don't already exist
if (maleBtn && !maleBtn._hasClickListener) {
    maleBtn.addEventListener('click', () => {
        playClickSound();
        selectGender('Male');
    });
    maleBtn._hasClickListener = true;
}

if (femaleBtn && !femaleBtn._hasClickListener) {
    femaleBtn.addEventListener('click', () => {
        playClickSound();
        selectGender('Female');
    });
    femaleBtn._hasClickListener = true;
}

if (startLifeBtn && !startLifeBtn._hasClickListener) {
    startLifeBtn.addEventListener('click', () => {
        playClickSound();
        startLife();
    });
    startLifeBtn._hasClickListener = true;
}

if (ageUpBtn && !ageUpBtn._hasClickListener) {
    ageUpBtn.addEventListener('click', () => {
        playClickSound();
        ageUp();
    });
    ageUpBtn._hasClickListener = true;
}

if (playAgainBtn && !playAgainBtn._hasClickListener) {
    playAgainBtn.addEventListener('click', () => {
        playClickSound();
        resetGame();
    });
    playAgainBtn._hasClickListener = true;
}

if (saveGameBtn && !saveGameBtn._hasClickListener) {
    saveGameBtn.addEventListener('click', () => {
        playClickSound();
        saveGame();
    });
    saveGameBtn._hasClickListener = true;
}

if (loadGameBtn && !loadGameBtn._hasClickListener) {
    loadGameBtn.addEventListener('click', () => {
        playClickSound();
        loadGame();
    });
    loadGameBtn._hasClickListener = true;
}

// Initialize the game
function initGame() {
    // Show character creation screen
    characterCreationScreen.classList.remove('hidden');
    mainGameScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    // Hide the start life text when in character creation
    document.querySelector('.start-life-text').style.display = 'none';
}

// Select gender
function selectGender(gender) {
    gameState.selectedGender = gender;
    
    // Update UI
    if (gender === 'Male') {
        maleBtn.classList.add('selected');
        femaleBtn.classList.remove('selected');
    } else {
        femaleBtn.classList.add('selected');
        maleBtn.classList.remove('selected');
    }
}

// Start life
function startLife() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('Please enter a name');
        return;
    }
    
    if (!gameState.selectedGender) {
        alert('Please select a gender');
        return;
    }
    
    // Set player data
    gameState.player.name = name;
    gameState.player.gender = gameState.selectedGender;
    
    // Generate random starting stats
    gameState.player.intelligence = Math.floor(Math.random() * 100);
    gameState.player.looks = Math.floor(Math.random() * 100);
    
    // Generate random parents
    const fatherFirstNames = ["Jacob", "Michael", "David", "John", "Robert"];
    const motherFirstNames = ["Susan", "Jennifer", "Mary", "Patricia", "Linda"];
    const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson"];
    const occupations = ["teacher", "doctor", "lawyer", "engineer", "artist", "writer", "chef", "photographer", "dancer", "musician"];
    
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fatherName = fatherFirstNames[Math.floor(Math.random() * fatherFirstNames.length)] + " " + lastName;
    const motherName = motherFirstNames[Math.floor(Math.random() * motherFirstNames.length)] + " " + lastName;
    const fatherOccupation = occupations[Math.floor(Math.random() * occupations.length)];
    const motherOccupation = occupations[Math.floor(Math.random() * occupations.length)];
    const fatherAge = 30 + Math.floor(Math.random() * 30);
    const motherAge = 25 + Math.floor(Math.random() * 15);
    
    // Set parent information
    gameState.player.father = {
        name: fatherName,
        occupation: fatherOccupation,
        age: fatherAge
    };
    
    gameState.player.mother = {
        name: motherName,
        occupation: motherOccupation,
        age: motherAge
    };
    
    // Initialize pet
    gameState.player.pet = {
        type: "dog",
        name: "Jack"
    };
    
    // Initialize birthplace and other details
    gameState.player.birthplace = "Portland, United States";
    gameState.player.birthCircumstance = "an accidental pregnancy";
    gameState.player.birthday = "January 27";
    gameState.player.zodiac = "Aquarius";
    
    // Switch to main game screen
    characterCreationScreen.classList.add('hidden');
    mainGameScreen.classList.remove('hidden');
    
    // Update player info
    playerName.textContent = gameState.player.name;
    playerStatus.textContent = 'Infant';
    bankBalance.textContent = '0';
    
    // Display welcome message
    eventText.innerHTML = `Welcome to the world, ${gameState.player.name}!<br>
                          You were born as a ${gameState.player.gender}.<br>
                          Intelligence: ${gameState.player.intelligence}%<br>
                          Looks: ${gameState.player.looks}%`;
    
    // Update bio text
    updateBioText();
    
    // Update stats display
    updateStatsDisplay();
    
    // Start with age 0
    gameState.player.age = 0;
    updateLifeStage();
    
    // Hide the start life text
    document.querySelector('.start-life-text').style.display = 'none';
    
    // Initialize tabs
    switchTab('infant');
}

// Age up the character
// Functions for sound effects
function playClickSound() {
    const clickSound = document.getElementById('click-sound');
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}

function playAgeUpSound() {
    const ageUpSound = document.getElementById('age-up-sound');
    if (ageUpSound) {
        ageUpSound.currentTime = 0;
        ageUpSound.play();
    }
}

function playGameOverSound() {
    const gameOverSound = document.getElementById('game-over-sound');
    if (gameOverSound) {
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }
}

// Add this new function if it doesn't already exist
function updateBioText() {
    document.getElementById('gender-text').textContent = gameState.player.gender.toLowerCase();
    document.getElementById('bio-name').textContent = gameState.player.name;
    document.getElementById('father-name').textContent = gameState.player.father.name;
    document.getElementById('father-occupation').textContent = gameState.player.father.occupation;
    document.getElementById('father-age').textContent = gameState.player.father.age;
    document.getElementById('mother-name').textContent = gameState.player.mother.name;
    document.getElementById('mother-occupation').textContent = gameState.player.mother.occupation;
    document.getElementById('mother-age').textContent = gameState.player.mother.age;
    
    // Update pet info if it exists
    if (gameState.player.pet) {
        document.getElementById('pet-info').textContent = "We have a family " + gameState.player.pet.type + " named " + gameState.player.pet.name + ".";
    }
}

function triggerRandomEvent() {
    if (Math.random() > 0.7) { // 30% chance of random event
        const events = [
            {
                name: "Lottery",
                minAge: 18,
                action: () => {
                    if (Math.random() > 0.95) { // 5% chance to win
                        const winnings = Math.floor(Math.random() * 10000) + 1000;
                        gameState.player.money += winnings;
                        return `You won $${winnings} in the lottery!`;
                    } else {
                        gameState.player.money -= 5;
                        return "You bought a lottery ticket but didn't win.";
                    }
                }
            },
            {
                name: "Illness",
                minAge: 0,
                action: () => {
                    const healthLoss = Math.floor(Math.random() * 20) + 5;
                    gameState.player.health = Math.max(0, gameState.player.health - healthLoss);
                    return `You got sick and lost ${healthLoss} health.`;
                }
            },
            {
                name: "Gift",
                minAge: 0,
                action: () => {
                    const moneyGift = Math.floor(Math.random() * 200) + 50;
                    gameState.player.money += moneyGift;
                    return `You received a gift of $${moneyGift}!`;
                }
            }
        ];
        
        // Filter events by age
        const availableEvents = events.filter(event => gameState.player.age >= event.minAge);
        
        if (availableEvents.length > 0) {
            const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
            return randomEvent.action();
        }
    }
    return "";
}

// Modify your ageUp function to call updateBioText
function ageUp() {
    playAgeUpSound();
    gameState.player.age++;
    
    // Update parent ages
    if (gameState.player.father) {
        gameState.player.father.age++;
    }
    if (gameState.player.mother) {
        gameState.player.mother.age++;
    }
    
    // Apply random life events based on age
    applyLifeEvents();
    
    // REMOVE THIS ENTIRE SECTION - Don't regenerate parents every time!
    // Generate random parents
    // const fatherFirstNames = ["Jacob", "Michael", "David", "John", "Robert"];
    // const motherFirstNames = ["Susan", "Jennifer", "Mary", "Patricia", "Linda"];
    // const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson"];
    // const occupations = ["teacher", "doctor", "lawyer", "engineer", "artist", "writer", "chef", "photographer", "dancer", "musician"];
    
    // const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    // const fatherName = fatherFirstNames[Math.floor(Math.random() * fatherFirstNames.length)] + " " + lastName;
    // const motherName = motherFirstNames[Math.floor(Math.random() * motherFirstNames.length)] + " " + lastName;
    // const fatherOccupation = occupations[Math.floor(Math.random() * occupations.length)];
    // const motherOccupation = occupations[Math.floor(Math.random() * occupations.length)];
    // const fatherAge = 30 + Math.floor(Math.random() * 30);
    // const motherAge = 25 + Math.floor(Math.random() * 15);
    
    // // Set parent information
    // gameState.player.father = {
    //     name: fatherName,
    //     occupation: fatherOccupation,
    //     age: fatherAge
    // };
    
    // gameState.player.mother = {
    //     name: motherName,
    //     occupation: motherOccupation,
    //     age: motherAge
    // };
    
    // Update relationships
    updateRelationships();
    
    // Update bio text
    updateBioText();
    
    // Update stats display
    updateStatsDisplay();
    
    // Update life stage
    updateLifeStage();
    
    // Check achievements
    checkAchievements();
    
    // Check if game should end
    if (gameState.player.age >= 80 || gameState.player.health <= 0) {
        endGame();
        return;
    }
    
    // Update action buttons based on age
    updateActionButtons();
    
    // Add age entry to history
    const ageHistory = document.querySelector('.age-history');
    const ageEntry = document.createElement('div');
    ageEntry.className = 'age-entry';
    ageEntry.textContent = `Age: ${gameState.player.age} years`;
    ageHistory.appendChild(ageEntry);
}

// Update life stage icons
function updateLifeStage() {
    // Reset all stages
    lifeStages.forEach(stage => stage.classList.remove('active'));
    
    // Set active stage based on age
    if (gameState.player.age < 5) {
        lifeStages[0].classList.add('active'); // Baby
        playerStatus.textContent = 'Infant';
        avatarImg.src = 'https://cdn-icons-png.flaticon.com/512/2948/2948035.png';
        babyIcon.src = 'https://cdn-icons-png.flaticon.com/512/2948/2948035.png';
    } else if (gameState.player.age < 18) {
        lifeStages[1].classList.add('active'); // Child
        playerStatus.textContent = 'Child';
        avatarImg.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png';
        babyIcon.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png';
    } else if (gameState.player.age < 30) {
        lifeStages[2].classList.add('active'); // Young Adult
        playerStatus.textContent = 'Young Adult';
        avatarImg.src = 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png';
        babyIcon.src = 'https://cdn-icons-png.flaticon.com/512/4086/4086679.png';
    } else if (gameState.player.age < 60) {
        lifeStages[3].classList.add('active'); // Adult
        playerStatus.textContent = 'Adult';
        avatarImg.src = 'https://cdn-icons-png.flaticon.com/512/4086/4086658.png';
        babyIcon.src = 'https://cdn-icons-png.flaticon.com/512/4086/4086658.png';
    } else {
        lifeStages[4].classList.add('active'); // Senior
        playerStatus.textContent = 'Senior';
        avatarImg.src = 'https://cdn-icons-png.flaticon.com/512/4086/4086774.png';
        babyIcon.src = 'https://cdn-icons-png.flaticon.com/512/4086/4086774.png';
    }
}

// Apply random life events based on age
function applyLifeEvents() {
    let eventMessage = `<strong>Age ${gameState.player.age}</strong><br><br>`;
    
    // Random chance for special events
    const randomChance = Math.random();
    
    if (gameState.player.age < 5) {
        // Early childhood events - expanded list
        const events = [
            "You said your first word!",
            "You took your first steps!",
            "You had your first birthday party!",
            "You learned to use the potty!",
            "You made a new friend at daycare!",
            "You learned how to count to 10!",
            "You drew your first picture!",
            "You had your first ice cream!",
            "You learned to ride a tricycle!",
            "You had your first playdate!"
        ];
        eventMessage += events[Math.floor(Math.random() * events.length)];
    } else if (gameState.player.age < 18) {
        // School age events - expanded list
        const events = [
            "You started school!",
            "You got an A on your test!",
            "You joined a sports team!",
            "You had a fight with your best friend.",
            "You developed a new hobby!",
            "You went to summer camp!",
            "You won a school competition!",
            "You had your first crush!",
            "You learned to play an instrument!",
            "You went on a school field trip!",
            "You got detention for talking in class.",
            "You were chosen for a special school project!"
        ];
        eventMessage += events[Math.floor(Math.random() * events.length)];
    } else if (gameState.player.age < 30) {
        // Young adult events
        const events = [
            "You graduated college!",
            "You got your first job!",
            "You went on a date!",
            "You moved into your own place!",
            "You traveled abroad!"
        ];
        eventMessage += events[Math.floor(Math.random() * events.length)];
    } else if (gameState.player.age < 60) {
        // Adult events
        const events = [
            "You got a promotion!",
            "You bought a new car!",
            "You got married!",
            "You had a child!",
            "You invested in stocks!"
        ];
        eventMessage += events[Math.floor(Math.random() * events.length)];
    } else {
        // Senior events
        const events = [
            "You retired!",
            "You became a grandparent!",
            "You took up gardening!",
            "You joined a book club!",
            "You went on a cruise!"
        ];
        eventMessage += events[Math.floor(Math.random() * events.length)];
    }
    
    // Random health changes
    const healthChange = Math.floor(Math.random() * 10) - 5;
    gameState.player.health = Math.max(0, Math.min(100, gameState.player.health + healthChange));
    
    // Random happiness changes
    const happinessChange = Math.floor(Math.random() * 10) - 3;
    gameState.player.happiness = Math.max(0, Math.min(100, gameState.player.happiness + happinessChange));
    
    // Random money changes based on age
    if (gameState.player.age >= 18) {
        const moneyChange = Math.floor(Math.random() * 1000);
        gameState.player.money += moneyChange;
        bankBalance.textContent = gameState.player.money;
    }
    
    // Display event
    eventText.innerHTML = eventMessage;
    
    // Random life events that can change the bio
    if (gameState.player.age === 5) {
    // Maybe the family gets a new pet
    const petTypes = ["dog", "cat", "hamster", "fish", "bird"];
    const petNames = ["Max", "Bella", "Charlie", "Luna", "Daisy", "Rocky", "Buddy"];
    
    if (Math.random() > 0.7) {
        const newPetType = petTypes[Math.floor(Math.random() * petTypes.length)];
        const newPetName = petNames[Math.floor(Math.random() * petNames.length)];
        
        gameState.player.pet.type = newPetType;
        gameState.player.pet.name = newPetName;
        
        eventMessage += `<br><br>Your family got a new ${newPetType} named ${newPetName}!`;
        updateBioText();
    }
    }
    
    if (gameState.player.age === 10) {
    // Maybe parents change occupation
    const occupations = ["teacher", "doctor", "lawyer", "engineer", "artist", "writer", "chef", "photographer", "dancer", "musician"];
    
    if (Math.random() > 0.7) {
        const newOccupation = occupations[Math.floor(Math.random() * occupations.length)];
        gameState.player.father.occupation = newOccupation;
        
        eventMessage += `<br><br>Your father changed careers and is now a ${newOccupation}!`;
        updateBioText();
    }
    }
    
    if (gameState.player.age === 15) {
    // Maybe parents divorce
    if (Math.random() > 0.8) {
        eventMessage += `<br><br>Your parents got divorced!`;
        
        // Update bio text to reflect divorce
        const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson"];
        const newLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        gameState.player.mother.name = gameState.player.mother.name.split(" ")[0] + " " + newLastName;
        
        updateBioText();
    }
    }
}

// Update stats display
function updateStatsDisplay() {
    ageValue.textContent = gameState.player.age;
    
    healthBar.style.width = `${gameState.player.health}%`;
    healthValue.textContent = gameState.player.health;
    
    happinessBar.style.width = `${gameState.player.happiness}%`;
    happinessValue.textContent = gameState.player.happiness;
    
    intelligenceBar.style.width = `${gameState.player.intelligence}%`;
    intelligenceValue.textContent = gameState.player.intelligence;
    
    looksBar.style.width = `${gameState.player.looks}%`;
    looksValue.textContent = gameState.player.looks;
    
    bankBalance.textContent = gameState.player.money;
}

// Update action buttons based on age
function updateActionButtons() {
    // Clear existing buttons
    actionButtonsContainer.innerHTML = '';
    
    let actions = [];
    
    if (gameState.player.age < 5) {
        actions = [
            { text: "Play with toys", handler: () => handleAction(1) },
            { text: "Learn to read", handler: () => handleAction(2) },
            { text: "Take a nap", handler: () => handleAction(3) }
        ];
    } else if (gameState.player.age < 18) {
        actions = [
            { text: "Study hard", handler: () => handleAction(1) },
            { text: "Hang out with friends", handler: () => handleAction(2) },
            { text: "Play sports", handler: () => handleAction(3) },
            { text: "Get into trouble", handler: () => handleAction(4) }
        ];
    } else if (gameState.player.age < 30) {
        actions = [
            { text: "Go to college", handler: () => handleAction(1) },
            { text: "Get a job", handler: () => handleAction(2) },
            { text: "Date someone", handler: () => handleAction(3) },
            { text: "Party", handler: () => handleAction(4) }
        ];
    } else {
        actions = [
            { text: "Work harder", handler: () => handleAction(1) },
            { text: "Spend time with family", handler: () => handleAction(2) },
            { text: "Exercise", handler: () => handleAction(3) },
            { text: "Take a vacation", handler: () => handleAction(4) }
        ];
    }
    
    // Create buttons for each action
    actions.forEach(action => {
        const button = document.createElement('button');
        button.className = 'action-btn';
        button.textContent = action.text;
        button.addEventListener('click', () => {
            playClickSound();
            action.handler();
        });
        actionButtonsContainer.appendChild(button);
    });
}

// Handle player action choice
function handleAction(option) {
    let actionResult = "";
    let cost = 0;
    
    switch(option) {
        case 1:
            if (gameState.player.age < 5) {
                actionResult = "You played with your toys. Happiness +10";
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
            } else if (gameState.player.age < 18) {
                actionResult = "You studied hard. Intelligence +5";
                gameState.player.intelligence = Math.min(100, gameState.player.intelligence + 5);
            } else if (gameState.player.age < 30) {
                actionResult = "You enrolled in college. Intelligence +15, Money -5000";
                gameState.player.intelligence = Math.min(100, gameState.player.intelligence + 15);
                cost = 5000;
                if (gameState.player.money >= cost) {
                    gameState.player.money -= cost;
                    gameState.player.education = "College";
                } else {
                    actionResult = "You can't afford college right now.";
                }
            } else {
                actionResult = "You worked overtime. Money +1000, Happiness -5";
                gameState.player.money += 1000;
                gameState.player.happiness = Math.max(0, gameState.player.happiness - 5);
            }
            break;
        case 2:
            if (gameState.player.age < 5) {
                actionResult = "You learned to read. Intelligence +5";
                gameState.player.intelligence = Math.min(100, gameState.player.intelligence + 5);
            } else if (gameState.player.age < 18) {
                actionResult = "You hung out with friends. Happiness +10";
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
            } else if (gameState.player.age < 30) {
                actionResult = getJob();
                updateStatsDisplay();
            } else {
                actionResult = "You spent time with family. Happiness +10";
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
            }
            break;
        case 3:
            if (gameState.player.age < 5) {
                actionResult = "You took a nap. Health +5";
                gameState.player.health = Math.min(100, gameState.player.health + 5);
            } else if (gameState.player.age < 18) {
                actionResult = "You played sports. Health +10, Looks +5";
                gameState.player.health = Math.min(100, gameState.player.health + 10);
                gameState.player.looks = Math.min(100, gameState.player.looks + 5);
            } else if (gameState.player.age < 30) {
                actionResult = "You went on a date. Happiness +10";
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
                // Chance to add a relationship
                if (Math.random() > 0.7) {
                    gameState.player.relationships.push({
                        type: "Dating",
                        name: ["Alex", "Sam", "Jordan", "Taylor", "Casey"][Math.floor(Math.random() * 5)]
                    });
                    actionResult += `<br>You started dating ${gameState.player.relationships[gameState.player.relationships.length - 1].name}!`;
                }
            } else {
                actionResult = "You exercised. Health +10";
                gameState.player.health = Math.min(100, gameState.player.health + 10);
            }
            break;
        case 4:
            if (gameState.player.age >= 5 && gameState.player.age < 18) {
                actionResult = "You got into trouble. Happiness +5, Intelligence -5";
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 5);
                gameState.player.intelligence = Math.max(0, gameState.player.intelligence - 5);
            } else if (gameState.player.age < 30) {
                actionResult = "You partied all night. Happiness +15, Health -5";
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 15);
                gameState.player.health = Math.max(0, gameState.player.health - 5);
            } else {
                actionResult = "You took a vacation. Happiness +20, Money -2000";
                cost = 2000;
                if (gameState.player.money >= cost) {
                    gameState.player.happiness = Math.min(100, gameState.player.happiness + 20);
                    gameState.player.money -= cost;
                } else {
                    actionResult = "You can't afford a vacation right now.";
                }
            }
            break;
    }
    
    // Update event text with action result
    eventText.innerHTML += `<br><br>${actionResult}`;
    
    // Update stats display
    updateStatsDisplay();
    
    // Update bank balance display
    bankBalance.textContent = gameState.player.money;
}

// End game
function endGame() {
    playGameOverSound();
    gameState.gameOver = true;
    
    // Hide main game screen and show game over screen
    mainGameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    
    // Calculate life score
    const lifeScore = calculateLifeScore();
    
    // Update game over screen
    const lifeSummary = document.getElementById('life-summary');
    const lifeScoreElement = document.getElementById('life-score');
    
    let summaryText = "";
    
    if (gameState.player.health <= 0) {
        summaryText += `<p>${gameState.player.name} has died at the age of ${gameState.player.age}.</p>`;
    } else {
        summaryText += `<p>${gameState.player.name} has lived a full life and died peacefully at the age of ${gameState.player.age}.</p>`;
    }
    
    summaryText += `<p>Education: ${gameState.player.education}</p>`;
    summaryText += `<p>Final Career: ${gameState.player.career || "None"}</p>`;
    summaryText += `<p>Money Accumulated: $${gameState.player.money}</p>`;
    summaryText += `<p>Relationships: ${gameState.player.relationships.length}</p>`;
    summaryText += `<p>Health: ${gameState.player.health}</p>`;
    summaryText += `<p>Happiness: ${gameState.player.happiness}</p>`;
    summaryText += `<p>Intelligence: ${gameState.player.intelligence}</p>`;
    summaryText += `<p>Looks: ${gameState.player.looks}</p>`;
    
    lifeSummary.innerHTML = summaryText;
    
    lifeScoreElement.innerHTML = `Final Life Score: ${lifeScore}`;
}

function calculateLifeScore() {
    // Calculate a score based on various life achievements
    let score = gameState.player.age * 2; // Base score from age
    
    // Add points for stats
    score += (gameState.player.health + gameState.player.happiness + 
              gameState.player.intelligence + gameState.player.looks) / 2;
    
    // Add points for money (diminishing returns)
    score += Math.sqrt(gameState.player.money / 100);
    
    // Add points for education
    if (gameState.player.education === "High School") score += 50;
    if (gameState.player.education === "College") score += 100;
    if (gameState.player.education === "Medical School" || 
        gameState.player.education === "Law School") score += 150;
    
    // Add points for relationships
    score += gameState.player.relationships.length * 10;
    
    return Math.floor(score);
}

// Function to get a job
function getJob() {
    const jobs = [
        {title: "Fast Food Worker", salary: 15000, education: "None"},
        {title: "Retail Clerk", salary: 18000, education: "None"},
        {title: "Office Assistant", salary: 25000, education: "High School"},
        {title: "Teacher", salary: 35000, education: "College"},
        {title: "Software Developer", salary: 60000, education: "College"},
        {title: "Doctor", salary: 120000, education: "Medical School"},
        {title: "Lawyer", salary: 90000, education: "Law School"}
    ];
    
    // Filter jobs based on education
    const availableJobs = jobs.filter(job => {
        if (job.education === "None") return true;
        if (job.education === "High School" && gameState.player.age >= 18) return true;
        if (job.education === "College" && gameState.player.education === "College") return true;
        if (job.education === "Medical School" && gameState.player.education === "Medical School") return true;
        if (job.education === "Law School" && gameState.player.education === "Law School") return true;
        return false;
    });
    
    if (availableJobs.length === 0) {
        return "No jobs available with your education level.";
    }
    
    const randomJob = availableJobs[Math.floor(Math.random() * availableJobs.length)];
    gameState.player.job = randomJob.title;
    gameState.player.salary = randomJob.salary;
    gameState.player.money += Math.floor(randomJob.salary / 12); // Monthly salary
    
    return `You got a job as a ${randomJob.title} with a salary of $${randomJob.salary} per year!`;
}

// Reset game
function resetGame() {
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
        relationships: [],
        job: "",
        jobLevel: 0,
        salary: 0
    };
    gameState.gameOver = false;
    gameState.selectedGender = null;
    
    // Reset UI
    maleBtn.classList.remove('selected');
    femaleBtn.classList.remove('selected');
    document.getElementById('name').value = '';
    
    // Start a new game
    initGame();
}

// Start the game when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Try to load a saved game first
    if (!loadGame()) {
        // If no saved game, start a new game
        initGame();
    }
});

// Add this new function to update the bio text
function updateBioText() {
    // Update basic info
    if (document.getElementById('gender-text')) {
        document.getElementById('gender-text').textContent = gameState.player.gender.toLowerCase();
    }
    if (document.getElementById('birthplace')) {
        document.getElementById('birthplace').textContent = gameState.player.birthplace;
    }
    if (document.getElementById('birth-circumstance')) {
        document.getElementById('birth-circumstance').textContent = "I was " + gameState.player.birthCircumstance + ".";
    }
    if (document.getElementById('birthday')) {
        document.getElementById('birthday').textContent = gameState.player.birthday;
    }
    if (document.getElementById('zodiac')) {
        document.getElementById('zodiac').textContent = gameState.player.zodiac;
    }
    if (document.getElementById('bio-name')) {
        document.getElementById('bio-name').textContent = gameState.player.name;
    }
    
    // Update parent info if they exist
    if (gameState.player.father) {
        if (document.getElementById('father-name')) {
            document.getElementById('father-name').textContent = gameState.player.father.name;
        }
        if (document.getElementById('father-occupation')) {
            document.getElementById('father-occupation').textContent = gameState.player.father.occupation;
        }
        if (document.getElementById('father-age')) {
            document.getElementById('father-age').textContent = gameState.player.father.age;
        }
    }
    
    if (gameState.player.mother) {
        if (document.getElementById('mother-name')) {
            document.getElementById('mother-name').textContent = gameState.player.mother.name;
        }
        if (document.getElementById('mother-occupation')) {
            document.getElementById('mother-occupation').textContent = gameState.player.mother.occupation;
        }
        if (document.getElementById('mother-age')) {
            document.getElementById('mother-age').textContent = gameState.player.mother.age;
        }
    }
    
    // Update pet info if it exists
    if (gameState.player.pet && document.getElementById('pet-info')) {
        document.getElementById('pet-info').textContent = "We have a family " + gameState.player.pet.type + " named " + gameState.player.pet.name + ".";
    }
}

function saveGame() {
    localStorage.setItem('bitLifeGameState', JSON.stringify(gameState));
    alert('Game saved successfully!');
}

function loadGame() {
    const savedGame = localStorage.getItem('bitLifeGameState');
    if (savedGame) {
        Object.assign(gameState, JSON.parse(savedGame));
        
        // Update UI with loaded game state
        characterCreationScreen.classList.add('hidden');
        mainGameScreen.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        
        // Update player info
        playerName.textContent = gameState.player.name;
        updateLifeStage();
        updateStatsDisplay();
        updateBioText();
        updateActionButtons();
        
        // Display welcome back message
        eventText.innerHTML = `Welcome back, ${gameState.player.name}!<br>You are now ${gameState.player.age} years old.`;
        
        return true;
    }
    return false;
}

// Add these functions to update the different tab displays
function updateRelationshipsDisplay() {
    // Check if the relationships content element exists
    if (!relationshipsContent) {
        console.error("Relationships content element not found");
        return;
    }
    
    // Clear existing relationships
    relationshipsContent.innerHTML = '<h3>Relationships</h3>';
    
    // Create a container for relationships
    const relationshipsList = document.createElement('div');
    relationshipsList.className = 'relationships-list';
    
    // Add family relationships
    if (gameState.player.father && gameState.player.mother) {
        const fatherItem = document.createElement('div');
        fatherItem.className = 'relationship-item';
        fatherItem.innerHTML = `
            <div class="relationship-icon"><i class="fas fa-male"></i></div>
            <div class="relationship-details">
                <div class="relationship-name">Father: ${gameState.player.father.name}</div>
                <div class="relationship-status">Occupation: ${gameState.player.father.occupation}</div>
                <div class="relationship-age">Age: ${gameState.player.father.age}</div>
            </div>
        `;
        
        const motherItem = document.createElement('div');
        motherItem.className = 'relationship-item';
        motherItem.innerHTML = `
            <div class="relationship-icon"><i class="fas fa-female"></i></div>
            <div class="relationship-details">
                <div class="relationship-name">Mother: ${gameState.player.mother.name}</div>
                <div class="relationship-status">Occupation: ${gameState.player.mother.occupation}</div>
                <div class="relationship-age">Age: ${gameState.player.mother.age}</div>
            </div>
        `;
        
        relationshipsList.appendChild(fatherItem);
        relationshipsList.appendChild(motherItem);
    }
    
    // Add pet relationship if it exists
    if (gameState.player.pet) {
        const petItem = document.createElement('div');
        petItem.className = 'relationship-item';
        petItem.innerHTML = `
            <div class="relationship-icon"><i class="fas fa-paw"></i></div>
            <div class="relationship-details">
                <div class="relationship-name">Pet: ${gameState.player.pet.name}</div>
                <div class="relationship-status">Type: ${gameState.player.pet.type}</div>
            </div>
        `;
        relationshipsList.appendChild(petItem);
    }
    
    // Add other relationships if they exist
    if (gameState.player.relationships && gameState.player.relationships.length > 0) {
        gameState.player.relationships.forEach(relationship => {
            const relationshipItem = document.createElement('div');
            relationshipItem.className = 'relationship-item';
            relationshipItem.innerHTML = `
                <div class="relationship-icon"><i class="fas fa-user"></i></div>
                <div class="relationship-details">
                    <div class="relationship-name">${relationship.type}: ${relationship.name}</div>
                    <div class="relationship-status">Relationship: ${relationship.status || 'Friend'}</div>
                </div>
            `;
            relationshipsList.appendChild(relationshipItem);
        });
    }
    
    relationshipsContent.appendChild(relationshipsList);
}

function updateActivitiesDisplay() {
    // Check if the activities content element exists
    if (!activitiesContent) {
        console.error("Activities content element not found");
        return;
    }
    
    // Create a container for activities if it doesn't exist
    let activitiesList = activitiesContent.querySelector('.activities-list');
    if (!activitiesList) {
        activitiesList = document.createElement('div');
        activitiesList.className = 'activities-list';
        activitiesContent.appendChild(activitiesList);
    }
    
    // Clear existing activities
    activitiesList.innerHTML = '';
    
    // Add age-appropriate activities
    let activities = [];
    
    if (gameState.player.age < 5) {
        activities = ["Play with toys", "Learn to read", "Take a nap", "Play with parents"];
    } else if (gameState.player.age < 18) {
        activities = ["Study hard", "Hang out with friends", "Play sports", "Get into trouble"];
    } else if (gameState.player.age < 30) {
        activities = ["Go to college", "Get a job", "Date someone", "Party"];
    } else {
        activities = ["Work harder", "Spend time with family", "Exercise", "Take a vacation"];
    }
    
    // Create buttons for each activity
    activities.forEach(activity => {
        const button = document.createElement('button');
        button.className = 'activity-btn';
        button.textContent = activity;
        button.addEventListener('click', () => {
            playClickSound();
            // Handle activity click
            let result = "";
            
            // Add some random effects based on the activity
            if (activity === "Play with toys" || activity === "Play with parents") {
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
                result = `You ${activity.toLowerCase()}. Happiness +10`;
            } else if (activity === "Learn to read" || activity === "Study hard") {
                gameState.player.intelligence = Math.min(100, gameState.player.intelligence + 5);
                result = `You ${activity.toLowerCase()}. Intelligence +5`;
            } else if (activity === "Take a nap") {
                gameState.player.health = Math.min(100, gameState.player.health + 5);
                result = `You ${activity.toLowerCase()}. Health +5`;
            } else if (activity === "Hang out with friends" || activity === "Party") {
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 15);
                gameState.player.health = Math.max(0, gameState.player.health - 5);
                result = `You ${activity.toLowerCase()}. Happiness +15, Health -5`;
            } else if (activity === "Play sports" || activity === "Exercise") {
                gameState.player.health = Math.min(100, gameState.player.health + 10);
                gameState.player.looks = Math.min(100, gameState.player.looks + 5);
                result = `You ${activity.toLowerCase()}. Health +10, Looks +5`;
            } else if (activity === "Get into trouble") {
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 5);
                gameState.player.intelligence = Math.max(0, gameState.player.intelligence - 5);
                result = `You ${activity.toLowerCase()}. Happiness +5, Intelligence -5`;
            } else if (activity === "Go to college") {
                gameState.player.intelligence = Math.min(100, gameState.player.intelligence + 15);
                gameState.player.money = Math.max(0, gameState.player.money - 5000);
                result = `You ${activity.toLowerCase()}. Intelligence +15, Money -5000`;
            } else if (activity === "Get a job") {
                gameState.player.money += 2000;
                gameState.player.happiness = Math.max(0, gameState.player.happiness - 5);
                result = `You ${activity.toLowerCase()}. Money +2000, Happiness -5`;
            } else if (activity === "Date someone") {
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
                
                // Add a new relationship
                const names = ["Alex", "Jamie", "Taylor", "Jordan", "Casey", "Riley"];
                const newRelationship = {
                    name: names[Math.floor(Math.random() * names.length)],
                    type: "Dating",
                    status: "Dating"
                };
                
                if (!gameState.player.relationships) {
                    gameState.player.relationships = [];
                }
                
                gameState.player.relationships.push(newRelationship);
                result = `You ${activity.toLowerCase()}. Happiness +10. You started dating ${newRelationship.name}!`;
            } else if (activity === "Work harder") {
                gameState.player.money += 3000;
                gameState.player.happiness = Math.max(0, gameState.player.happiness - 10);
                result = `You ${activity.toLowerCase()}. Money +3000, Happiness -10`;
            } else if (activity === "Spend time with family") {
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 15);
                result = `You ${activity.toLowerCase()}. Happiness +15`;
            } else if (activity === "Take a vacation") {
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 20);
                gameState.player.money = Math.max(0, gameState.player.money - 2000);
                result = `You ${activity.toLowerCase()}. Happiness +20, Money -2000`;
            } else {
                result = `You ${activity.toLowerCase()}.`;
            }
            
            // Update event text with activity result
            eventText.innerHTML += `<br><br>${result}`;
            
            // Update stats display
            updateStatsDisplay();
        });
        
        activitiesList.appendChild(button);
    });
}

// DOM Elements - Check if they already exist before declaring
// Use var instead of const to avoid block-scoped redeclaration errors
var characterCreationScreen = characterCreationScreen || document.getElementById('character-creation');
var mainGameScreen = mainGameScreen || document.getElementById('main-game');
var gameOverScreen = gameOverScreen || document.getElementById('game-over');

var maleBtn = maleBtn || document.getElementById('male-btn');
var femaleBtn = femaleBtn || document.getElementById('female-btn');
var startLifeBtn = startLifeBtn || document.getElementById('start-life-btn');
var ageUpBtn = ageUpBtn || document.getElementById('age-up-btn');
var playAgainBtn = playAgainBtn || document.getElementById('play-again-btn');
var saveGameBtn = saveGameBtn || document.getElementById('save-game-btn');
var loadGameBtn = loadGameBtn || document.getElementById('load-game-btn');
var actionButtonsContainer = actionButtonsContainer || document.getElementById('action-buttons');
var eventText = eventText || document.getElementById('event-text');

// Tab elements
var infantTab = infantTab || document.getElementById('infant-tab');
var assetsTab = assetsTab || document.getElementById('assets-tab');
var relationshipsTab = relationshipsTab || document.getElementById('relationships-tab');
var activitiesTab = activitiesTab || document.getElementById('activities-tab');

var infantContent = infantContent || document.getElementById('infant-content');
var assetsContent = assetsContent || document.getElementById('assets-content');
var relationshipsContent = relationshipsContent || document.getElementById('relationships-content');
var activitiesContent = activitiesContent || document.getElementById('activities-content');

// Stat display elements
var playerName = playerName || document.getElementById('player-name');
var playerStatus = playerStatus || document.getElementById('player-status');
var bankBalance = bankBalance || document.getElementById('bank-balance');
var ageValue = ageValue || document.getElementById('age-value');
var healthBar = healthBar || document.getElementById('health-bar');
var healthValue = healthValue || document.getElementById('health-value');
var happinessBar = happinessBar || document.getElementById('happiness-bar');
var happinessValue = happinessValue || document.getElementById('happiness-value');
var intelligenceBar = intelligenceBar || document.getElementById('intelligence-bar');
var intelligenceValue = intelligenceValue || document.getElementById('intelligence-value');
var looksBar = looksBar || document.getElementById('looks-bar');
var looksValue = looksValue || document.getElementById('looks-value');
var avatarImg = avatarImg || document.getElementById('avatar-img');
var babyIcon = babyIcon || document.getElementById('baby-icon');

// Add these event listeners with other event listeners - Only add if they don't already exist
if (infantTab && !infantTab._hasClickListener) {
    infantTab.addEventListener('click', () => {
        playClickSound();
        switchTab('infant');
    });
    infantTab._hasClickListener = true;
}

if (assetsTab && !assetsTab._hasClickListener) {
    assetsTab.addEventListener('click', () => {
        playClickSound();
        switchTab('assets');
    });
    assetsTab._hasClickListener = true;
}

if (relationshipsTab && !relationshipsTab._hasClickListener) {
    relationshipsTab.addEventListener('click', () => {
        playClickSound();
        switchTab('relationships');
    });
    relationshipsTab._hasClickListener = true;
}

if (activitiesTab && !activitiesTab._hasClickListener) {
    activitiesTab.addEventListener('click', () => {
        playClickSound();
        switchTab('activities');
    });
    activitiesTab._hasClickListener = true;
}

// Add or update the switchTab function
function switchTab(tabName) {
    // Hide all tab contents
    infantContent.classList.remove('active-tab');
    assetsContent.classList.remove('active-tab');
    relationshipsContent.classList.remove('active-tab');
    activitiesContent.classList.remove('active-tab');
    
    // Remove active class from all tabs
    infantTab.classList.remove('active');
    assetsTab.classList.remove('active');
    relationshipsTab.classList.remove('active');
    activitiesTab.classList.remove('active');
    
    // Show selected tab content and mark tab as active
    if (tabName === 'infant') {
        infantContent.classList.add('active-tab');
        infantTab.classList.add('active');
    } else if (tabName === 'assets') {
        assetsContent.classList.add('active-tab');
        assetsTab.classList.add('active');
        updateAssetsDisplay();
    } else if (tabName === 'relationships') {
        relationshipsContent.classList.add('active-tab');
        relationshipsTab.classList.add('active');
        updateRelationshipsDisplay();
    } else if (tabName === 'activities') {
        activitiesContent.classList.add('active-tab');
        activitiesTab.classList.add('active');
    }
}

// Add a function to handle activities
function handleActivity(activityType) {
    let activityResult = "";
    let costAmount = 0;
    
    switch(activityType) {
        case 'doctor':
            activityResult = "You visited the doctor. Health +20";
            gameState.player.health = Math.min(100, gameState.player.health + 20);
            costAmount = 200;
            break;
        case 'gym':
            activityResult = "You worked out at the gym. Health +10, Looks +5";
            gameState.player.health = Math.min(100, gameState.player.health + 10);
            gameState.player.looks = Math.min(100, gameState.player.looks + 5);
            costAmount = 50;
            break;
        case 'library':
            activityResult = "You studied at the library. Intelligence +15";
            gameState.player.intelligence = Math.min(100, gameState.player.intelligence + 15);
            costAmount = 0;
            break;
        case 'movie':
            activityResult = "You went to see a movie. Happiness +15";
            gameState.player.happiness = Math.min(100, gameState.player.happiness + 15);
            costAmount = 20;
            break;
        case 'nightlife':
            activityResult = "You went clubbing. Happiness +20, Health -5";
            gameState.player.happiness = Math.min(100, gameState.player.happiness + 20);
            gameState.player.health = Math.max(0, gameState.player.health - 5);
            costAmount = 100;
            break;
        case 'mind-body':
            activityResult = "You took a yoga class. Health +10, Happiness +10";
            gameState.player.health = Math.min(100, gameState.player.health + 10);
            gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
            costAmount = 30;
            break;
        case 'pets':
            if (!gameState.player.hasPet) {
                activityResult = "You adopted a pet! Happiness +25";
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 25);
                gameState.player.hasPet = true;
                costAmount = 500;
            } else {
                activityResult = "You played with your pet. Happiness +10";
                gameState.player.happiness = Math.min(100, gameState.player.happiness + 10);
                costAmount = 0;
            }
            break;
        case 'salon':
            activityResult = "You got a makeover. Looks +15";
            gameState.player.looks = Math.min(100, gameState.player.looks + 15);
            costAmount = 150;
            break;
        case 'vacation':
            activityResult = "You took a vacation. Happiness +30, Health +10";
            gameState.player.happiness = Math.min(100, gameState.player.happiness + 30);
            gameState.player.health = Math.min(100, gameState.player.health + 10);
            costAmount = 2000;
            break;
        default:
            activityResult = "You tried a new activity. Happiness +5";
            gameState.player.happiness = Math.min(100, gameState.player.happiness + 5);
            costAmount = 50;
    }
    
    // Check if player has enough money
    if (gameState.player.money >= costAmount) {
        gameState.player.money -= costAmount;
        eventText.innerHTML += `<br><br>${activityResult}`;
        if (costAmount > 0) {
            eventText.innerHTML += `<br>Cost: $${costAmount}`;
        }
    } else {
        eventText.innerHTML += "<br><br>You don't have enough money for this activity!";
    }
    
    // Update stats display
    updateStatsDisplay();
    
    // Update bank balance display
    bankBalance.textContent = gameState.player.money;
    
    // Switch back to infant tab to show the event result
    switchTab('infant');
}

// Add a function to update assets display
function updateAssetsDisplay() {
    // Check if the assets content element exists
    if (!assetsContent) {
        console.error("Assets content element not found");
        return;
    }
    
    // Clear existing assets
    assetsContent.innerHTML = '<h3>Assets</h3>';
    
    // Create a container for assets
    const assetsList = document.createElement('div');
    assetsList.className = 'assets-list';
    
    // Add cash asset
    const cashAsset = document.createElement('div');
    cashAsset.className = 'asset-item';
    cashAsset.innerHTML = `
        <div class="asset-icon"><i class="fas fa-money-bill-wave"></i></div>
        <div class="asset-details">
            <div class="asset-name">Cash</div>
            <div class="asset-value">$${gameState.player.money}</div>
        </div>
    `;
    assetsList.appendChild(cashAsset);
    
    // Add cars if player is old enough
    if (gameState.player.age >= 16) {
        const carItem = document.createElement('div');
        carItem.className = 'asset-item';
        carItem.innerHTML = `
            <div class="asset-icon"><i class="fas fa-car"></i></div>
            <div class="asset-details">
                <div class="asset-name">Cars</div>
                <div class="asset-value">View your cars</div>
            </div>
            <div class="asset-arrow"><i class="fas fa-chevron-right"></i></div>
        `;
        assetsList.appendChild(carItem);
    }
    
    // Add real estate if player is old enough
    if (gameState.player.age >= 18) {
        const realEstateItem = document.createElement('div');
        realEstateItem.className = 'asset-item';
        realEstateItem.innerHTML = `
            <div class="asset-icon"><i class="fas fa-home"></i></div>
            <div class="asset-details">
                <div class="asset-name">Real Estate</div>
                <div class="asset-value">View your real estate</div>
            </div>
            <div class="asset-arrow"><i class="fas fa-chevron-right"></i></div>
        `;
        assetsList.appendChild(realEstateItem);
    }
    
    assetsContent.appendChild(assetsList);
    
    // Add net worth section
    const netWorth = document.createElement('div');
    netWorth.className = 'net-worth';
    netWorth.innerHTML = `
        <div class="net-worth-label">Net Worth</div>
        <div class="net-worth-value">$${gameState.player.money}</div>
    `;
    assetsContent.appendChild(netWorth);
}

// Function to get a job
function getJob() {
    const jobs = [
        {title: "Fast Food Worker", salary: 15000, education: "None"},
        {title: "Retail Clerk", salary: 18000, education: "None"},
        {title: "Office Assistant", salary: 25000, education: "High School"},
        {title: "Teacher", salary: 35000, education: "College"},
        {title: "Software Developer", salary: 60000, education: "College"},
        {title: "Doctor", salary: 120000, education: "Medical School"},
        {title: "Lawyer", salary: 90000, education: "Law School"}
    ];
    
    // Filter jobs based on education
    const availableJobs = jobs.filter(job => {
        if (job.education === "None") return true;
        if (job.education === "High School" && gameState.player.age >= 18) return true;
        if (job.education === "College" && gameState.player.education === "College") return true;
        if (job.education === "Medical School" && gameState.player.education === "Medical School") return true;
        if (job.education === "Law School" && gameState.player.education === "Law School") return true;
        return false;
    });
    
    if (availableJobs.length === 0) {
        return "No jobs available with your education level.";
    }
    
    const randomJob = availableJobs[Math.floor(Math.random() * availableJobs.length)];
    gameState.player.job = randomJob.title;
    gameState.player.salary = randomJob.salary;
    gameState.player.money += Math.floor(randomJob.salary / 12); // Monthly salary
    
    return `You got a job as a ${randomJob.title} with a salary of $${randomJob.salary} per year!`;
}

// Reset game
function resetGame() {
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
        relationships: [],
        job: "",
        jobLevel: 0,
        salary: 0
    };
    gameState.gameOver = false;
    gameState.selectedGender = null;
    
    // Reset UI
    maleBtn.classList.remove('selected');
    femaleBtn.classList.remove('selected');
    document.getElementById('name').value = '';
    
    // Start a new game
    initGame();
}

// Start the game when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Try to load a saved game first
    if (!loadGame()) {
        // If no saved game, start a new game
        initGame();
    }
});

// Add this new function to update the bio text
function updateBioText() {
    // Update basic info
    if (document.getElementById('gender-text')) {
        document.getElementById('gender-text').textContent = gameState.player.gender.toLowerCase();
    }
    if (document.getElementById('birthplace')) {
        document.getElementById('birthplace').textContent = gameState.player.birthplace;
    }
    if (document.getElementById('birth-circumstance')) {
        document.getElementById('birth-circumstance').textContent = "I was " + gameState.player.birthCircumstance + ".";
    }
    if (document.getElementById('birthday')) {
        document.getElementById('birthday').textContent = gameState.player.birthday;
    }
    if (document.getElementById('zodiac')) {
        document.getElementById('zodiac').textContent = gameState.player.zodiac;
    }
    if (document.getElementById('bio-name')) {
        document.getElementById('bio-name').textContent = gameState.player.name;
    }
    
    // Update parent info if they exist
    if (gameState.player.father) {
        if (document.getElementById('father-name')) {
            document.getElementById('father-name').textContent = gameState.player.father.name;
        }
        if (document.getElementById('father-occupation')) {
            document.getElementById('father-occupation').textContent = gameState.player.father.occupation;
        }
        if (document.getElementById('father-age')) {
            document.getElementById('father-age').textContent = gameState.player.father.age;
        }
    }
    
    if (gameState.player.mother) {
        if (document.getElementById('mother-name')) {
            document.getElementById('mother-name').textContent = gameState.player.mother.name;
        }
        if (document.getElementById('mother-occupation')) {
            document.getElementById('mother-occupation').textContent = gameState.player.mother.occupation;
        }
        if (document.getElementById('mother-age')) {
            document.getElementById('mother-age').textContent = gameState.player.mother.age;
        }
    }
    
    // Update pet info if it exists
    if (gameState.player.pet && document.getElementById('pet-info')) {
        document.getElementById('pet-info').textContent = "We have a family " + gameState.player.pet.type + " named " + gameState.player.pet.name + ".";
    }
}

function saveGame() {
    localStorage.setItem('bitLifeGameState', JSON.stringify(gameState));
    alert('Game saved successfully!');
}

function loadGame() {
    const savedGame = localStorage.getItem('bitLifeGameState');
    if (savedGame) {
        Object.assign(gameState, JSON.parse(savedGame));
        
        // Update UI with loaded game state
        characterCreationScreen.classList.add('hidden');
        mainGameScreen.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        
        // Update player info
        playerName.textContent = gameState.player.name;
        updateLifeStage();
        updateStatsDisplay();
        updateBioText();
        updateActionButtons();
        
        // Display welcome back message
        eventText.innerHTML = `Welcome back, ${gameState.player.name}!<br>You are now ${gameState.player.age} years old.`;
        
        return true;
    }
    return false;
}