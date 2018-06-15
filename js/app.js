// global variables for HTML elements
const $container = $(".container");
const $userInput = $("#search");
const $searchButton = $(".button");
let $employeeBox = $(".box");


// class constructor to create random employee
class Employee {

  constructor (name, location, email, picture, login, cell, dob) {
    this.name = name;
    this.location = location;
    this.email = email;
    this.picture = picture;
    this.login = login;
    this.cell = cell;
    this.dob = dob;
  }

  // create new div for each employee
  createDiv() {
    let div = `
      <div class="box">
      <img src="${this.picture.medium}">
        <div class="info">
          <h3 class="name">${this.name.first} ${this.name.last}</h3>
          <p class="email">${this.email}</p>
          <p class="location">${this.location.city}</p>
        </div>
      </div>`;
    return div;
  }

  createModalWindow() {
    // get date
    let date = this.dob.substring(0, 10);
    const dateSplit = date.split("-");
    let year = dateSplit[0][2] + dateSplit[0][3];
    let month = dateSplit[1];
    let day = dateSplit[2];
    let finalDate = month + "/" + day + "/" + year;

    let window = `
      <div class="modal">
      <div class="x">
        <span class="close">X</span>
      </div>
        <img src="${this.picture.large}">
          <div>
            <h3 class="name">${this.name.first} ${this.name.last}</h3>
            <p>${this.login.username}</p>
            <p class="email">${this.email}</p>
            <p class="location">${this.location.city}</p><br>
            <p>${this.cell}</p>
            <p class="location">${this.location.street} ${this.location.city},${this.location.state} ${this.location.postcode}</p>
            <p class="birthday">Birthday: ${finalDate}</p>
            <a href="#" class="prev">&lArr;</a>
            <a href="#" class="next">&rArr;</a>
          </div>
      </div>
    `;
    return window;
  }
}

// array to hold data received using Fetch API
let employeeArray = [];

// use Fetch to retrieve data for 12 random employees and parse to JSON
const getRandomEmployee = () => {
  return fetch('https://randomuser.me/api/?results=12&inc=name,location,email,picture,login,cell,dob&nat=NZ,US')
  .then(res => res.json())
  .then(data => {return data.results});
}

// take the retrieved data and append one employee per box
function appendEmployee() {
  getRandomEmployee()
    .then(results => {
      const employees = results;
      employees.map(employee => {
        const empl = new Employee(employee.name, employee.location, employee.email, employee.picture, employee.login, employee.cell, employee.dob);
        employeeArray.push(empl);
      });
      employeeArray.map(employee => {
        const square = employee.createModalWindow();
        $container.append(square);
      })
    });
}
appendEmployee();

// click function that responds to clicks anywhere on a box
// if clicked, show the employee for that specific box
// create a separate function under appendEmployee


// console.log(employeeArray);
