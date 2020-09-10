const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");




//add an item to the list user the enter key
input.addEventListener("keyup", newTodo);





function newTodo(event) {
	if(event.keyCode == 13) {
		const position = "beforeend";
		const what = input.value;
		if (what == "") {
			alert("todo cannot be blank");
		} else {
		item = ` <li class="item">
                      <p class="text">${what}</p>
                     <p class="done"><i class="fas fa-check-circle" job="complete"></i></p>
                     <p class="erase"><i class="fas fa-trash-alt" job="delete"></i></p>  
                </li>`;
		list.insertAdjacentHTML(position, item);
		input.value = "";
		}	
	}
	
}





function completeTodo(element) {
    //console.log(element.parentNode.parentNode.nodeName);
    element.parentNode.parentNode.querySelector(".text").classList.toggle("text-complete");
	console.log("complete");
	element.parentNode.classList.toggle("after-done");;
	element.parentNode.parentNode.querySelector(".erase").classList.toggle("after-erase");
}

function deleteTodo(element) {
	console.log("delete");
	element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
}

//test the trash and complete button:

list.addEventListener("click", function(event)  {
	const element = event.target;
	const deleteOrComplete = element.attributes.job.value;

	if(deleteOrComplete == "complete"){
		console.log("hey")
		completeTodo(element);
	} else if (deleteOrComplete == "delete"){
		deleteTodo(element);
	}
})






  	


//////////////date////////////////////////////////////////

function displayDate() {
	let now = new Date();
  	let date = document.querySelector('.date');
  	date.innerText = dateBuilder(now);
}

function dateBuilder(now) {
   let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  
  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

displayDate();
