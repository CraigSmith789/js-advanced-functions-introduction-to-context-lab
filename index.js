// Your code here
let twoRows = [
  ["moe", "sizlak", "barkeep", 2,[{hour:12}],[{hour: 14}]],
  ["bartholomew", "simpson", "scamp", 3,[{hour:10}],[{hour: 15}]]
];

let createEmployeeRecord = function(array) {
  return {
  firstName: array[0],
  familyName: array[1],
  title: array[2],
  payPerHour: array[3],
  timeInEvents: [],
  timeOutEvents: []
   }
   
}
let createEmployeeRecords = function(array) {
  return array.map(function(e){
  return createEmployeeRecord(e);
  
  });
}
let createTimeInEvent = function(empl, dateStamp) {
  let d = dateStamp.slice(0,10);
  let h = dateStamp.slice(11,13);
  empl.timeInEvents.push ({ "type": "TimeIn", "hour": (parseInt(h)*100), "date": d})
  return empl;

}
let createTimeOutEvent = function(empl, dateStamp) {
  let d = dateStamp.slice(0,10);
  let h = dateStamp.slice(11,13);
  empl.timeOutEvents.push ({ "type": "TimeOut", "hour": (parseInt(h)*100), "date": d})
  return empl;

}
let hoursWorkedOnDate = function(empl, date){
  let out = empl.timeOutEvents.find(function(o){
    return o.date === date
  })
  let inn = empl.timeInEvents.find(function(i){
    return i.date === date
  })
  return (out.hour - inn.hour) / 100;
  //  debugger
  

}
let wagesEarnedOnDate = function(empl, date){
  let rate = empl.payPerHour;
  return hoursWorkedOnDate(empl, date) * rate
}

let allWagesFor = function(empl){
  let date = empl.timeInEvents.map(function(d){
    return d.date
  })
  let pay = date.reduce(function(accum, e){
    return accum + wagesEarnedOnDate(empl, e)
  }, 0 )
  return pay
}
let findEmployeeByFirstName = function(srcArray, firstName){
  const found = srcArray.find(firstName => firstName === firstName);
  return found;
}

let calculatePayroll = function(srcArray){
  return srcArray.reduce(function(accum, empl){
    return accum + allWagesFor(empl)
}, 0)

}
