"use strict";

// this app uses the drag and drop API, see https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

// grab DOM elements
const draggable_list = document.querySelector('#draggable-list');
const check = document.querySelector('#check');

const richestPeople = [
  'Pete Rose',
  'Carl Yastrzemski',
  'Hank Aaron',
  'Ricky Henderson',
  'Ty Cobb',
  'Eddie Murray',
  'Stan Musial',
  'Cal Ripken Jr.',
  'Willie Mays',
  'Barry Bonds'
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

  // call a function to add the drag/drop functionliaty to the list
  addEventListeners();
}

// get the index number of the item being dragged using a method called closest()
function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // console.log(dragStartIndex);
}

// change styling when a dragged item is over this item
function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

// remove styling when a dragged item is no longer over this item
function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

// prevent the hovered over item from conflicting
function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

// get the index number of the item being dropped on top of
// call a function to swap the items  giving the index number of the start and end items
function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');  
}

// get the two items and then swap them using appendChild()
function swapItems(fromIndex, toIndex) {
  // console.log(123);
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  
  // console.log(itemOne, itemTwo)

  listItems[toIndex].appendChild(itemOne);
  listItems[fromIndex].appendChild(itemTwo);
}

// check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const  personName = listItem.querySelector('.draggable').innerText.trim();

    if(personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

// addEventListeners function
// we need the draggable class (the persons name div) and the list items
// we then loop through the draggables and add an event listener to earch one, namely drag start and fire a function
// for the list items, we loop through and add 4 event listeners to each
function addEventListeners() {
  const draggables =  document.querySelectorAll('.draggable');
  const dragListItem = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  })

  dragListItem.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  })
}

check.addEventListener('click', checkOrder);