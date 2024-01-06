// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  let hour09El = $("#hour-9");
  let hour10El = $("#hour-10");
  let hour11El = $("#hour-11");
  let hour12El = $("#hour-12");
  let hour13El = $("#hour-13");
  let hour14El = $("#hour-14");
  let hour15El = $("#hour-15");
  let hour16El = $("#hour-16");
  let hour17El = $("#hour-17"); 


  // handle displaying the current week day, Month and day of the month.
  function displayTime(){
    let currentDayEl = $("#currentDay");
    currentDayEl.text(moment().format('dddd, MMMM Do'));
    
  }

  function timeBackGround(){
    let hourArray = [hour09El, hour10El, hour11El, hour12El, hour13El, hour14El, hour15El, hour16El, hour17El]
    let currentHour = moment().format('k kk');
    for(let i=0; i<9; i++) {
      let calTime = hourArray[i].text().trim();
      morningTimeCal = calTime.includes("AM")? true:false;
      currentHour=parseInt(currentHour);
      calTime = parseInt(calTime);
      calTime = !morningTimeCal && calTime !==12 ? calTime + 12 :calTime;
          if(calTime < currentHour){
            hourArray[i].removeClass('present future past');
            hourArray[i].addClass('past');
          }
          else if(calTime === currentHour){
            hourArray[i].removeClass('present future past');
            hourArray[i].addClass('present');
          }
          else {
            hourArray[i].removeClass('present future past');
            hourArray[i].addClass('future');
          }
    }
  }

  timeBackGround();
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  setInterval(displayTime, 1000);
});


