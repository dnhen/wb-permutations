// Global Variables
const generateButton = document.querySelector('#generate_button');
let startWeightElem;
let targetWeightElem;
let pilotWeightElem;
let weightListElem;

generateButton.addEventListener('click', () => {
  const startWeight = startWeightElem.value;
  const targetWeight = targetWeightElem.value;
  const pilotWeight = pilotWeightElem.value;
  const weightList = weightListElem.value;

  // Set local storage based on above
  localStorage.setItem('startWeight', startWeight);
  localStorage.setItem('targetWeight', targetWeight);
  localStorage.setItem('pilotWeight', pilotWeight);
  localStorage.setItem('weightList', weightList);

  // Generate permutations based on weight list and target weight
  const actualTargetWeight = targetWeight - startWeight - pilotWeight;
  const formattedWeightList = weightList.split('\n').map((val) => parseInt(val, 10));
  console.log('Actual target:', actualTargetWeight);

  const closestValuesTrie = generatePermutationsTrie(actualTargetWeight, formattedWeightList);
  const closestValuesTuple = generatePermutationsTuple(actualTargetWeight, formattedWeightList);

  const resultsThree = document.querySelector('#results_three');
  const resultsTwo = document.querySelector('#results_two');

  resultsThree.children[1].innerText = 'Total Weight: ' + closestValuesTrie.sum + ' kg';
  resultsTwo.children[1].innerText = 'Total Weight: ' + closestValuesTuple.sum + ' kg';

  setWeightText(resultsThree.children[2], closestValuesTrie.values[0]);
  setWeightText(resultsThree.children[3], closestValuesTrie.values[1]);
  setWeightText(resultsThree.children[4], closestValuesTrie.values[2]);

  setWeightText(resultsTwo.children[2], closestValuesTuple.values[0]);
  setWeightText(resultsTwo.children[3], closestValuesTuple.values[1]);
});

const generatePermutationsTrie = (targetWeight, weightList) => {
  // To store the closest sum and values
  let closestSum = Number.MAX_VALUE;
  let closestValues = [undefined, undefined, undefined];

  // Run three nested loops each loop for each element of trie
  for (let a = 0; a < weightList.length; a++) {
    for (let b = a + 1; b < weightList.length; b++) {
      for (let c = b + 1; c < weightList.length; c++) {
        const currDiff = Math.abs(targetWeight - closestSum);
        const newDiff = Math.abs(targetWeight - (weightList[a] + weightList[b] + weightList[c]));

        if (currDiff > newDiff && weightList[a] + weightList[b] + weightList[c] <= targetWeight) {
          closestSum = weightList[a] + weightList[b] + weightList[c];
          closestValues = [weightList[a], weightList[b], weightList[c]];
        }
      }
    }
  }

  return {
    sum: closestValues[0] === undefined ? -1 : closestSum,
    values: closestValues,
  };
};

const generatePermutationsTuple = (targetWeight, weightList) => {
  // To store the closest sum and values
  let closestSum = Number.MAX_VALUE;
  let closestValues = [undefined, undefined, undefined];

  // Run two nested loops each loop for each element of tuple
  for (let a = 0; a < weightList.length; a++) {
    for (let b = a + 1; b < weightList.length; b++) {
      const currDiff = Math.abs(targetWeight - closestSum);
      const newDiff = Math.abs(targetWeight - weightList[a] - weightList[b]);

      if (currDiff > newDiff) {
        closestSum = weightList[a] + weightList[b];
        closestValues = [weightList[a], weightList[b], undefined];
      }
    }
  }

  return {
    sum: closestValues[0] === undefined ? -1 : closestSum,
    values: closestValues,
  };
};

const setWeightText = (element, value) => {
  element.innerText = value === undefined ? 'n/a' : value + ' kg';
};

// Initial loading of data when page loads
window.onload = () => {
  // Get elements and store in global variable
  startWeightElem = document.querySelector('#starting_weight');
  targetWeightElem = document.querySelector('#target_weight');
  pilotWeightElem = document.querySelector('#pilot_weight');
  weightListElem = document.querySelector('#weight_list');

  // Get stored values from local storage and set to element values
  startWeightElem.value = localStorage.getItem('startWeight');
  targetWeightElem.value = localStorage.getItem('targetWeight');
  pilotWeightElem.value = localStorage.getItem('pilotWeight');
  weightListElem.value = localStorage.getItem('weightList');
};
