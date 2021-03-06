/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date;
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}

function createEmployeeRecord(employee) {
  return Object.assign({}, {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  });
}


function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}


function createTimeInEvent(dateTime) {
  let [date, hour] = dateTime.split(' ');
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}


function createTimeOutEvent(dateTime) {
  let [date, hour] = dateTime.split(' ');
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });
  return this;
}


function hoursWorkedOnDate(dateWorked) {
  const timeInRecord = this.timeInEvents.find(function(timeInEvent){
      return timeInEvent.date === dateWorked;
  })
  const hourIn = timeInRecord.hour;

  const timeOutRecord = this.timeOutEvents.find(function(timeOutEvent){
      return timeOutEvent.date === dateWorked;
  })
  const hourOut = timeOutRecord.hour;
  const hoursWorked = (hourOut - hourIn) / 100;
  return hoursWorked;
}



function wagesEarnedOnDate(dateWorked) {
  const hoursWorked = hoursWorkedOnDate.call(this, dateWorked);
  const wage = this.payPerHour;
  return hoursWorked * wage;
}



function allWagesFor() {
  const dates = this.timeInEvents.map(function(timeInEvent){
    return timeInEvent.date;
  })

  const wages = dates.reduce(function(total, date){
    return total + wagesEarnedOnDate.call(this, date);
  }.bind(this), 0)

  return wages;
}



function calculatePayroll(employees) {
  return employees.reduce((total, employee) => total + allWagesFor.call(employee), 0);
}



function findEmployeeByFirstName(employees, firstName) {
  return employees.find(function(employee) {
    return employee.firstName === firstName;
  })
}
