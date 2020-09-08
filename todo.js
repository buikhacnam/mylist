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
		item = `<li class="item">
	                  <p class="text">${what}</p>
	                  <i class="far fa-check-circle"></i>
	                  <i class="fas fa-trash-alt"></i>	
        		</li>`;
		list.insertAdjacentHTML(position, item);
		input.value = "";
		}	
	}
	
}


