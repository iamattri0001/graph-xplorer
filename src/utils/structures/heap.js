//binary heaps
//pass the comparator functions to the constructor
export class MinHeap {
  constructor(greaterThan, lessThan) {
    this.heap = [];
    this.greaterThan = greaterThan;
    this.lessThan = lessThan;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  heapifyUp(index) {
    const parentIndex = this.getParentIndex(index);
    if (
      parentIndex >= 0 &&
      this.greaterThan(this.heap[parentIndex], this.heap[index])
    ) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    let smallestIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.lessThan(this.heap[leftChildIndex], this.heap[smallestIndex])
    ) {
      smallestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.lessThan(this.heap[rightChildIndex], this.heap[smallestIndex])
    ) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      this.swap(smallestIndex, index);
      this.heapifyDown(smallestIndex);
    }
  }

  insert(element) {
    this.heap.push(element);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const minElement = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return minElement;
  }

  peekMin() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}

export class MaxHeap {
  constructor(greaterThan, lessThan) {
    this.heap = [];
    this.greaterThan = greaterThan;
    this.lessThan = lessThan;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  heapifyUp(index) {
    const parentIndex = this.getParentIndex(index);
    if (
      parentIndex >= 0 &&
      this.lessThan(this.heap[parentIndex], this.heap[index])
    ) {
      this.swap(parentIndex, index);
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    let largestIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.greaterThan(this.heap[leftChildIndex], this.heap[largestIndex])
    ) {
      largestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.greaterThan(this.heap[rightChildIndex], this.heap[largestIndex])
    ) {
      largestIndex = rightChildIndex;
    }

    if (largestIndex !== index) {
      this.swap(largestIndex, index);
      this.heapifyDown(largestIndex);
    }
  }

  insert(element) {
    this.heap.push(element);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMax() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const maxElement = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return maxElement;
  }

  peekMax() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}
