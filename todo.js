const clear = document.getElementById("clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const plus = document.getElementById("plus");

//submitting a new item by clicking the plus icon:
plus.addEventListener("click", newTodo); 

// this ul array contains all the items on the list:
let ul;

//get data from the key "main" from localstorage: 
let data = localStorage.getItem("todolist");

if(data){
    ul = JSON.parse(data); // convert a "string" object to a real object
    load(ul);   // load each of the object in ul array
} else  {
    ul = [];
}

function load(array) {
	array.forEach(obj => {
		addTodo(obj);
	})
}


input.addEventListener("keyup", newTodo);

//set up object item and push it in ul array and display function (addTodo):
function newTodo(event) {
	let li = {
		title: "",
		trash: false,
		done: false,
		id: ul.length	
	}

	if(event.keyCode == 13 || event.target.attributes.id.value == "plus") {
		const title = input.value;
		if (title == "") {
			input.blur();
		} else {
			li.title = title;
			ul.push(li);
			addTodo(li);
		}	
	}	
}

//display the list:
function addTodo(obj) {
	if (obj.trash == false) {
	const position = "beforeend";
		if (!obj.done) {
			obj.textStatus = "";
			obj.doneStatus = "done";
			obj.eraseStatus = "";
		} else {
			obj.textStatus = "text-complete";
			obj.doneStatus = "after-done";
			obj.eraseStatus = "after-erase";
		}
	const item = ` <li class="item">
                     <p class="text ${obj.textStatus}">${obj.title}</p>
                     <p class="${obj.doneStatus}"><i class="fas fa-check-circle" job="complete" id="${obj.id}"></i></p>
                     <i class="fas fa-trash-alt erase ${obj.eraseStatus}" job="delete" id="${obj.id}"></i>  
                </li>`;
		list.insertAdjacentHTML(position, item);
		localStorage.setItem("todolist", JSON.stringify(ul));
		input.value = "";
	} else {
		return "";
	}
}

// when you click on "done" or "trash" icon:
list.addEventListener("click", function(event)  {
	const element = event.target;
	const deleteOrComplete = element.attributes.job.value;

	if(deleteOrComplete == "complete"){
		completeTodo(element);
	} else if (deleteOrComplete == "delete"){
		deleteTodo(element);
	}
	localStorage.setItem("todolist", JSON.stringify(ul));
})

// toggle classes of the item when it's done or deleted & update the local storage:

function completeTodo(element) {
    element.parentNode.parentNode.querySelector(".text").classList.toggle("text-complete");
	element.parentNode.classList.toggle("after-done");
	element.parentNode.parentNode.querySelector(".erase").classList.toggle("after-erase");
	
	ul[parseInt(element.attributes.id.value)].done = !ul[parseInt(element.attributes.id.value)].done;
}

function deleteTodo(element) {
	element.parentNode.classList.toggle("erase-transition");
	
	ul[parseInt(element.attributes.id.value)].trash = true;
	
	setTimeout(() => {
		element.parentNode.parentNode.removeChild(element.parentNode);
	}, 700);
}

// reset:
clear.addEventListener("click", reset);

function reset() {
	window.localStorage.removeItem("todolist");
	window.localStorage.removeItem("titleList");
	location.reload();
}

//date setup:
function displayDate() {
	let now = new Date();
  	let date = document.querySelector('.date');
  	date.innerText = dateBuilder(now);
}

function dateBuilder(now) {
   let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

displayDate();

// set up the title:

const titleList = document.getElementById("titleList");
const edit = document.getElementById("edit");

function getTitle() {
	if (localStorage.getItem("titleList") === null) {
		titleList.textContent = "My List";
	} else {
		titleList.textContent = localStorage.getItem("titleList");
	}
}

function setTitle(e) {
	if (e.type === "keypress") {
		if(e.which == 13 || e.keyCode == 13) {
			localStorage.setItem("titleList", e.target.innerText);
			titleList.blur();
		} 

	} else {
			localStorage.setItem("titleList", e.target.innerText);
	}

}

function setTitle2() {
	titleList.setAttribute("contenteditable", true);
	 selectElementContents(titleList);
	
}

titleList.addEventListener("keypress", setTitle);
titleList.addEventListener("blur", setTitle);
edit.addEventListener("click", setTitle2);

function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

getTitle();