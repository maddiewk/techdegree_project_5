// global variables for HTML elements
const $container = $(".container");
const $employeeBox = $(".employees");
const userInput = document.getElementById("#search");
const searchButton = document.querySelector(".button");
const $modalBox = $(".details");
let myModal = document.getElementsByClassName("modal");

const birthdayFormat = (bday) => {
  // get date
  let emplBday = bday.slice(0,10).split("-");
  return `${emplBday[1]}/${emplBday[2]}/${emplBday[0].slice(2,4)}`;
}

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
  createDiv () {
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

}

const createModalWindow = (profile) => {

  let window = `
    <div class="modal">
    <div class="x">
      <span class="close">X</span>
    </div>
      <img src="${profile.picture.large}">
        <div>
          <h3 class="name">${profile.name.first} ${profile.name.last}</h3>
          <p>${profile.login.username}</p>
          <p class="email">${profile.email}</p>
          <p class="location">${profile.location.city}</p><br>
          <p>${profile.cell}</p>
          <p class="location">${profile.location.street} ${profile.location.city}, ${profile.location.state} ${profile.location.postcode}</p>
          <p class="birthday">Birthday: ${birthdayFormat(profile.dob.date)}</p>
          <a href="#" class="prev">&lArr;</a>
          <a href="#" class="next">&rArr;</a>
        </div>
    </div>
  `;
  return window;
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
        const square = employee.createDiv();
        // const modalWindow = employee.createModalWindow();
        const modalWindow = createModalWindow(employee);

        $employeeBox.append(square);
        $modalBox.append(modalWindow);
      })
      
      // define event listener for each box

      // $(".box").on("click", function() {
      //   $(this).css("display", "block");
      // });

      $(".box").on("click", function() {
        console.log($(this).html());
      });

      $(".close").on("click", function() {
        $(".modal").css("display", "none");
      });

    });

}
appendEmployee();


//
// $employeeBox.on("click", function(event) {
//   // alert("HELLO");
//   // event.target.style.display = "block";
//   $(".modal").css("display", "block");
// });

// search button click function

// $(".button").on("click", function() {
//   alert("You clicked the search button");
// });



// click function that responds to clicks anywhere on a box
// if clicked, show the employee for that specific box
// create a separate click function under appendEmployee and call it
// in the appendEmployee function?
