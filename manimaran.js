// INPUT : We are giving bills which contains how much amount each one paid for that perticular transaction
bills = [ 
    bill1 = {A:2000,B:200,C:1000},
    bill2 = {A:1500,B:0,C:0,D:1300},
    bill3 = {B:1000,C:0},
    bill4 = {X:400,Y:3000,Z:400}
]

// ***************************************************************************************************************************** 

finalThreeBill ={} // this is the final consolidated object it has the values 

// function 1 : sum of values in an object 
function sumObjValues(object){ 
    sum = 0 
    for(i in object){ 
        sum = sum + object[i] 
    }return(sum) 
    } 
// function 2 : length of an object 
function objectlength(object){ 
    arr = [] 
    for ( let i in object){ 
        arr.push([i]) 
        length = arr.length  
    }return (length) 
    } 
// function 3 : sorting objects in ascending order based upon their values 
    function sorting(objToSort){ 
        let sortedArray =[] 
    for(i in objToSort){ 
        sortedArray.push([i,objToSort[i]]) 
    } 
    sortedArray.sort((a,b) => a[1] - b[1] ) 
    sortedObj = {} 
    for (mani of sortedArray){ 
        sortedObj[mani[0]]=mani[1] 
    } 
    return sortedObj} 
// function 4 : sorting objects in descending order baser upon their values
function reverseSorting(objToSort){ 
    let sortedArray =[] 
for(i in objToSort){ 
    sortedArray.push([i,objToSort[i]]) 
} 
sortedArray.sort((a,b) => a[1] - b[1] ).reverse() 
revSortedObj = {} 
for (mani of sortedArray){ 
    revSortedObj[mani[0]]=mani[1] 
} 
return revSortedObj} 
// function 3 : removing key value pairs from an objects if it's value is zero 
function removeZero(objWithZeroVal){ 
noZeroObj={} 
for (i in objWithZeroVal){ 
    if (objWithZeroVal[i] != 0){ 
        noZeroObj[i]=objWithZeroVal[i] 
    } 
}return noZeroObj 
}   
// ***************************************************************************************************************************** 
function consolidatedBill(bill){     // It gives the consolidated values for each bills 
// Step : 1 finding sum of the bill  
sum = sumObjValues(bill) 
// Step : 2 finding the average  
length = objectlength(bill) 
average = sum / length  
// Step : 3 finding the amount to be paid by each person in the each bill " amount to be paid = contributed amount - average "
amountToBePaid= {} // Example : {A:-100,B:100} "A paid 100 rupees less "
for (let i in bill){ 
    amountToBePaid[i] = ((bill[i]) - average ) 
} 
return amountToBePaid 
} 
// Step : 4 summation of all the consolidated bills 
for (i in bills){ 
    sep = consolidatedBill(bills[i])
  for (i in sep){
  if(!(i in finalThreeBill)){
    finalThreeBill[i]=sep[i]
  }
  else{
    finalThreeBill[i]=finalThreeBill[i]+sep[i]
  }
} 
}
// ***************************************************************************************************************************** 
//  Step : 5 finding the amount shoud be paid by each individuals and printing it "Example : A has to give/pay __Rs to B"
finalThreeBill = sorting(finalThreeBill)

peopleTheyPay = {} //  People want the perticular amount of money from the concern person since they given more money than the average
peopleTheyGet = {} //  People has to pay the perticular amount to the concern person since they given less money then the average

for (pay in finalThreeBill){
if (finalThreeBill[pay]<0){
    peopleTheyPay[pay]=finalThreeBill[pay]
}
else{
    peopleTheyGet[pay]=finalThreeBill[pay]
}
}
peopleTheyGet = reverseSorting(peopleTheyGet) // Decending order > {person who paid lot will be in the first position}

// Settlement part > Person has to pay a bigger amount will give the money to the person who wants bigger amount first

for (nameOfGet in peopleTheyGet){
for (nameOfPay in peopleTheyPay){
    if (peopleTheyGet[nameOfGet] > Math.abs(peopleTheyPay[nameOfPay])){
        newval1 = (peopleTheyGet[nameOfGet] - Math.abs(peopleTheyPay[nameOfPay]))
        amountToPay1 = Math.abs(peopleTheyPay[nameOfPay])
        peopleTheyGet[nameOfGet] = newval1
        peopleTheyPay[nameOfPay] = 0
        peopleTheyGet = removeZero(peopleTheyGet)
        peopleTheyPay = removeZero(peopleTheyPay)
        console.log(`${nameOfPay} has to give the following amount to ${nameOfGet}`)
        console.log("   Rs.",amountToPay1,"/-")
    }
    else if(peopleTheyGet[nameOfGet] < Math.abs(peopleTheyPay[nameOfPay])){
        amountToPay2 = peopleTheyGet[nameOfGet]
        newval2 = (Math.abs(peopleTheyPay[nameOfPay])) - (Math.abs(peopleTheyGet[nameOfGet]))
        peopleTheyGet[nameOfGet] = 0
        peopleTheyPay[nameOfPay] = newval2
        peopleTheyGet = removeZero(peopleTheyGet)
        peopleTheyPay = removeZero(peopleTheyPay)
        console.log(`${nameOfPay} has to give the following amount to  ${nameOfGet}`)
        console.log("   Rs.",amountToPay2,"/-")
    }
    else if (Math.abs(peopleTheyGet[nameOfGet]) == Math.abs(peopleTheyPay[nameOfPay])){
        amountToPay3 = peopleTheyGet[nameOfGet]
        peopleTheyGet[nameOfGet] = 0
        peopleTheyPay[nameOfPay] = 0
        peopleTheyGet = removeZero(peopleTheyGet)
        peopleTheyPay = removeZero(peopleTheyPay)
        console.log(`${nameOfPay} has to give the following amount to ${nameOfGet}`)
        console.log("   Rs.",amountToPay3,"/-")
    }
}
}
