// Exercise routine
const routine = [
    { name: "Warmup", duration: 30, isRest: true },
    
    // Set 1
    { name: "Step-Jacks", duration: 20, isRest: false },
    { name: "Burpees", duration: 20, isRest: false },
    { name: "Squats", duration: 20, isRest: false },
    { name: "Rest", duration: 30, isRest: true },

    // Set 2
    { name: "Step-Jacks", duration: 20, isRest: false },
    { name: "Burpees", duration: 20, isRest: false },
    { name: "Squats", duration: 20, isRest: false },
    { name: "Rest", duration: 30, isRest: true },

    // Set 3
    { name: "Step-Jacks", duration: 20, isRest: false },
    { name: "Burpees", duration: 20, isRest: false },
    { name: "Squats", duration: 20, isRest: false },
    { name: "Rest", duration: 30, isRest: true },

    // Set 4
    { name: "Step-Jacks", duration: 20, isRest: false },
    { name: "Burpees", duration: 20, isRest: false },
    { name: "Squats", duration: 20, isRest: false },

    { name: "Cool Down", duration: 30, isRest: true }
];

// DOM elements
const timerDisplay = document.getElementById('timer');
const exerciseInfo = document.getElementById('exerciseInfo');
const currentSetDisplay = document.getElementById('currentSet');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const progressBar = document.getElementById('progressBar');
const countdownSound = document.getElementById('countdownSound');

// Timer variables
let currentExerciseIndex = 0;
let timeLeft = routine[0].duration;
let timerInterval = null;
let isRunning = false;

// Update the timer display
function updateDisplay() 
{
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update exercise info
    const exercise = routine[currentExerciseIndex];
    exerciseInfo.textContent = exercise.name;
    exerciseInfo.style.color = exercise.isRest ? '#4CAF50' : '#4a6fa5';
    
    // Update set information
    if (currentExerciseIndex !== 0 && !routine[currentExerciseIndex].isRest) 
    {
        const setNumber = Math.floor((currentExerciseIndex - 1) / 4) + 1;
        currentSetDisplay.textContent = `Set ${setNumber}`;
    } 
    else if (routine[currentExerciseIndex].isRest) 
    {
        currentSetDisplay.textContent = "";
    }
    
    // Update progress bar
    const totalDuration = routine[currentExerciseIndex].duration;
    const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
    progressBar.style.width = `${progress}%`;
}

// Play sound
function playSound(sound) 
{
    sound.currentTime = 0;
    sound.play().catch(e => console.log("Audio play failed:", e));
}

// Move to next exercise
function nextExercise() 
{
    if (currentExerciseIndex < routine.length - 1) 
    {
        exerciseInfo.textContent = "Next exercise starting...!!";
        exerciseInfo.style.color = "#FF9800";
        timerDisplay.textContent = "00:00";
    }
    
    setTimeout(() => 
    {
        currentExerciseIndex++;
        if (currentExerciseIndex < routine.length) 
        {
            timeLeft = routine[currentExerciseIndex].duration;
            updateDisplay();
            startTimer();
        } 
        else 
            exerciseFinished();
    }, 2000);
}

// Countdown function
function runTimer() 
{
    timeLeft--;
    updateDisplay();
    
    // Play countdown sound
    if (timeLeft == 3)
        playSound(countdownSound);
    
    // When time's up
    if (timeLeft == 0) 
    {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        nextExercise();
    }
}

// Start the timer
function startTimer() 
{
    if (!isRunning) 
    {
        isRunning = true;
        timerInterval = setInterval(runTimer, 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }
}

// Stop the timer
function stopTimer() 
{
    if (timerInterval) 
    {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

// When all exercises are finished
function exerciseFinished() 
{
    stopTimer();
    exerciseInfo.textContent = "Workout Complete!";
    exerciseInfo.style.color = "#4CAF50";
    currentSetDisplay.textContent = "Great job!";
    timerDisplay.textContent = "00:00";
    progressBar.style.width = "100%";
}

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

// Initialize display
updateDisplay();