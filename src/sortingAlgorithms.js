export function bubbleSortAnimate(numbers) {
      const animations = [];
      if (numbers.length <= 1) {
            return numbers;
      };
      bubbleSort(numbers, animations);
      return animations;
}

function bubbleSort(array, animations) {
      let change, temp;
      do {
            change = false;
            for (let i = 0; i < array.length - 1; i++) {
                  // animations.push([i, i + 1, 0])
                  if (array[i + 1] < array[i]) {
                        temp = array[i];
                        array[i] = array[i + 1];
                        array[i + 1] = temp;
                        change = true;
                        animations.push([i, i + 1, 1]);
                        animations.push([i, i + 1, 2, array[i + 1], array[i]]);
                        // animations.push([i, i + 1, 3]);
                  } else {
                        animations.push([i, i + 1, 3]);
                  }
                  animations.push([i, i + 1, null]);
            }
      } while (change);
      animations.push([0, 0, 4]);
}