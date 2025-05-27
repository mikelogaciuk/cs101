// ================================================================================
//
// Data Structures and Algorithms
//
//
// Based on:
// - Data Structures & Algorithms In JavaScript Complete Course 2024 By HuXn
//   (https://www.youtube.com/watch?v=wBtPGnVnA9g)
// - Isaac Computer Science
//   (https://isaaccomputerscience.org/)
//
// ================================================================================

// Create array with 5 users & function that takes two parameters:
// allUsers & userName
// and finds specific user.

var usersArray: string[] = ['Mike', 'Kasper', 'John', 'Peter', 'Alice'];

function findUser(allUsers: string[], userName: string): string | any {
  const found = allUsers.find((item) => item == userName);

  return found;
}

function findUserAlternative(
  allUsers: string[],
  userName: string
): string | any {
  for (const item of allUsers) {
    if (item == userName) {
      return item;
    }
  }
}
function findUserAnotherAlternative(
  allUsers: string[],
  user: string
): string | any {
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i] == user) {
      return user;
    }
  }
}

// O(n)
console.log(findUser(usersArray, 'Kasper'));
console.log(findUserAlternative(usersArray, 'Alice'));
console.log(findUserAnotherAlternative(usersArray, 'Peter'));

// Custom array
//
// Create your custom array class that has methods: push, get, pop, shift

class List {
  len: number;
  data: { [key: number]: any };

  constructor() {
    this.len = 0;
    this.data = {};
  }

  push(item: any) {
    this.data[this.len] = item;
    this.len++;
    return this.len;
  }

  get(index: number) {
    return this.data[index];
  }

  pop() {
    const lastItem: string | number = this.data[this.len - 1];
    delete this.data[this.len - 1];
    this.len--;

    return lastItem;
  }

  shift(): string | number {
    const firstItem: string | number = this.data[0];

    for (let i = 0; i < this.len; i++) {
      this.data[i] = this.data[i + 1];
    }

    delete this.data[this.len - 1];

    this.len--;

    return firstItem;
  }

  deleteAt(index: number): string | any {
    const deletedElement: string | any = this.data[index];

    for (let i = index; i < this.len; i++) {
      this.data[i] = this.data[i + 1];
    }

    delete this.data[this.len - 1];

    this.len--;

    return deletedElement;
  }
}

var arr = new List();
arr.push('first');
arr.push('second');

console.log(arr.data);
console.log(arr.get(0));
console.log(arr.pop());
console.log(arr);
console.log(arr.push('third'));
console.log(arr.push('fourth'));
console.log(arr);
console.log(arr.shift());
console.log(arr);
console.log(arr.push('new'));
console.log(arr);
console.log(arr.deleteAt(1));
console.log(arr);

// Reverse the string
const reversed = (text: string) => {
  const array = text.split('');
  const reversedArr = array.reverse();
  const result = reversedArr.toString().replaceAll(',', '');

  return result;
};

var stringToBeReversed: string = 'Mikey';
console.log(stringToBeReversed.split(''));
console.log(reversed(stringToBeReversed));

// Custom reverse function
//
// That gets an array as argument, and reverses it
const customReverser = (array: any[]) => {
  let result: any[] = [];

  for (let item of array) {
    result.unshift(item);
  }

  return result;
};

console.log(customReverser(['A', 'l', 'i', 'c', 'e']));

// Palindromes
//
// If the reversed string is equal to original then word is a palindrome

const checkForPalindrome = (word: string): boolean => {
  let reversedWord: string = reversed(word);

  const result = word == reversedWord ? true : false;

  return result;
};

console.log(checkForPalindrome('ala'));

// Integer reversal
//
// Use similiar idea from examples above

function intReverse(integer: number): number {
  let result = parseInt(reversed(integer.toString()));

  return result;
}

console.log(intReverse(55123));

// Sentence capitalization

const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const sentenceCapitalization = (sentence: string): string => {
  let sentenceArray: string[] = sentence.split(' ');
  let tempArray: string[] = [];

  for (const word of sentenceArray) {
    tempArray.push(capitalizeFirstLetter(word));
  }

  const result = tempArray.toString().replaceAll(',', ' ');

  return result;
};

console.log(sentenceCapitalization('this is my dummy sentence'));

// FizzBuzz
//
// Print numbers from 1 to n
// If number is divisible by 3, print "Fizz"
// If by 5, print "Buzz",
// If by both 3 and 5, give "FizzBuzz"
// Else, print just a number

const fizzBuzz = (integer: number) => {
  let i = 1;
  while (i < integer) {
    if (i % 15 == 0) {
      console.log('FizzBuzz');
    } else if (i % 3 == 0) {
      console.log('Fizz');
    } else if (i % 5 == 0) {
      console.log('Buzz');
    } else console.log(i);

    i++;
  }
  return integer;
};

