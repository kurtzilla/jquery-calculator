
// i played around with ios calculator a bit to get more answers
// as to functionality
//
// if no input - display 0
//
// only numbers can be first in stream
//
// you cannot start with a negative -  additionally, there is no way
// to enter a negative num other than multiplying by negative number
//
// also, when entering in two consecutive operators, the second
// entry overwrites the first (except for next case)
//
// consecutive "=" perform previous operator and following value
// ie 3x6=18 an addtl = will yield 108, next iter is 648
// stream   3x6=18   3x6==108   3x6===648
//
// TODO: there are some combinations of += -= *= etc - but I am not allowing them
// until I am able to add testing as the key combos are more complex than I
// would like to verify manually



// page flow
$(document).ready(function() {

    // init display
    calculateFromInputStream();

    // register eventhandler
    $('.buttons').on('click', 'span', function(e) {

        buildInputStream(e);
        calculateFromInputStream();

    });
});


// var to hold our input
var inputStream = [];

// runa regex to see if number
var isNumber = function(value){
    return value.match(/\d+/);
}


function recur (idx) {

    var item = inputStream[idx];

    if(idx < 0) {
        return null;
    } else if(idx === 0) {
        return parseInt(item);
    }
    else if(!isNumber(item)) {
        var prevNum = recur(idx - 1);
        var prevOper = recur(idx - 2);
        var origRes = recur(idx - 3);
        var result = null;

        if(prevNum && prevOper && origRes) {
            switch(prevOper){
                case "+":
                    result = parseInt(prevNum) + parseInt(origRes);
                    break;
                case "-":
                    result = parseInt(prevNum) - parseInt(origRes);
                    break;
                case "x":
                    result = parseInt(prevNum) * parseInt(origRes);
                    break;
                default:// division
                    // TODO division by zero and what to display
                    result = parseInt(prevNum) / parseInt(origRes);
                    break;
            }
        }
    }
}


// reads input stream and calculates display value
var calculateFromInputStream = function() {

    console.log('inputStream', inputStream);

    var prevNum = null;
    var nextNum = null;
    var prevOper = null;
    var nextOper = null;

    for(var i=0;i<inputStream.length;i++) {

        if(!prevNum){
            prevNum = parseInt(inputStream[i]);
        } else if(!prevOper) {
            prevOper = inputStream[i];
        } else if (!nextNum) {
            nextNum = parseInt(inputStream[i]);
        } else if(!nextOper) {
            nextOper = inputStream[i];
        }

        // when we have enough info tp do a calculation....
        //todo reset values accroding to sequence
        if(prevNum && prevOper && nextNum && nextOper) {
            var exp = 0;

            //get current values
            switch(prevOper) {
                case "x":
                    exp = parseInt(prevNum) * parseInt(nextNum);
                    break;
                case "+":
                    exp = parseInt(prevNum) + parseInt(nextNum);
                    break;
                case "-":
                    exp = parseInt(prevNum) - parseInt(nextNum);
                    break;

            }


            //reset old values for next iteration
        }


    }

    // var next = null;
    // var current = 0;
    // var running = 0;
    //
    //
    // var run = null;
    // var prev = null;
    // var display = 0;
    //
    //
    // for(var i=0;i<inputStream.length;i++) {
    //
    //     var current = inputStream[i];
    //     var last1 = inputStream[i-1] || null;
    //     var last2 = inputStream[i-2] || null;
    //     var lastFunc = null;
    //
    //     // seed the sequence! zero idx assign
    //     if(!run) {
    //         run = parseInt(current);
    //     }
    //     else if(!isNumber(current)){
    //
    //         if(current = "="){
    //             // we need a prior x[oper]y
    //         } else {
    //
    //         }
    //
    //     }
    //     else if(isNumber(current)){
    //         display = current;
    //         if(last1 && last2){
    //
    //         }
    //     }
    //
    //
    // }




    // for(var i=0;i<inputStream.length;i++){
    //
    //     var item = inputStream[i];
    //
    //     // seed the series
    //     if(!prev) {
    //         running = parseInt(item);
    //         display = running;
    //     }
    //     // else
    //
    //     //zero id is a number!!! yay - seed the calculation!
    //     if(i === 0) {
    //         current = parseInt(item);
    //     }
    //     // for all other indexes
    //     else {
    //
    //         if(item === "=") {
    //
    //             // TODO rules for immediately pre operator
    //
    //             // if it is a previous "="
    //             // if it is a previous number
    //         }
    //         // handle other operators - show previous calc
    //         else if (!isNumber(item)) {
    //
    //         } else if (isNumber(item)) {
    //
    //         }
    //
    //
    //     }
    //
    //
    //
    // }













    $('#screen').html(current);
}

// adds keystrokes to inputStream according to specified rules
var buildInputStream = function(e) {

    // console.log('clicked', e);

    var clickedKey = e.target;
    var clickedValue = clickedKey.innerText;
    var count = inputStream.length;

    if(clickedValue === "C") {

        inputStream = [];
        return;
    }

    if(count === 0) {

        // only nums can be first in the stream
        if(isNumber(clickedValue)){
            inputStream.push(clickedValue);
        }

        // ignore non-numbers when count is 0
    }
    else {

        // track our criteria
        var addInput = false;

        //get last value
        var last = inputStream[count - 1];

        // concat consecutive numbers
        if(isNumber(last) && isNumber(clickedValue)) {

            inputStream[count - 1] += clickedValue.toString();
        }
        // "=" can only directly follow a number or itself
        // if "=" and last is number or last = "="
        else if (clickedValue === "=") {

            //otherwise ignore - ignore addition to stream after other operators
            if(isNumber(last) || last === "=") {
                addInput = true;
            }
        }
        // deal with the other operators - non-numbers
        // always add operator after a number
        else if (isNumber(last) && !isNumber(clickedValue)) {
            addInput = true;
        }
        // always add a number after an operator
        else if(!isNumber(last) && isNumber(clickedValue)) {
            addInput = true;
        }
        // overwrite last operator when consecutive
        else if (!isNumber(last) && !isNumber(clickedValue)) {

            //overwrite last operator!!
            inputStream[count - 1] = clickedValue;
        }

        if(addInput){
            inputStream.push(clickedValue);
        }
    }

    // console.log('inputStream', inputStream);
}
