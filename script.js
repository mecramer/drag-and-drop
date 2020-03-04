"use strict";

// grab DOM elements
const draggable_list = document.querySelector('#draggable-list');
const check = document.querySelector('#check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

// Store the list items
const listItems = [];

let dragStartIndex;

createList();

// Insert List items into DOM
// we use the spread operator which makes a copy of the array richestPeople
// .map() is used turn into an object with a value (the person) and a random number assigned to sort
// .sort() is then used to put the array in numerical order of the sort value for the objects
// we then map it back into an array of strings with another map, returning the value (person)
// we then create a list item for the current item being evaluated
// then we want to set a data attribute for the li and give it the current index number in the forEach
// we then build the html inside the list item including the person and index numbeer
// finally we push the item we just created to the listItems array and then we append it to the page element
function createList() {
  [...richestPeople]
  .map(a => ({ value: a, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(a => a.value)
  .forEach((person, index) => {
    // console.log(person);

    const listItem = document.createElement('li');

    listItem.setAttribute('data-index', index);
    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <em class="fas fa-grip-lines"></em>
      </div>
    `;

    listItems.push(listItem);

    draggable_list.appendChild(listItem);
  });
}