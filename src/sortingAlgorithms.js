export function bubbleSortAnimate(numbers) {
      const animations = [];
      if (numbers.length <= 1) {
            return numbers;
      };
      bubbleSort(numbers, animations);
      return animations;
}



export function selectionSortAnimate(numbers) {
      const animations = [];
      if (numbers.length <= 1) {
            return numbers;
      };
      selectionSort(numbers, animations);
      return animations;
}




function bubbleSort(array, animations) {
      let change, temp;
      do {
            change = false;
            for (let i = 0; i < array.length - 1; i++) {
                  if (array[i + 1] < array[i]) {
                        temp = array[i];
                        array[i] = array[i + 1];
                        array[i + 1] = temp;
                        change = true;
                        //Third element in array which is pushed to animation[] defines action which is going to be visualised

                        animations.push([i, i + 1, 1]); // Color compared elements if 'i+1' is less than 'i'(red)
                        animations.push([i, i + 1, 2, array[i + 1], array[i]]); // Swap compared elements if 'i+1' is less than 'i'
                  } else {
                        animations.push([i, i + 1, 3]); // Color compared elements if 'i+1' is bigger than 'i'(green)
                  }
                  animations.push([i, i + 1, null]); // Set default colors on compared elements
            }
            array.pop();
      } while (change);
      animations.push([0, 0, 4]); // End of visualisation
}




function selectionSort(array, animations) {
      let min, minIndex, temp;
      for (let i = 0; i < array.length - 1; i++) {
            min = array[i];
            minIndex = i;
            for (let j = i; j < array.length; j++) {
                  //Third element in array which is pushed to animation[] defines action which is going to be visualised
                  animations.push([i, j, 0]) // Color elements which are compared with each other (red)

                  if (array[j] < min) {
                        animations.push([minIndex, j, 1]) // Color second compared value (green) and !!! set default color on previous min value !!! 
                        min = array[j];
                        minIndex = j;
                  } else {
                        animations.push([i, j, 2]) // Set default color on second compared value
                  }
            }
            temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
            animations.push([i, minIndex, 3, array[minIndex], array[i]]); // Swap two elements and set default color
      }
      animations.push([0, 0, 4]); // End of sorting
}