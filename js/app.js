// class constructor to create random employee
class Employee {

  constructor (name, location, email, picture, cell, dob) {
    this.name = name;
    this.location = location;
    this.email = email;
    this.picture = picture;
    this.cell = cell;
    this.dob = dob;
  }
  // create new div for each employee
  createDiv() {
    let div = `
      <div class="box">
      <img src="${this.picture.medium}">
        <div class="info">
          <h3>${this.name.first} ${this.name.last}</h3>
          <p class="email">${this.email}</p>
          <p class="location">${this.location.city}</p>
        </div>
      </div>`;
    return div;
  }
}

// array to hold data received from Fetch API
let employeeArray = [];

const getRandomEmployee = () => {
  return fetch('https://randomuser.me/api/?results=12&inc=name,location,email,picture,cell,dob&nat=US')
  .then(res => res.json())
  .then(data => {return data.results});
}

function appendEmployee() {
  getRandomEmployee()
    .then(results => {
      const employees = results;
      employees.map(employee => {
        const empl = new Employee(employee.name, employee.location, employee.email, employee.picture, employee.cell, employee.dob);
        employeeArray.push(empl);
      });
      employeeArray.map(employee => {
        const square = employee.createDiv();
        $(".container").append(square);
      })
    });
}
appendEmployee();


// original fetch request
// fetch('https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,id,picture')
//   .then(res => res.json())
//   .then(data => {
//     console.log(data);
//   })

// create class constructor for employees
// loop through array that holds all the data fetched (use forEach)
// inside that loop, go through each div (class of "box") to attach one employee with all info
// use jQuery inside the second loop? Something like:
// $('.box').each(function() {
  // let employee = new Employee(`${picture}${name}${email}${location}`);
  // employeeDiv.innerHTML = employee;
// })

// employeeArray.forEach(function() {
//   $('.container').each(function() {
//     let employee = new Employee(`${picture}${name}${email}${location}`);
//     employeeDiv.innerHTML = employee;
//   })
// })

// employeeDiv.forEach(function() {
//   let employee = new Employee(`${picture}${name}${email}${location}`);
//   employeeDiv.innerHTML = employee;
// });
