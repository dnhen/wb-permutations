export const generatePermutations = (weightList, targetWeight) => {
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
        output.two.values = [weightList[a], weightList[b]].sort().reverse();
      }

      for (let c = b + 1; c < weightList.length; c++) {
        const currDiffThree = Math.abs(targetWeight - output.three.sum);
        const newDiffThree = Math.abs(targetWeight - (weightList[a] + weightList[b] + weightList[c]));

        if (currDiffThree > newDiffThree && weightList[a] + weightList[b] + weightList[c] <= targetWeight) {
          output.three.sum = weightList[a] + weightList[b] + weightList[c];
          output.three.values = [weightList[a], weightList[b], weightList[c]].sort().reverse();
        }
      }
    }
  }

  return output;
};
