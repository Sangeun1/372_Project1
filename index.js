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
	
	if(inputName!= ""){ // if inputName is not empty, make a new todo object
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
	

	
}


//Delete a single ToDo
function deleteToDo(){
	
}

//refresh the todo list
function refresh(){
	const todoList = document.getElementById("taskList");
	todoList.innerHTML = ""; // clean the list first, 
	
	list.forEach(toDo=>{ //현재는 정말 기본적인 동작 밖에 안함- 추가해야할 것: 체크, 수정(시간없으면 뺄지도),
						// 오늘까지인 일정 빨간색 표시(대충 완료)
 
 		let li = document.createElement('li');
       	if(isDue(toDo)){// if todo is due today, change the color to red. 
       		li.style = "color:red";
       		//console.log("Changed the color");
		}
		li.innerHTML = toDo.name;
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

