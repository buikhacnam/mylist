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
	                  <p class="done"><i class="far fa-check-circle"></i></p>
	                 <p class=trash><i class="fas fa-trash-alt"></i></p>	
        		</li>`;
		list.insertAdjacentHTML(position, item);
		input.value = "";
		}	
	}
	
}






  	




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
