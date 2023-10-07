// To-do list functions

let list = []

const addButton = document.getElementById("addTask");
addButton.addEventListener('click',(e)=>{
	addToDo();
},false);


//Add a single ToDo
function addToDo(){
	//get data from html 
	const inputName = document.getElementById("taskName").value;
	const inputPriority = document.getElementById("priority").value;
	const inputCategory = document.getElementById("category").value;
	const inputDueDate = document.getElementById("dueDate").value;

	const dueDate = new Date(inputDueDate);
	const today = new Date();

	// console.log("DUE", dueDate);
	// console.log("NOW", today)

	const dueYear = dueDate.getFullYear();
	const dueMonth = dueDate.getMonth();
	const dueDay = dueDate.getDate() + 1;

	const todayYear = today.getFullYear();
	const todayMonth = today.getMonth();
	const todayDay = today.getDate();

	if(inputName!= ""){ // if inputName is not empty, make a new todo object

		// If invalid due date
		if ( dueYear < todayYear ||
			(dueYear === todayYear && dueMonth < todayMonth) ||
			(dueYear === todayYear && dueMonth === todayMonth && dueDay < todayDay)) {
			alert("Due date cannot be in the past. Please select a valid due date.");
			return; 
		}

		const toDo ={
			id: Date.now(),
			name: inputName,
			priority: inputPriority,
			category: inputCategory,
			status: false,
			dueDate: inputDueDate
		};
		list.unshift(toDo);// add todo to the front of the list,
		save();// save the recently updated list to the local storage,
		refresh();// and display it 
	}
	
	document.getElementById("taskName").value = ""; // Clear input
	document.getElementById("priority").value = "low"; // Set the default priority value
  	document.getElementById("category").value = "work"; // Set the default category value
	document.getElementById("dueDate").value = ""; // Clear input
}




function editTask(toDo) {
	const editContainer = document.getElementById("edit-container");
	const editNameDisplay = document.getElementById("editNameDisplay");
	const editNameInput = document.getElementById("editName");
	const editPriorityInput = document.getElementById("editPriority");
	const editCategoryInput = document.getElementById("editCategory");
	const editDueDateInput = document.getElementById("editDueDate");
  
	editNameDisplay.textContent = toDo.name;
	editNameDisplay.style.display = "inline";
	editNameInput.style.display = "none";
  
	editPriorityInput.value = toDo.priority;
	editCategoryInput.value = toDo.category;
	editDueDateInput.value = toDo.dueDate;
  
	// Make it visible in block format
	editContainer.style.display = "block";
  
	// Save edited task
	const saveButton = document.getElementById("saveEdit");
	saveButton.addEventListener("click", () => {
		// Update the task with edited values
		toDo.priority = editPriorityInput.value;
		toDo.category = editCategoryInput.value;
		toDo.dueDate = editDueDateInput.value;

		save();
		refresh();

		// Make it invisiable
		editContainer.style.display = "none";
	});
  }
  

//Delete a single ToDo
function deleteToDo(toDo) {
	// Find the index of the task
	const taskIndex = list.findIndex((task) => task.id === toDo.id);
  
	if (taskIndex !== -1) {
	  // Remove the task from the 'list' array
	  list.splice(taskIndex, 1);
	  save();
	  refresh();
	}
  }



//refresh the todo list
function refresh(){
	const todoList = document.getElementById("taskList");
	todoList.innerHTML = ""; // clean the list first, 
	
	list.forEach(toDo=>{ //현재는 정말 기본적인 동작 밖에 안함- 추가해야할 것: 체크, 수정(시간없으면 뺄지도),
						// 오늘까지인 일정 빨간색 표시(대충 완료)
 
 		let li = document.createElement('li');

		// Create checkbox to mark 'complete'
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.checked = toDo.status;
		checkbox.addEventListener("change", () => {
			toDo.status = checkbox.checked;
			save();
			if (checkbox.checked) {
				nameSpan.classList.add("completed");
				dueDateSpan.classList.add("completed");
				prioritySpan.classList.add("completed");
				categorySpan.classList.add("completed");
			} else {
				nameSpan.classList.remove("completed");
				dueDateSpan.classList.remove("completed");
				prioritySpan.classList.remove("completed");
				categorySpan.classList.remove("completed");
			}
    	});
		li.appendChild(checkbox);

		// Cross out completed task
		const nameSpan = document.createElement("span");
		nameSpan.innerText = toDo.name;
		if (checkbox.checked) {
			nameSpan.classList.add("completed");
		}

		// Display dueDate, priority, category for each task
		const dueDateSpan = document.createElement("span");
		dueDateSpan.innerText = `Due Date: ${toDo.dueDate}`;

		const prioritySpan = document.createElement("span");
		prioritySpan.innerText = `Priority: ${toDo.priority}`;

		const categorySpan = document.createElement("span");
		categorySpan.innerText = `Category: ${toDo.category}`;

		li.appendChild(nameSpan);
		li.appendChild(dueDateSpan);
    	li.appendChild(prioritySpan);
    	li.appendChild(categorySpan);
    	


       	if(isDue(toDo)){// if todo is due today, change the color to red. 
       		li.style = "color:red";
       		//console.log("Changed the color");
		}

		// Create edit button for each task
		const editButton = document.createElement("button");
		editButton.innerText = "Edit";
		editButton.addEventListener("click", () => {
			editTask(toDo);
		});
		li.appendChild(editButton);


		const deleteButton = document.createElement("button");
		deleteButton.innerText = "Delete";
		deleteButton.addEventListener("click", () => {
			deleteToDo(toDo);
		});
		li.appendChild(deleteButton);

		// li.innerHTML = toDo.name;
        todoList.append(li);
        })
	
 }



// check if the todo is due today
function isDue(toDo){
	/* This is for debugging process. will be deleted later 
	if(toDo.dueDate == formatToday()){

		console.log("Yes it is due today!") 
	}*/
	
	return toDo.dueDate == formatToday();
}

function formatToday(){ // copied from stack overflow. might be changed if there is more simple code
	 var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

//mark down

//filter 

// filter by category

// filter by status

// alaraming overdue tasks 

//save to local storage (You can delete anytime if there is no time to implement)
function save(){
	
}

