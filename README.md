# ToDo List [CSC 372 Project1]
The ToDo List is a web-based task management application that allows you to keep track of your tasks, set due dates, assign priorities, and categorize your tasks. You can easily add, edit, and delete tasks as well as filter tasks by different criteria.

# Table of Contents

- [ToDo List [CSC 372 Project1]](#todo-list-csc-372-project1)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Testing](#testing)



## Features
- **Task Management:** Add, edit, and delete tasks. 
- **Due Dates:** Assign due dates to tasks to keep track of deadlines.
- **Priority Levels:** Categorize tasks by priority levels: Low, Medium, and High.
- **Categories:** Organize tasks into categories such as Work, School, and Personal.
- **Overdue Alerts:** Receive alerts for overdue tasks and highlight them in red.
- **Filtering:** Filter tasks by status, priority, and category to focus on what matters most.
- **Responsive Design:** The application is responsive and can be used on various devices.


## Getting Started
Start the server: 

```bash
   node server.js
```


Access the application in your web browser at [http://localhost:3000](http://localhost:3000).

## Testing

We use the `selenium-webdriver` framework along with `Mocha` for testing the ToDo List application. To run the tests, execute the following command:

```bash
   npx mocha test.js
 ```



