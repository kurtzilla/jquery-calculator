
// i played around with ios calculator a bit to get more answers
// as to functionality - there is still some functionality left to implement
// but right now this is pretty close
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
    calculateFromExpression();

    // register eventhandler
    $('.buttons').on('click', 'span', function(e) {

        buildInputStream(e);
        calculateFromExpression();

    });
});


// var to hold our input
var expression = '';

// runa regex to see if number
var isNumber = function(value){
    return value.match(/\d+/);
}

// reads input stream and calculates display value
var calculateFromExpression = function() {

    var result = 0;

    // trim end whitespace
    var exp = expression.replace(/\s*$/,"");
    console.log('expression', exp);

    if(exp.length > 0) {

        var parts = exp.split(" ");
        console.log(parts);
        var last = parts[parts.length - 1];

        // if the last char is not an "="
        // show the last number

        if(isNumber(last)) {
            result = parseInt(last);
        } else {

            try {

                result = eval(exp.replace(/\=*$/,""));

                //if(last === "="){
                    expression = result;
                //}
            }
            catch(err) {
                console.log(err);
                //don't update display
                return;
            }
        }
    }

    $('#screen').html(eval(result));

}

// adds keystrokes to inputStream according to specified rules
var buildInputStream = function(e) {

    // console.log('clicked', e);

    var clickedKey = e.target;
    var clickedValue = clickedKey.innerText;

    if(clickedValue === "C") {
        expression = '';

    } else if (isNumber(clickedValue)) {
        expression += clickedValue.toString();

    } else {

        //console.log('else',expression);
        var parsed = expression.toString().replace(/\s*$/,"");
        var last = parsed[parsed.length -1];
        var operand = (clickedValue === "=") ? "=" :
            (clickedValue === "+") ? "+" :
            (clickedValue === "-") ? "-" :
            (clickedValue === "x") ? "*" :
            "/";

        if(isNumber(last)) {

            expression += " " + operand + " ";
        } else {

            if(last !== "=") {

                expression = expression.toString().replace(/\s*$/,"");
                expression = expression.slice(0,expression.length-1) + operand + " ";
            }
        }
    }

     console.log('expression', expression);
}
