const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");



let ul;

let data = localStorage.getItem("main");

if(data){
    ul = JSON.parse(data);
    load(ul);
   
   
}else  {
    // if data isn't empty
    ul = [];

}


function load(array) {
	array.forEach(obj => {
		addTodo(obj);
	})
}



//add an item to the list user the enter key
input.addEventListener("keyup", newTodo);





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


function addTodo(obj) {
	if (obj.trash == false) {
	const position = "beforeend";
		if (!obj.done) {
			obj.textStatus = "text";
			obj.doneStatus = "done";
			obj.eraseStatus = "erase";
		} else {
			obj.textStatus = "text-complete";
			obj.doneStatus = "after-done";
			obj.eraseStatus = "after-erase";
		}
	const item = ` <li class="item">
                     <p class="${obj.textStatus}">${obj.title}</p>
                     <p class="${obj.doneStatus}"><i class="fas fa-check-circle" job="complete" id="${obj.id}"></i></p>
                     <p class="${obj.eraseStatus}"><i class="fas fa-trash-alt" job="delete" id="${obj.id}"></i></p>  
                </li>`;
		list.insertAdjacentHTML(position, item);
		localStorage.setItem("main", JSON.stringify(ul));
		input.value = "";
	} else{
		return "";
	}

}







//test the trash and complete button:

list.addEventListener("click", function(event)  {
	const element = event.target;
	const deleteOrComplete = element.attributes.job.value;


	if(deleteOrComplete == "complete"){
		//if(!ul[parseInt(element.attributes.id.value)].done){
			completeTodo(element);
		//} else {
		//	completeTodo2(element);
		//}
		
	} else if (deleteOrComplete == "delete"){
		deleteTodo(element);
		ul[parseInt(element.attributes.id.value)].trash = true;
			localStorage.setItem("main", JSON.stringify(ul));
	}
})

function completeTodo(element) {
 
    console.log("complete");
  
    element.parentNode.parentNode.querySelector(".text").classList.toggle("text-complete");
	element.parentNode.classList.toggle("after-done");
	element.parentNode.parentNode.querySelector(".erase").classList.toggle("after-erase");
	
	
	ul[parseInt(element.attributes.id.value)].done = ul[parseInt(element.attributes.id.value)].done ? false : true;
		localStorage.setItem("main", JSON.stringify(ul));
}



function deleteTodo(element) {
	console.log("delete");
	element.parentNode.parentNode.classList.toggle("erase-transition");
	setTimeout(() => {
		element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
	}, 800);
}

clear.addEventListener("click", reset);


function reset() {
	window.localStorage.removeItem("main");
	location.reload();
}


const plus = document.getElementById("plus");
plus.addEventListener("click", newTodo);


//////////////date////////////////////////////////////////

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