console.log(fizzBuzz(5));

// Max Profit
//
// Find the difference between cheapest price you could both
// and the most expensive you could have sold later on

const stockPrices: number[] = [7, 3, 4, 6, 1, 9];

const maxProfit = (stocks: number[]) => {
  let minPrice: number = stocks[0];
  let maxProfit: number = 0;

  for (let price in stocks) {
    const currentPrice: number = stocks[price];
    minPrice = Math.min(minPrice, currentPrice);

    const potentialProfit: number = currentPrice - minPrice;

    maxProfit = Math.max(maxProfit, potentialProfit);
  }

  return maxProfit;
};

console.log(maxProfit(stockPrices));

// Chunk Array
//
// Get a function that takes an array and chunks size
// and splits array in to as many chunks as user wants

const arrayToBeChunked: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

function chunkArray(list: any[], size: number) {
  let chunked: any[] = [];
  let index: number = 0;

  while (index < list.length) {
    const chunk = list.slice(index, index + size);
    chunked.push(chunk);
    index += size;
  }

  return chunked;
}

console.log(chunkArray(arrayToBeChunked, 3));

// Two sum
//
// Within a list of numbers, find that ones are equal to target

const findTwoSum = (list: number[], target: number) => {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length; j++) {
      if (list[i] + list[j] == target && list[i] != list[j]) {
        return `The anwser is: [${list[i]}, ${list[j]}]`;
      }
    }
  }
};

const arrayForTwoSum: number[] = [2, 4, 9, 3, 1, 5];

console.log(findTwoSum(arrayForTwoSum, 10));

// Linked List
//
// Linear data structure where nodes (elements) are not stored contigously in memory.
// Each node contains data with reference (link) to next node in sequence.

class LinkedListNode {
  data: String;
  next: LinkedListNode | null;

  constructor(value) {
    this.data = value;
    this.next = null;
  }

  getData() {
    return this.data;
  }

  getNext() {
    return this.next;
  }

  setNext(newNext) {
    this.next = newNext;
  }
}

class LinkedList {
  head: LinkedListNode | null;

  constructor(value) {
    this.head = null;
  }

  traverse() {
    let current = this.head;

    while (current != null) {}
  }
}

let myLinkedList = new LinkedList('foo');
console.log(myLinkedList);

// Generics
//
// Generics are use for writing reusable and dynamic code.
// They allow to create components that can be reused across the codebase.
// This is represented using single <> brackets.

// Example of generic function
function toArray<T>(input: T): Array<T> {
  return [input];
}

console.log(toArray('a')); // [ 'a' ]

// Example of generic interface
interface Box<T> {
  value: T;
}

let stringBox: Box<string> = { value: 'Hi' };
let numberBox: Box<number> = { value: 123 };

// Example of generic classes
class GenericList<T> {
  private items: T[] = [];

  add(item: T) {
    this.items.push(item);
  }

  get(index: number): T {
    return this.items[index];
  }

  getAll(): T[] {
    return this.items;
  }
}

let stringList = new GenericList<string>();
stringList.add('Apple');
stringList.add('Pineapple');
console.log(stringList.get(1));

// It can be numbers list and so on...

// Generics with decorators
function logExecution<T extends (...args: any[]) => any>(
  target: T
): (...args: Parameters<T>) => ReturnType<T> {
  return function (...args: Parameters<T>): ReturnType<T> {
    console.log(
      `Invoked function with name: ${target.name} where given arguments were:`,
      args
    );
    const result = target(...args);
    console.log(`Function ${target.name}, result is:`, result);
    return result;
  } as ReturnType<T>;
}

class Calculator {
  @logExecution
  add(a: number, b: number): number {
    return a + b;
  }

  @logExecution
  subtract(a: number, b: number): number {
    return a - b;
  }
}

const calc = new Calculator();
calc.add(5, 3);

// Functions with optional parameters
function funcWithOptionalOps(
  param1: string,
  param2: boolean,
  env?: string[]
): string {
  const result = `This is a function that takes two arguments: ${param1}, ${param2} while optional parameters for env are: ${
    env == undefined ? 'empty.' : [env]
  }`;

  return result;
}

console.log(funcWithOptionalOps('foo', true));
console.log(
  funcWithOptionalOps('MyService', false, ['production', ':logging'])
);

// Comments and docs in Typescript
//
// The true dummy example

/**
 *
 * @param x A number
 * @returns {number}
 * @example
 * ```typescript
 * const result = myDummyFunc(2)
 * console.log(result)
 * ```
 */
const myDummyFunc = (x: number): number => {
  return x;
};

/**
 *
 * @param theta An angle of attack (number)
 * @returns {n} Load factor
 */
function loadFactor(theta: number): number {
  const n: number = 1 / Math.cos(theta);

  return n;
}

console.log(loadFactor(30));
