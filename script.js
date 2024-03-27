import { generatePermutations } from './scripts/generatePermutations.js';
import { notify } from './scripts/notify.js';

// --------------------------------------
// Global Variables
// --------------------------------------

let swInput; // starting weight
let twInput; // target weight
let pwInput; // pilot weight
let wInput; // weights

// --------------------------------------
// Local Storage Functions
// --------------------------------------

// Get the local storage form values
const getLocalFormValues = () => {
  const swStoredVal = localStorage.getItem('sw');
  const twStoredVal = localStorage.getItem('tw');
  const pwStoredVal = localStorage.getItem('pw');
  const wStoredVal = localStorage.getItem('w');

  return { swStoredVal, twStoredVal, pwStoredVal, wStoredVal };
};

// Set the local storage form values with param values
const setLocalFormValues = (swVal, twVal, pwVal, wVal) => {
  localStorage.setItem('sw', swVal);
  localStorage.setItem('tw', twVal);
  localStorage.setItem('pw', pwVal);
  localStorage.setItem('w', wVal);
};

// --------------------------------------
// Display Functions
// --------------------------------------

// Get the correct text to display the weight as a string
const generateWeightString = (weight) => {
  if (!weight || weight <= 0 || weight === Number.MAX_VALUE) {
    return 'n/a';
  }

  return weight + ' kg';
};

const updatePassengerWeights = (noOfPax, weights, totalWeight) => {
  // Get the correct passenger list
  const paxDisplayForm = document.querySelector('#passengerDisplayForm').children;
  const paxBox = paxDisplayForm[noOfPax - 1];
  const paxList = Array.from(paxBox.querySelectorAll('.passengerBox'));

  // Update each value according to the array
  for (let i = 0; i < noOfPax; i++) {
    paxList[i].innerText = generateWeightString(weights[i]);
  }

  // Update the total weight
  const totalWeightElem = paxBox.querySelector('.totalWeight');
  totalWeightElem.innerText = 'Total Weight: ' + generateWeightString(totalWeight);
};

// --------------------------------------
// Form Functions
// --------------------------------------

// Get all of the values from the form
const getFormValues = () => {
  const swFormVal = swInput.value;
  const twFormVal = twInput.value;
  const pwFormVal = pwInput.value;
  const wFormVal = wInput.value;

  return { swFormVal, twFormVal, pwFormVal, wFormVal };
};

// Set the values in the form
const setFormValues = (swVal, twVal, pwVal, wVal) => {
  swInput.value = swVal;
  twInput.value = twVal;
  pwInput.value = pwVal;
  wInput.value = wVal;
};

// Calculate weights handler
const handleCalculateWeights = () => {
  // Get all values from the form
  const { swFormVal, twFormVal, pwFormVal, wFormVal } = getFormValues();

  // Save the form values to our local storage
  setLocalFormValues(swFormVal, twFormVal, pwFormVal, wFormVal);

  // Format the weight list into an array of integers
  const formattedW = wFormVal.split('\n').map((val) => parseInt(val, 10));

  // Calculate the actual target weight we are trying to reach from our weight list
  const actualTw = parseInt(twFormVal) - parseInt(swFormVal) - parseInt(pwFormVal);

  // Generate all permutations given the weights
  const genPermus = generatePermutations(formattedW, actualTw);

  // Update the passenger weights
  updatePassengerWeights(1, genPermus.one.values, genPermus.one.sum);
  updatePassengerWeights(2, genPermus.two.values, genPermus.two.sum);
  updatePassengerWeights(3, genPermus.three.values, genPermus.three.sum);
};

// --------------------------------------
// Helper Button Functions
// --------------------------------------

// Copy the values from the passenger list to clipboard
const copyValues = (noOfPax) => {
  // Get the values from the passenger list
  const paxDisplayForm = document.querySelector('#passengerDisplayForm').children;
  const paxBox = paxDisplayForm[noOfPax - 1];
  const paxList = Array.from(paxBox.querySelectorAll('.passengerBox'));

  // Store the number values into an array of strings
  const valList = [];
  for (let i = 0; i < paxList.length; i++) {
    const val = paxList[i].innerText;

    if (val.split(' ').length > 1) {
      valList.push(val.split(' ')[0]);
    }
  }

  // Add pilot weight to array
  const { pwFormVal } = getFormValues();
  valList.unshift(pwFormVal);

  // Format the values to allow correct pasting
  const formattedValues = valList.join('\n');

  // Save the text to the clipboard
  navigator.clipboard.writeText(formattedValues);

  // Notify
  notify('Weights copied!', 'You have copied all the weights (including the pilot).');
};

// Remove the values from the weights form input
const handleRemoveWeights = (noOfPax) => {
  // Get the values from the passenger list
  const paxDisplayForm = document.querySelector('#passengerDisplayForm').children;
  const paxBox = paxDisplayForm[noOfPax - 1];
  const paxList = Array.from(paxBox.querySelectorAll('.passengerBox'));

  // Store the number values into an array of strings
  const valList = [];
  for (let i = 0; i < paxList.length; i++) {
    const val = paxList[i].innerText;

    if (val.split(' ').length > 1) {
      valList.push(val.split(' ')[0]);
    }
  }

  // Get the current weights in the form
  const { swFormVal, twFormVal, pwFormVal, wFormVal } = getFormValues();
  const formWeightsList = wFormVal.split('\n');

  // Remove each weight in the passenger list from the form weight list
  for (let i = 0; i < valList.length; i++) {
    const index = formWeightsList.indexOf(valList[i]);

    if (index !== -1) {
      formWeightsList.splice(index, 1);
    }
  }

  // Format the weight list to go back to the textarea form
  const formattedWeightList = formWeightsList.join('\n');

  // Set the form to have the new weight list
  setFormValues(swFormVal, twFormVal, pwFormVal, formattedWeightList);

  // Notify
  notify('Weights removed!', 'You have removed the weights from the weights list.');
};

// --------------------------------------
// Auxiliary Functions
// --------------------------------------

// Create event listeners
const createEventListeners = () => {
  // Calculate button event listener
  const calculateButton = document.querySelector('#calculateButton');
  calculateButton.addEventListener('click', handleCalculateWeights);

  // Copy weights button event listener
  const copyButtons = Array.from(document.querySelectorAll('#copyButton'));
  for (let i = 0; i < copyButtons.length; i++) {
    copyButtons[i].addEventListener('click', () => {
      copyValues(i + 1);
    });
  }

  // Remove weight from list button event listener
  const removeButtons = Array.from(document.querySelectorAll('#removeButton'));
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', () => {
      handleRemoveWeights(i + 1);
    });
  }
};

// When the page initially loads
window.onload = () => {
  // Get and set the global form variables
  swInput = document.querySelector('#startingWeight');
  twInput = document.querySelector('#targetWeight');
  pwInput = document.querySelector('#pilotWeight');
  wInput = document.querySelector('#weights');

  // Get the local storage for the form
  const { swStoredVal, twStoredVal, pwStoredVal, wStoredVal } = getLocalFormValues();

  // Set the form to match the local storage values
  setFormValues(swStoredVal, twStoredVal, pwStoredVal, wStoredVal);

  // Create the event listeners
  createEventListeners();
};
