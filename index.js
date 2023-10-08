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

			// return; 
		}

		let status;
		if (dueDate < today) {
			status = 'overdue';
		} else {
			status = 'uncompleted';
		}
	
		console.log(status);
		const toDo ={
			id: Date.now(),
			name: inputName,
			priority: inputPriority,
			category: inputCategory,
			status: status,
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
		checkOverdueTasks(); // Check for overdue tasks

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
		if (toDo.dueDate < formatToday() && toDo.status != 'completed' ) {
			alert("Pending overdue task.")
			li.style = "color:red";
		}

		// Create checkbox to mark 'complete'
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		
		li.appendChild(checkbox);


		const nameSpan = document.createElement("span");
		nameSpan.innerText = toDo.name;
		li.appendChild(nameSpan);
		
		// Display dueDate, priority, category for each task
		const dueDateSpan = document.createElement("span");
		dueDateSpan.innerText = `Due Date: ${toDo.dueDate}`;
		li.appendChild(dueDateSpan);

		const prioritySpan = document.createElement("span");
		prioritySpan.innerText = `Priority: ${toDo.priority}`;
		li.appendChild(prioritySpan);

		const categorySpan = document.createElement("span");
		categorySpan.innerText = `Category: ${toDo.category}`;
		li.appendChild(categorySpan);
    	
    	
		checkbox.addEventListener("change", () => {
			toDo.status = checkbox.checked ? 'completed' : 'uncompleted';
			save();
			console.log("HERE", toDo.status);
			if (toDo.status === 'completed') {
				li.classList.add("completed");
			} else {
				li.classList.remove("completed");
				toDo.status = 'uncompleted';
			}
    	});

		if (toDo.status === 'completed') {
			li.classList.add("completed");
		} else {
			li.classList.remove("completed");
		}
		

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

function checkOverdueTasks() {
    const today = new Date();

    list.forEach((toDo) => {
        const dueDate = new Date(toDo.dueDate);

        if (dueDate < today && !toDo.status) {
			toDo.status = "overdue";
            alert(`Task "${toDo.name}" is overdue!`);
        }
    });
}

//mark down


//save to local storage (You can delete anytime if there is no time to implement)
function save(){
	
}


function filterCategory() {
	const selectedCategory = categoryFilter.value;
	const filteredList = list.filter((task) => task.category === selectedCategory || selectedCategory === "all");

	const todoList = document.getElementById("taskList");
	todoList.innerHTML = ""; // clean the list first, 
	
	filteredList.forEach(toDo=>{ //현재는 정말 기본적인 동작 밖에 안함- 추가해야할 것: 체크, 수정(시간없으면 뺄지도),
						// 오늘까지인 일정 빨간색 표시(대충 완료)
 
 		let li = document.createElement('li');
		if (toDo.dueDate < formatToday() && toDo.status != 'completed' ) {
			alert("Pending overdue task.")
			li.style = "color:red";
		}

		// Create checkbox to mark 'complete'
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		
		li.appendChild(checkbox);


		const nameSpan = document.createElement("span");
		nameSpan.innerText = toDo.name;
		li.appendChild(nameSpan);
		
		// Display dueDate, priority, category for each task
		const dueDateSpan = document.createElement("span");
		dueDateSpan.innerText = `Due Date: ${toDo.dueDate}`;
		li.appendChild(dueDateSpan);

		const prioritySpan = document.createElement("span");
		prioritySpan.innerText = `Priority: ${toDo.priority}`;
		li.appendChild(prioritySpan);

		const categorySpan = document.createElement("span");
		categorySpan.innerText = `Category: ${toDo.category}`;
		li.appendChild(categorySpan);
    	
    	
		checkbox.addEventListener("change", () => {
			toDo.status = checkbox.checked ? 'completed' : 'uncompleted';
			save();
			console.log("HERE", toDo.status);
			if (toDo.status === 'completed') {
				li.classList.add("completed");
			} else {
				li.classList.remove("completed");
				toDo.status = 'uncompleted';
			}
    	});

		if (toDo.status === 'completed') {
			li.classList.add("completed");
		} else {
			li.classList.remove("completed");
		}
		

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


function filterStatus() {
	const selectedStatus = statusFilter.value;
    const filteredList = list.filter((task) => {
        if (selectedStatus === "all") {
            return true; // Show all tasks
        } else if (selectedStatus === "completed") {
            return task.status === 'completed'; // Show completed tasks
        } else if (selectedStatus === "uncompleted") {
            return task.status === 'uncompleted'; // Show uncompleted tasks
        } else if (selectedStatus === "overdue") {
            return task.status === 'overdue'; // Show overdue tasks
        }
    });

	const todoList = document.getElementById("taskList");
	todoList.innerHTML = ""; 
	
	filteredList.forEach(toDo=>{ //현재는 정말 기본적인 동작 밖에 안함- 추가해야할 것: 체크, 수정(시간없으면 뺄지도),
		// 오늘까지인 일정 빨간색 표시(대충 완료)

		let li = document.createElement('li');
		if (toDo.dueDate < formatToday() && toDo.status != 'completed' ) {
			alert("Pending overdue task.")
			li.style = "color:red";
		}

		// Create checkbox to mark 'complete'
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";

		li.appendChild(checkbox);


		const nameSpan = document.createElement("span");
		nameSpan.innerText = toDo.name;
		li.appendChild(nameSpan);

		// Display dueDate, priority, category for each task
		const dueDateSpan = document.createElement("span");
		dueDateSpan.innerText = `Due Date: ${toDo.dueDate}`;
		li.appendChild(dueDateSpan);

		const prioritySpan = document.createElement("span");
		prioritySpan.innerText = `Priority: ${toDo.priority}`;
		li.appendChild(prioritySpan);

		const categorySpan = document.createElement("span");
		categorySpan.innerText = `Category: ${toDo.category}`;
		li.appendChild(categorySpan);


		checkbox.addEventListener("change", () => {
			toDo.status = checkbox.checked ? 'completed' : 'uncompleted';
			save();
			if (toDo.status === 'completed') {
				li.classList.add("completed");
			} else {
				li.classList.remove("completed");
				toDo.status = 'uncompleted';
			}
		});

		if (toDo.status === 'completed') {
			li.classList.add("completed");
		} else {
			li.classList.remove("completed");
		}


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

function filterPriority() {
	const selectedPriority = priorityFilter.value;
    const filteredList = list.filter((task) => {
        if (selectedPriority === "all") {
            return true; // Show all tasks
        } else {
            return task.priority === selectedPriority;
        }
    });
	const todoList = document.getElementById("taskList");
	todoList.innerHTML = ""; 
	
	filteredList.forEach(toDo=>{ //현재는 정말 기본적인 동작 밖에 안함- 추가해야할 것: 체크, 수정(시간없으면 뺄지도),
		// 오늘까지인 일정 빨간색 표시(대충 완료)

		let li = document.createElement('li');
		if (toDo.dueDate < formatToday() && toDo.status != 'completed' ) {
			alert("Pending overdue task.")
			li.style = "color:red";
		}

		// Create checkbox to mark 'complete'
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";

		li.appendChild(checkbox);


		const nameSpan = document.createElement("span");
		nameSpan.innerText = toDo.name;
		li.appendChild(nameSpan);

		// Display dueDate, priority, category for each task
		const dueDateSpan = document.createElement("span");
		dueDateSpan.innerText = `Due Date: ${toDo.dueDate}`;
		li.appendChild(dueDateSpan);

		const prioritySpan = document.createElement("span");
		prioritySpan.innerText = `Priority: ${toDo.priority}`;
		li.appendChild(prioritySpan);

		const categorySpan = document.createElement("span");
		categorySpan.innerText = `Category: ${toDo.category}`;
		li.appendChild(categorySpan);


		checkbox.addEventListener("change", () => {
			toDo.status = checkbox.checked ? 'completed' : 'uncompleted';
			save();
			console.log("HERE", toDo.status);
			if (toDo.status === 'completed') {
				li.classList.add("completed");
			} else {
				li.classList.remove("completed");
				toDo.status = 'uncompleted';
			}
		});

		if (toDo.status === 'completed') {
			li.classList.add("completed");
		} else {
			li.classList.remove("completed");
		}


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

const categoryFilter = document.getElementById("categoryFilter");
categoryFilter.addEventListener("change", () => {
    filterCategory();
});


const statusFilter = document.getElementById("statusFilter");
statusFilter.addEventListener("change", () => {
    filterStatus();
});

const priorityFilter = document.getElementById("priorityFilter");
priorityFilter.addEventListener("change", () => {
    filterPriority();
});


/***************************************************************/
/***********************Manual testing**************************/
/***************************************************************/
/**
 * Call each function in your broswer's console
 * 		testMarkTaskAsCompleted();
 * 		testMarkTaskAsOverdue();
 */



function markTaskAsCompleted(task) {
    task.status = 'completed';
}
  
function testMarkTaskAsCompleted() {
    const task = {
      id: 1,
      name: 'Sample Task',
      status: 'uncompleted', 
      priority: 'medium',
      category: 'work',
      dueDate: '2023-12-31', 
    };
    // Assert that the task starts as 'uncompleted'
    console.assert(task.status === 'uncompleted', 'Task should start as uncompleted');
  
    // Mark the task as completed
    markTaskAsCompleted(task);
  
    // Assert that the task is now 'completed'
    console.assert(task.status === 'completed', 'Task should be marked as completed');
}

function markTaskAsOverdue(task) {
	const dueDate = new Date(task.dueDate);
	const today = new Date();
  
	if (dueDate < today) {
	  task.status = 'overdue';
	}
  }
  
  function testMarkTaskAsOverdue() {
	const overdueTask = {
	  id: 1,
	  name: 'Overdue Task',
	  status: 'uncompleted',
	  priority: 'medium',
	  category: 'work',
	  dueDate: '2023-10-01', // Past due date
	};
  
	const futureTask = {
	  id: 2,
	  name: 'Future Task',
	  status: 'uncompleted',
	  priority: 'low',
	  category: 'personal',
	  dueDate: '2023-12-31', // Future due date
	};
  
	console.assert(
	  overdueTask.status === 'uncompleted',
	  'Overdue task should start as uncompleted'
	);
  
	console.assert(
	  futureTask.status === 'uncompleted',
	  'Future task should start as uncompleted'
	);
  
	markTaskAsOverdue(overdueTask);
  	markTaskAsOverdue(futureTask);
  
	console.assert(
	  overdueTask.status === 'overdue',
	  'Overdue task should be marked as overdue'
	);
  
	// Assert that the future task is still 'uncompleted' (not overdue)
	console.assert(
	  futureTask.status === 'uncompleted',
	  'Future task should remain uncompleted (not overdue)'
	);
  }
  

  
  

  