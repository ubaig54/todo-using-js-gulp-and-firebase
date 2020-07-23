let loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!loginStatus) {
    window.location = 'login.html';
}

const listInputForm = document.querySelector('.listInputForm');
const listItems = document.querySelector('.listItems');
const listInput = document.querySelector('.listInput');
const greetings = document.querySelector('.greetings');

let itemsArray = [];
let arrayInLocalStorage = JSON.parse(localStorage.getItem('itemsArray'));

if (arrayInLocalStorage && arrayInLocalStorage.length > 0) {
    itemsArray = arrayInLocalStorage;
}

// rendering on load
window.onload = () => {

    greetings.innerHTML = 'Howdy, ' + currentUser.name + '.';

    listInput.focus();

    // rendering list 
    for (var i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i].user === currentUser.email) {
            listItems.innerHTML += `<li><input type="checkbox" onclick="completedItem(this, ${i})" ${(itemsArray[i].completed) ? "checked" : ""}><span class="${(itemsArray[i].completed) ? "checked" : ""}">${itemsArray[i].todo}</span><input type="text" class="editField"><button class="editItem" onclick="editItem(this, ${i})">Edit</button><button class="saveItem" onclick="saveItem(this, ${i})">Save</button><button class="delete" onclick="deleteItem(this, ${i})">Delete</button><button class="cancelEdit" onclick="cancelEdit(this)">Cancel</button> - <span class="createdAt">${itemsArray[i].timeCreated}</span></li>`;
        }
    }
}

// rendering on submit
listInputForm.onsubmit = () => {

    // getting input value
    let inputValue = listInput.value;

    if (inputValue !== '') {

        // 12 hour format
        let rightNow = new Date();
        let hour = rightNow.getHours();
        let minutes = rightNow.getMinutes();

        if (hour > 12) {
            hour = '0' + hour - 12;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        let timeCreated = hour + ':' + minutes;

        // adding data in itemsArray
        itemsArray.unshift({ todo: inputValue, timeCreated, completed: false, user: currentUser.email });

        // setting and getting data from local storage
        localStorage.setItem('itemsArray', JSON.stringify(itemsArray));

        // clearing list so there won't be any duplicates
        listItems.innerHTML = '';

        // rendering list 
        for (var i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].user === currentUser.email) {
                listItems.innerHTML += `<li><input type="checkbox" onclick="completedItem(this, ${i})" ${(itemsArray[i].completed) ? "checked" : ""}><span class="${(itemsArray[i].completed) ? "checked" : ""}">${itemsArray[i].todo}</span><input type="text" class="editField"><button class="editItem" onclick="editItem(this, ${i})">Edit</button><button class="saveItem" onclick="saveItem(this, ${i})">Save</button><button class="delete" onclick="deleteItem(this, ${i})">Delete</button><button class="cancelEdit" onclick="cancelEdit(this)">Cancel</button> - <span class="createdAt">${itemsArray[i].timeCreated}</span></li>`;
            }
        }
    } else {
        // calling dumb, dumb.
        alert('Sorry to call you dumb. But write something, you dumb.');
    }

    // clearing input when user add item in list
    listInput.value = '';

    // so the <form> don't referesh the website on submit
    return false;
}

// eslint-disable-next-line no-unused-vars
const completedItem = (completedItem, index) => {
    let itemTxt = completedItem.nextSibling;

    if (completedItem.checked === true) {
        itemsArray[index].completed = true;
        itemTxt.style.textDecoration = 'line-through';
    } else {
        itemsArray[index].completed = false;
        itemTxt.style.textDecoration = 'none';
    }

    // setting and getting data again from local storage
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
}


// eslint-disable-next-line no-unused-vars
const deleteItem = (deleteItem, index) => {
    itemsArray.splice(index, 1);

    // clearing list so there won't be any duplicates
    listItems.innerHTML = '';

    // rendering list 
    for (var i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i].user === currentUser.email) {
            listItems.innerHTML += `<li><input type="checkbox" onclick="completedItem(this, ${i})" ${(itemsArray[i].completed) ? "checked" : ""}><span class="${(itemsArray[i].completed) ? "checked" : ""}">${itemsArray[i].todo}</span><input type="text" class="editField"><button class="editItem" onclick="editItem(this, ${i})">Edit</button><button class="saveItem" onclick="saveItem(this, ${i})">Save</button><button class="delete" onclick="deleteItem(this, ${i})">Delete</button><button class="cancelEdit" onclick="cancelEdit(this)">Cancel</button> - <span class="createdAt">${itemsArray[i].timeCreated}</span></li>`;
        }
    }

    // setting and getting data again from local storage
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray));
}


// eslint-disable-next-line no-unused-vars
const editItem = (editItem) => {
    let itemTxt = editItem.previousSibling.previousSibling;
    let editField = editItem.previousSibling;
    let saveBtn = editItem.nextSibling;
    let cancelEdit = editItem.nextSibling.nextSibling.nextSibling;
    let deleteBtn = editItem.nextSibling.nextSibling;

    editField.value = itemTxt.innerHTML;

    editItem.style.display = 'none';
    saveBtn.style.display = 'inline';
    cancelEdit.style.display = 'inline';
    deleteBtn.style.display = 'none';

    itemTxt.style.display = 'none';
    editField.style.display = 'inline';
}

// eslint-disable-next-line no-unused-vars
const saveItem = (saveItem, index) => {
    let itemTxt = saveItem.previousSibling.previousSibling.previousSibling;
    let editField = saveItem.previousSibling.previousSibling;
    let editBtn = saveItem.previousSibling;
    let cancelEdit = saveItem.nextSibling.nextSibling;
    let deleteBtn = saveItem.nextSibling;

    itemsArray[index].todo = editField.value;

    itemTxt.innerHTML = editField.value;

    // setting and getting data again from local storage
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray));

    editBtn.style.display = 'inline';
    saveItem.style.display = 'none';
    cancelEdit.style.display = 'none';
    deleteBtn.style.display = 'inline';

    itemTxt.style.display = 'inline';
    editField.style.display = 'none';
}

// eslint-disable-next-line no-unused-vars
const cancelEdit = (cancelEdit) => {
    let itemTxt = cancelEdit.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling;
    let editField = cancelEdit.previousSibling.previousSibling.previousSibling.previousSibling;
    let editBtn = cancelEdit.previousSibling.previousSibling.previousSibling;
    let saveBtn = cancelEdit.previousSibling.previousSibling;
    let deleteBtn = cancelEdit.previousSibling;

    editBtn.style.display = 'inline';
    saveBtn.style.display = 'none';
    cancelEdit.style.display = 'none';
    deleteBtn.style.display = 'inline';

    itemTxt.style.display = 'inline';
    editField.style.display = 'none';
}

let logout = document.querySelector('.logout');

logout.onclick = () => {
    localStorage.setItem('loginStatus', false);
    localStorage.removeItem('currentUser');
    location.reload();
}