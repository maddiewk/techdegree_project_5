// global variables for HTML elements
const page = $("body");
const $container = $(".container");
const $userInput = $("#search");
const $searchButton = $(".button");
const $closeButton = $(".close");
const $myModal = $(".modal");

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

 createModalWindow(profile) {

  const birthdayFormat = (bday) => {
    // get date
    let emplBday = bday.slice(0,10).split("-");
    return `${emplBday[1]}/${emplBday[2]}/${emplBday[0].slice(2,4)}`;
  }

  let window = `
    <div class="modal">
        <img src="${this.picture.large}">
        <span class="close">X</span>
          <h3>${this.name.first} ${this.name.last}</h3>
            <p class="username">${this.login.username}</p>
            <p class="email">${this.email}</p>
            <p class="location">${this.location.city}</p><br>
            <p>${this.cell}</p>
            <p class="location">${this.location.street} ${this.location.city}, ${this.location.state} ${this.location.postcode}</p>
            <p class="birthday">Birthday: ${birthdayFormat(this.dob.date)}</p>
            <a href="#" class="prev">&lArr;</a>
            <a href="#" class="next">&rArr;</a>
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
  .then(response => response.json())
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
        $container.append(square);

        const modalWindow = employee.createModalWindow();
        $container.append(modalWindow);

        $(".modal").hide();
      });


    // function toggleModalWindow() {
    //   write code to switch between "normal" viewing page and modal page,
    //   then call this function using conditional statements in the click functions
    //   below?
    // }


    $(".box").on("click", function() {
      $(this).next().show();
      $(".box").addClass("disabled");
      $("body").addClass("overlay");
    });

    $(".close").on("click", function() {
      $(this).parent().hide();
      $(".box").removeClass("disabled");
      $("body").removeClass("overlay");
    });

    $(".prev").on("click", function() {
      let parent = $(this).parent();
      parent.hide();
      parent.prev().prev().show();
    });

    $(".next").on("click", function() {
      let parent = $(this).parent(); // gets the modal window div currently displaying
      // let lastParent = employeeArray[employeeArray.length - 1]; // gets the last modal window div in the list?
      // if ( lastParent ) {
      //   console.log("Null!");
      //   $(this).css('pointer-events', 'none'); // doesn't work to disable the mouse click - find something else
      // } else {
      //   console.log("Didn't work...");
        parent.hide();
        parent.next().next().show();
      })
    // });

    // search bar function below

    $userInput.on('keyup', function(){
      let userSearch = $userInput.val().toLowerCase();
      let names = $('.name');
      let username = $('.username');

      for (i = 0; i < names.length; i += 1) {
        if ( names[i].innerHTML.indexOf(userSearch) > -1 ) {
          names[i].parentElement.parentElement.style.display = "";
        } else {
          names[i].parentElement.parentElement.style.display = 'none';
        }
      }

      for (i = 0; i < username.length; i += 1) {
        if ( username[i].innerHTML.indexOf(userSearch) > -1 ) {
          names[i].parentElement.parentElement.style.display = "";
        } else {
          names[i].parentElement.parentElement.style.display = 'none';
        }
      }

    });


    });

}
appendEmployee();
