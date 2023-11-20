function createEmployeeRecord(employeeData){
    
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(nestedArray){
    return nestedArray.map(employeeArray => createEmployeeRecord(employeeArray));
}

function createTimeInEvent(employeeRecord, dateStamp){
    const [date, time] = dateStamp.split(" ");
    const [hourString] = time.split(":");
    const hour = parseInt(hourString);
    const timeInEvent = {
        type: "TimeIn",
        hour: hour,
        date: date,
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const [date, time] = dateStamp.split(" ");
    const [hourString] = time.split(":");
    const hour = parseInt(hourString);
    const timeOutEvent = {
        type: "TimeOut",
        hour: hour,
        date: date,
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    const timeInHour = timeInEvent.hour;
    const timeOutHour = timeOutEvent.hour;
  
    const hoursWorked = timeOutHour - timeInHour;
  
    return hoursWorked/100
  }

  function wagesEarnedOnDate(employeeRecord, date){
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
  }

  function allWagesFor(employeeRecord){
    const timeInEvents = employeeRecord.timeInEvents;
    const datesWorked = timeInEvents.map(event => event.date) || [];
    const totalWages = datesWorked.reduce((sum, date) => {
      return sum + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
  }

  function calculatePayroll(employeeRecords){
    const totalPayroll = employeeRecords.reduce((sum, employeeRecord) => {
        const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
        const wagesForDates = datesWorked.map(date => wagesEarnedOnDate(employeeRecord, date));
        const totalWages = wagesForDates.reduce((wagesSum, wages) => wagesSum + wages, 0);
        return sum + totalWages;
      }, 0);
    
      return totalPayroll;
  }