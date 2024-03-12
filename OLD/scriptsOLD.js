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

  const generatedPermutations = generatePermutations(formattedWeightList, actualTargetWeight);
  console.log(generatedPermutations);

  const resultsThree = document.querySelector('#results_three');
  const resultsTwo = document.querySelector('#results_two');

  resultsThree.children[1].innerText = 'Total Weight: ' + generatedPermutations.two.sum + ' kg';
  resultsTwo.children[1].innerText = 'Total Weight: ' + generatedPermutations.three.sum + ' kg';

  setWeightText(resultsThree.children[2], generatedPermutations.three.values[0]);
  setWeightText(resultsThree.children[3], generatedPermutations.three.values[1]);
  setWeightText(resultsThree.children[4], generatedPermutations.three.values[2]);

  setWeightText(resultsTwo.children[2], generatedPermutations.two.values[0]);
  setWeightText(resultsTwo.children[3], generatedPermutations.two.values[1]);
});

const generatePermutations = (weightList, targetWeight) => {
  // To store the closest sum and values
  const output = {
    one: {
      sum: Number.MAX_VALUE,
      values: [undefined],
    },
    two: {
      sum: Number.MAX_VALUE,
      values: [undefined, undefined],
    },
    three: {
      sum: Number.MAX_VALUE,
      values: [undefined, undefined, undefined],
    },
  };

  // Run three nested loops each loop for each element of trie
  for (let a = 0; a < weightList.length; a++) {
    const currDiffOne = Math.abs(targetWeight - output.one.sum);
    const newDiffOne = Math.abs(targetWeight - weightList[a]);

    if (currDiffOne > newDiffOne && weightList[a] <= targetWeight) {
      output.one.sum = weightList[a];
      output.one.values = [weightList[a]];
    }

    for (let b = a + 1; b < weightList.length; b++) {
      const currDiffTwo = Math.abs(targetWeight - output.two.sum);
      const newDiffTwo = Math.abs(targetWeight - weightList[a] - weightList[b]);

      if (currDiffTwo > newDiffTwo && weightList[a] + weightList[b] <= targetWeight) {
        output.two.sum = weightList[a] + weightList[b];
        output.two.values = [weightList[a], weightList[b]];
      }

      for (let c = b + 1; c < weightList.length; c++) {
        const currDiffThree = Math.abs(targetWeight - output.three.sum);
        const newDiffThree = Math.abs(targetWeight - (weightList[a] + weightList[b] + weightList[c]));

        if (currDiffThree > newDiffThree && weightList[a] + weightList[b] + weightList[c] <= targetWeight) {
          output.three.sum = weightList[a] + weightList[b] + weightList[c];
          output.three.values = [weightList[a], weightList[b], weightList[c]];
        }
      }
    }
  }

  return output;
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
