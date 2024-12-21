import React, { useState, useEffect } from "react";

const SPEED = 50; // Speed of the animations in ms

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false); // Track if a sorting algorithm is running
  const [arraySize, setArraySize] = useState(50); // User-selected array size
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Check if the device has a small screen

  useEffect(() => {
    resetArray();
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize); // Update screen size on window resize
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [arraySize]);

  // Check screen size and update state
  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768); 
  };

  // Generate a new random array
  const resetArray = () => {
    if (isSorting) return; // Prevent generating a new array during sorting
    const newArray = Array.from({ length: arraySize }, () =>
      randomIntFromInterval(10, 500)
    );
    setArray(newArray);
  };

  // Utility function to pause execution
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Sorting Algorithms

  // Bubble Sort
  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(SPEED);
        }
      }
    }
    setIsSorting(false);
  };

  // Insertion Sort
  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        setArray([...arr]);
        await sleep(SPEED);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setIsSorting(false);
  };

  // Quick Sort
  const quickSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    setArray([...arr]);
    setIsSorting(false);
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSortHelper(arr, low, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(SPEED);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(SPEED);
    return i + 1;
  };

  // Merge Sort
  const mergeSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
    setArray([...arr]);
    setIsSorting(false);
  };

  const mergeSortHelper = async (arr, left, right) => {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  };

  const merge = async (arr, left, mid, right) => {
    const temp = [];
    let i = left,
      j = mid + 1;
    while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) temp.push(arr[i++]);
      else temp.push(arr[j++]);
    }
    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let k = 0; k < temp.length; k++) {
      arr[left + k] = temp[k];
      setArray([...arr]);
      await sleep(SPEED);
    }
  };

  // Selection Sort
  const selectionSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await sleep(SPEED);
      }
    }
    setIsSorting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Sorting Visualizer</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          className="px-4 py-2 bg-white border border-gray-300 rounded"
          disabled={isSorting}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          {!isSmallScreen && (
            <>
              <option value={75}>75</option>
              <option value={100}>100</option>
            </>
          )}
        </select>
        <button
          onClick={resetArray}
          className={`px-4 py-2 font-medium rounded transition ${
            isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={isSorting}
        >
          Generate New Array
        </button>
        <button
          onClick={bubbleSort}
          className={`px-4 py-2 font-medium rounded transition ${
            isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
          }`}
          disabled={isSorting}
        >
          Bubble Sort
        </button>
        <button
          onClick={insertionSort}
          className={`px-4 py-2 font-medium rounded transition ${
            isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600 text-white"
          }`}
          disabled={isSorting}
        >
          Insertion Sort
        </button>
        <button
          onClick={quickSort}
          className={`px-4 py-2 font-medium rounded transition ${
            isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
          disabled={isSorting}
        >
          Quick Sort
        </button>
        <button
          onClick={mergeSort}
          className={`px-4 py-2 font-medium rounded transition ${
            isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 text-white"
          }`}
          disabled={isSorting}
        >
          Merge Sort
        </button>
        <button
          onClick={selectionSort}
          className={`px-4 py-2 font-medium rounded transition ${
            isSorting ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 text-white"
          }`}
          disabled={isSorting}
        >
          Selection Sort
        </button>
      </div>
      <div className="flex items-end justify-center h-[500px] w-full gap-1">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="bg-teal-500 transition-all"
            style={{
              height: `${value}px`,
              width: `${100 / arraySize}%`,
            }}
          ></div>
        ))}
      </div>
      <div className="mt-8 text-center text-gray-600">
        Made with ❤️ by <span className="font-bold text-gray-800">Vipul</span>
      </div>
    </div>
  );
};

// Utility Functions
const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default SortingVisualizer;
