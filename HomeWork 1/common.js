var counter = 0;

function selectFirstElement() {
    var list = document.getElementById('list');
    var firstItem = list.firstChild;

    firstItem.style.color = 'orange';
}

function selectLastElement() {
    var list = document.getElementById('list');
    var lastItem = list.lastChild;

    lastItem.style.color = 'orange';
}

function selectNextElement() {
    var list = document.getElementById('list');
    var items = list.children;
    var nextItem;

    for (var i = 0; i < items.length; i++) {
        items[i].style.color = '#000';
    }

    if (counter === items.length - 1) {
        counter = 0;
        nextItem = items[counter]; 

    } else {
        nextItem = items[counter].nextSibling;
        counter++;
    }

    nextItem.style.color = 'red';
    
}

function selectPrevElement() {
    
    var list = document.getElementById('list');
    var items = list.children;
    var nextItem;

    for (var i = 0; i < items.length; i++) {
        items[i].style.color = '#000';
    }

    if (counter === 0) {
        counter = items.length - 1;
        nextItem = items[counter]; 

    } else {
        nextItem = items[counter].previousSibling;
        counter--;
    }

    nextItem.style.color = 'red';
    
}

function addElement() {
    var newItem = document.createElement('li');
    var list = document.getElementById('list');

    newItem.innerHTML = 'NEW ITEM';
    list.appendChild(newItem);
}


function deleteElement() {
    var list = document.getElementById('list');

    list.removeChild(list.lastChild);
}

function addToStart() {
    var newItem = document.createElement('li');
    var firstItem = document.getElementsByTagName('li')[0];
    var parent = firstItem.parentNode;

    newItem.innerHTML = 'NEW ITEM';
    parent.insertBefore(newItem, firstItem);
}