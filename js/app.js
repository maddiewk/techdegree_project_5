// global variables for HTML elements
const page = $("body");
const $container = $(".container");
// const $employeeBox = $(".employees");
const userInput = document.getElementById("search");
const $searchButton = $(".button");
// const $modalBox = $(".details");
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

  const birthdayFormat = (bday) => {
    // get date
    let emplBday = bday.slice(0,10).split("-");
    return `${emplBday[1]}/${emplBday[2]}/${emplBday[0].slice(2,4)}`;
  }

  let window = `
    <div class="modal">
      <span class="close">&times;</span>
        <img src="${profile.picture.large}">
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
        const modalWindow = createModalWindow(employee);

        $container.append(square);
        $container.append(modalWindow);

        $(".modal").hide();
      })
      //loop through the array that was just created to show various values for the different object keys
    //   function captureCity() {
    //   employeeArray.forEach((element, index, array) => {
    //       console.log(element.location.city);
    //       // console.log(index);
    //       // console.log(array);
    //   });
    // }

    function toggleModalWindow() {
      // write code to switch between "normal" viewing page and modal page,
      // then call this function using conditional statements in the click functions
      // below?
    }


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
      let lastParent = employeeArray[employeeArray.length - 1]; // gets the last modal window div in the list
      if ( lastParent ) {
        console.log("Null!");
        $(this).css('pointer-events', 'none'); // doesn't work to disable the mouse click - find something else
      } else {
        console.log("Didn't work...");
        parent.hide();
        parent.next().next().show();
      }
    });

    // search bar function below:

    

    });

}
appendEmployee();
