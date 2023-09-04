
function swap(val1, val2) {
    let temp = val1;
    val1 = val2;
    val2 = temp;
}
function bubbleSort() {
    const toSort = [4, 2, 1, 3];
    console.log('Bubble Sort');
    console.log(toSort);
    let i, j;
    let swapped;
    for (i = 0; i < toSort.length; i++) {
        swapped = false;
        for (j = 0; j < toSort.length - i - 1; j++) {
            if (toSort[j] > toSort[j + 1]) {
                swap(toSort[j], toSort[j + 1]);
                swapped = true;

            }
        }
        if (swapped === false) {
            break;
        }
    }
    console.log(toSort);
}

function cantBelieveItWorks() {
    const toSort = [4, 2, 1, 3];
    console.log('Cant Believe It Works');
    console.log(toSort);
    for (let i = 0; i < toSort.length; i++) {
        let iElement = toSort[i];
        for (let j = 0; j < toSort.length; j++) {
            let jElement = toSort[j];
            if (iElement > jElement) {
                // let temp = iElement;
                // iElement = jElement;
                // jElement = temp;
                // toSort[i] = iElement;
                // toSort[j] = jElement;
                [toSort[i], toSort[j]] = [toSort[j], toSort[i]];
            }
        }
    }
    console.log(toSort);
}

function runAll() {
    bubbleSort();
    cantBelieveItWorks();
}
runAll();