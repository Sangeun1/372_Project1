// To-do list functions

let list = []
let curr = 0;

const addButton = document.getElementById("addTask");
addButton.addEventListener('click',(e)=>{
	addToDo();
},false);

const todoList = document.getElementById("taskList");


//Add a single ToDo
function addToDo(){
	//get data from html 
	const inputName = document.getElementById("taskName").value;
	const inputPriority = document.getElementById("priority").value;
	const inputCategory = document.getElementById("category").value;
	
	if(inputName!= ""){ // if inputName is not empty, make a new todo object
		const toDo ={
			id: Date.now(),
			name: inputName,
			priority: inputPriority,
			category: inputCategory,
			status: false
		};
		
		curr++;
		
		list.unshift(toDo);// add todo to the front of the list,
		save();// save the recently updated list to the local storage,
		refresh();// and display it 
	}
	

	
}


//Delete a single ToDo
function deleteToDo(){
	
}

//refresh the todo list
function refresh(){
	todoList.innerHTML = ""; // clean the list first, 
	
	list.forEach(toDo=>{
        const li = document.createElement('li');
       	li.innerHTML = toDo.name;
        todoList.append(li);
        })
 }

//mark down

//filter 

// filter by category

// filter by status

// alaraming overdue tasks 

//save to local storage (You can delete anytime if there is no time to implement)
function save(){
	
}

