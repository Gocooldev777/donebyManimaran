// INPUT : We are giving bills which contains how much amount each one paid for that perticular transaction
bills = [ 
    bill1 = {A:1000,B:2000,C:1000},
    bill2 = {A:1000,B:250,C:750,D:1250},
    bill3 = {A:3000,B:100,D:200},
]

// ***************************************************************************************************************************** 

finalthreebill ={} // this is the final consolidated object it has the values 

// function 1 : sum of values in an object 
function sumvalues(object){ 
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
// function 3 : sorting objects in ascending order baser upon their values 
    function sorting(obtosort){ 
        let sorted_array =[] 
    for(i in obtosort){ 
        sorted_array.push([i,obtosort[i]]) 
    } 
    sorted_array.sort((a,b) => a[1] - b[1] ) 
    sorted_obj = {} 
    for (mani of sorted_array){ 
        sorted_obj[mani[0]]=mani[1] 
    } 
    return sorted_obj} 
// function 4 : sorting objects in descending order baser upon their values
function reversesorting(obtosort){ 
    let sorted_array =[] 
for(i in obtosort){ 
    sorted_array.push([i,obtosort[i]]) 
} 
sorted_array.sort((a,b) => a[1] - b[1] ).reverse() 
rev_sorted_obj = {} 
for (mani of sorted_array){ 
    rev_sorted_obj[mani[0]]=mani[1] 
} 
return rev_sorted_obj} 
// function 3 : removing key value pairs from an objects if it's value is zero 
function removezero(zeroobject){ 
nozeroobj={} 
for (i in zeroobject){ 
    if (zeroobject[i] != 0){ 
        nozeroobj[i]=zeroobject[i] 
    } 
}return nozeroobj 
}   
// ***************************************************************************************************************************** 
function consolidatebill(bill){     // it gives the consolidated values for each bills 
// Step : 1 finding sum of the bill  
sum = sumvalues(bill) 
// Step : 2 finding the average  
length = objectlength(bill) 
average = sum / length  
// Step : 3 finding the amount to be paid by each person in the each bill 
amount_to_be_paid= {} // Example : {A:-100,B:100} "A paid 100 rupees less "
for (let i in bill){ 
    amount_to_be_paid[i] = ((bill[i]) - average ) 
} 
return amount_to_be_paid 
} 
// Step : 4 summation of all the consolidated bills 
for (i in bills){ 
    sep = consolidatebill(bills[i])
  for (i in sep){
  if(!(i in finalthreebill)){
    finalthreebill[i]=sep[i]
  }
  else{
    finalthreebill[i]=finalthreebill[i]+sep[i]
  }
} 
}
// ***************************************************************************************************************************** 
//  Step : 5 finding the amount shoud be paid by each individuals and printing it "Example : A has to give/pay __Rs to B"
finalthreebill = sorting(finalthreebill)

to_pay = {} // these people want the perticular amount of money from the concern person since they given more money than the average
to_get = {} // these people has to pay the perticular amount to the concern person since they given less money then the average
for (pay in finalthreebill){
if (finalthreebill[pay]<0){
    to_pay[pay]=finalthreebill[pay]
}
else{
    to_get[pay]=finalthreebill[pay]
}
}
to_get = reversesorting(to_get)

for (get in to_get){
for (give in to_pay){
    if (to_get[get] > Math.abs(to_pay[give])){
        newval1 = (to_get[get] - Math.abs(to_pay[give]))
        kudu1 = Math.abs(to_pay[give])
        to_get[get] = newval1
        to_pay[give] = 0
        to_get = removezero(to_get)
        to_pay = removezero(to_pay)
        console.log(`${give} has to give the following amount to ${get}`)
        console.log(kudu1)
    }
    else if(to_get[get] < Math.abs(to_pay[give])){
        kudu2 = to_get[get]
        newval2 = (Math.abs(to_pay[give])) - (Math.abs(to_get[get]))
        to_get[get] = 0
        to_pay[give] = newval2
        to_get = removezero(to_get)
        to_pay = removezero(to_pay)
        console.log(`${give} has to give the following amount to  ${get}`)
        console.log(kudu2)
    }
    else if (Math.abs(to_get[get]) == Math.abs(to_pay[give])){
        kudu3 = to_get[get]
        to_get[get] = 0
        to_pay[give] = 0
        to_get = removezero(to_get)
        to_pay = removezero(to_pay)
        console.log(`${give} has to give the following amount to ${get}`)
        console.log(kudu3)
    }
}
}