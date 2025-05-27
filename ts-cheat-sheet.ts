// String concatenation

let additionalText = 'simple';
let concatenationText = `The text is ` + additionalText + `, right?`;
let concatenationTextNext = `This is a ${additionalText} text`;

console.log(concatenationText, concatenationTextNext);

// Conditionals
var x = 1;
console.log(x != 1 ? true : false);
console.log(!x);

var car = '';

switch (car) {
  case 'Ferrari':
    console.log('Red scam...');
    break;
  case 'Mercedes':
    console.log('You done it');
    break;
  default:
    console.log('Lol');
}

// Dummy loops, logic

var opts = { app: 'freya', timeout: 30, log: true };
console.log(opts.log);

const isFreya = (config: Record<string, any>): number => {
  switch (config.app) {
    case 'Freya':
      return 1;
      break;
    default:
      return 0;
  }
};

console.log(isFreya(opts));

var table = [
  { store: 'S001', active: true },
  { store: 'S243', active: true },
  { store: 'S002', active: false },
];

for (const f of table) {
  console.log(f.store);
}

for (const f in table) {
  console.log(f);
}

const tableJson = JSON.stringify(table);
console.log(tableJson);

console.log(table.length);

var eachy = table.forEach((x) => console.log(x.store));

var found = table.find((idx) => idx.store == 'S243');
console.log(found);

let arr = [3, 4, 5, 6];

for (var x of arr) {
  console.log(x);
}

// Types

type Store = {
  readonly id: number;
  code: string;
  active: boolean;
};

let stores: Store[] = [];
stores.push({ id: 1, code: 'S001', active: true });
stores.push({ id: 2, code: 'S003', active: false });
console.log(stores);

function maxStoreId(stores: Store[]) {
  var ids: number[] = [];

  for (const store of stores) {
    ids.push(store.id);
  }

  let maxId = Math.max(...ids);

  return maxId;
}

function createStore(store: string, status: boolean): void {
  const maxId = maxStoreId(stores) + 1;

  stores.push({ id: maxId, code: store, active: status });
}

createStore('S243', false);

console.log(stores);

// Intefaces and types
type Person = {
  name: string;
  age: number;
  email?: boolean; // this is optional
};

type Employee = {
  id: number;
  title: string;
};

type PersonAndEmployee = Person & Employee;

const alice: PersonAndEmployee = {
  name: 'Alice',
  age: 18,
  id: 247,
  title: 'Director',
};

interface User {
  readonly id: number;
  name: string;
}

interface Admin extends User {
  role: string;
}

// Tuples

let exampleTuple: [number, string, boolean?];

exampleTuple = [89, 'foo'];

// Variadic tuples
type Numbers = [number, number];
type Strings = [string, string];

type NumsAndStrings = [...Numbers, ...Strings];
