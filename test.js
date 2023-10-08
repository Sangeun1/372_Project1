const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('ToDo', function () {
  let driver;

  before(async function () {
    try {
      this.timeout(10000);
      driver = await new Builder().forBrowser('chrome').build();
    } catch (error) {
      console.error('Error during WebDriver setup:', error);
      throw error; // Rethrow the error to fail the test
    }
  });
  
  after(async function () {
    try {
      if (driver) {
        await driver.quit();
      }
    } catch (error) {
      console.error('Error during WebDriver teardown:', error);
      throw error; // Rethrow the error to fail the test
    }
  });
  

  it('should add a new todo to the list', async function () {
    try {
      await driver.get('http://localhost:3000');
  
      const taskNameInput = await driver.findElement(By.id('taskName'));
      const dueDateInput = await driver.findElement(By.id('dueDate'));
      const addButton = await driver.findElement(By.id('addTask'));
  
      await taskNameInput.sendKeys('Test Task');
      await dueDateInput.sendKeys('2024-12-31');
      await addButton.click();
  
      const taskList = await driver.findElement(By.id('taskList'));
      const tasks = await taskList.findElements(By.tagName('li'));
  
      assert.strictEqual(tasks.length, 1);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });

  it('should not add a new todo when inputName is empty', async function () {
    try {
      await driver.get('http://localhost:3000');
  
      const addButton = await driver.findElement(By.id('addTask'));
      await addButton.click();
  
      await driver.wait(until.elementLocated(By.id('taskList')), 5000);
  
      const taskList = await driver.findElement(By.id('taskList'));
      const tasks = await taskList.findElements(By.tagName('li'));
  
      assert.strictEqual(tasks.length, 0);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });

  it('should mark a task as completed', async function () {
    try {
      await driver.get('http://localhost:3000');

      const taskNameInput = await driver.findElement(By.id('taskName'));
      const dueDateInput = await driver.findElement(By.id('dueDate'));
      const addButton = await driver.findElement(By.id('addTask'));

      await taskNameInput.sendKeys('Test Task');
      await dueDateInput.sendKeys('2024-12-31');

      await addButton.click();

      const taskList = await driver.findElement(By.id('taskList'));
      const tasks = await taskList.findElements(By.tagName('li'));

      const checkbox = await driver.findElement(By.xpath('//input[@type="checkbox"]'));
      await checkbox.click();

      const completedTask = await driver.findElement(By.className('completed'));
      const isCompleted = await completedTask.isDisplayed();

      assert.strictEqual(isCompleted, true);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });

  it('should add a new uncompleted todo to the list', async function () {
    try {
      await driver.get('http://localhost:3000');
  
      const taskNameInput = await driver.findElement(By.id('taskName'));
      const dueDateInput = await driver.findElement(By.id('dueDate'));
      const addButton = await driver.findElement(By.id('addTask'));
  
      await taskNameInput.sendKeys('Uncompleted Task');
      await dueDateInput.sendKeys('2024-12-31');
      await addButton.click();
  
      const taskList = await driver.findElement(By.id('taskList'));
      const tasks = await taskList.findElements(By.tagName('li'));
  
      assert.strictEqual(tasks.length, 1);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });

  it('should filter tasks by category', async function () {
    try {
      await driver.get('http://localhost:3000');
  
      const taskNameInput = await driver.findElement(By.id('taskName'));
      const categoryInput = await driver.findElement(By.id('category'));
      const dueDateInput = await driver.findElement(By.id('dueDate'));
      const addButton = await driver.findElement(By.id('addTask'));
  
      await taskNameInput.sendKeys('Task 1');
      await categoryInput.sendKeys('work');
      await dueDateInput.sendKeys('2023-12-31'); 
      await addButton.click();
  
      await taskNameInput.sendKeys('Task 2');
      await categoryInput.sendKeys('school');
      await dueDateInput.sendKeys('2023-12-31'); 
      await addButton.click();
  
      await taskNameInput.sendKeys('Task 3');
      await categoryInput.sendKeys('work');
      await dueDateInput.sendKeys('2023-12-31');
      await addButton.click();
  
      const categoryFilter = await driver.findElement(By.id('categoryFilter'));
      await categoryFilter.sendKeys('work');
      
      const taskList = await driver.findElement(By.id('taskList'));
      const tasks = await taskList.findElements(By.tagName('li'));
  
      assert.strictEqual(tasks.length, 2);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });


  it('should filter tasks by priority', async function () {
    try {
      await driver.get('http://localhost:3000');
  
      const taskNameInput = await driver.findElement(By.id('taskName'));
      const priorityInput = await driver.findElement(By.id('priority'));
      const dueDateInput = await driver.findElement(By.id('dueDate'));
      const addButton = await driver.findElement(By.id('addTask'));
  
      await taskNameInput.sendKeys('Task 1');
      await priorityInput.sendKeys('low');
      await dueDateInput.sendKeys('2023-12-31'); 
      await addButton.click();
  
      await taskNameInput.sendKeys('Task 2');
      await priorityInput.sendKeys('low');
      await dueDateInput.sendKeys('2023-12-31'); 
      await addButton.click();
  
      await taskNameInput.sendKeys('Task 3');
      await priorityInput.sendKeys('high');
      await dueDateInput.sendKeys('2023-12-31');
      await addButton.click();
  
      const priorityFilter = await driver.findElement(By.id('priorityFilter'));
      await priorityFilter.sendKeys('high');
      
      const taskList = await driver.findElement(By.id('taskList'));
      const tasks = await taskList.findElements(By.tagName('li'));
  
      assert.strictEqual(tasks.length, 1);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  });
  
});
