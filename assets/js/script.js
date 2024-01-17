// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {
  let hour9El = $("#hour-9");
  let hour10El = $("#hour-10");
  let hour11El = $("#hour-11");
  let hour12El = $("#hour-12");
  let hour13El = $("#hour-13");
  let hour14El = $("#hour-14");
  let hour15El = $("#hour-15");
  let hour16El = $("#hour-16");
  let hour17El = $("#hour-17"); 

  let hourArray = [hour9El, hour10El, hour11El, hour12El, hour13El, hour14El, hour15El, hour16El, hour17El];
  // initializing plans with an empty array.
  let plans =[];
  plans = localStorage.getItem("plans")?localStorage.getItem("plans"): plans;

  // handle displaying the current week day, Month and day of the month.
  function displayTime(){
    let currentDayEl = $("#currentDay");
    currentDayEl.text(moment().format('dddd, MMMM Do')); 
  }

 // handle displaying the current hours in 24 hours format (0-23).
  let currentHour = moment().format('H');
 // handle the hour block background color depending on the time of the day (past ="gray-color", present= "red-color" and future="green-color");
  function timeBackGround(){
    for(let i=0; i<9; i++) {
      let calTime = hourArray[i].text().trim();
      morningTimeCal = calTime.includes("AM")? true:false;
      currentHour=parseInt(currentHour);
      calTime = parseInt(calTime);
      //using condition (ternary) operator checking mornings and afernoon and then added 12 hours inorder to change it to 24 hour format.
      calTime = !morningTimeCal && calTime !==12 ? calTime + 12 :calTime;
      if(calTime < currentHour) hourArray[i].addClass('past');
      else if(calTime === currentHour) hourArray[i].addClass('present');
      else hourArray[i].addClass('future');
    }
  }
  // The following function renders items in a plans array.
  function renderSchedulPlan() {
    // Clear and update work day schedule
    for (var i = 0; i < 9; i++) {
      let plan = plans[i];
      hourArray[i].children().eq(1).val(plan);
      $( hourArray[i].children().eq(1)).attr("data-index", i);
    }
  }
  // This function is being called below and will run when the page loads.

  let header = $("header");
  let para = document.createElement("p");

  function init() {
    // Get stored plan from localStorage
    let storedSchedulePlan = JSON.parse(localStorage.getItem("plans"));
    para.setAttribute("class", "custom-border-top")
    header.append(para);
  
    // If plans were retrieved from localStorage, update the plan array to it
    if (storedSchedulePlan !== null) plans = storedSchedulePlan;
    // This is a helper function that will render plans to the DOM
    renderSchedulPlan();
  }

  // Stringify and set key in localStorage to plans array
  const storeSchedulePlan =() => localStorage.setItem("plans", JSON.stringify(plans));

  // Add click event to work day schedul button elements
  $(".saveBtn" ).on( "click", function(event) {
    let span = document.createElement("span");
    let img = document.createElement("img");
    let element = event.currentTarget;

    para.textContent ='Appointment Added to ';
    span.textContent ="localStorage";
    span.setAttribute("class","text-danger");
    para.appendChild(span);
    //Add "Done" icon
    img.setAttribute("src", "./assets/img/check.png");
    para.appendChild(img);
    header.append(para);

    setTimeout(function (){
      para.remove();
    },3000)
   
    // Checks if element is a button
    if (element.matches("button") === true) {
      // Get its data-index value and save the plan of the hour block to the array.
      let inputText = $(element).prev().val().trim();
      let index =  $(element).prev().attr("data-index");
      plans[index] = inputText;
      // Store updated plans in localStorage, re-render the list
      localStorage.setItem("plans", JSON.stringify(plans));
    }
  });
  // Calls init to retrieve data and render it to the page on load
  init()
  // handle the hour block background color depending on the time of the day (past ="gray-color", present= "red-color" and future="green-color");
  timeBackGround();
  //set the interval seconds(in mili seconds - i.e 1second = 1000miliseconds) for the displayTime function
  setInterval(displayTime, 1000);
});


