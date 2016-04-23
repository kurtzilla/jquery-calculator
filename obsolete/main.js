
$(document).ready(function() {


    var keyStroke = [];
    var expArr = [];
    var displayValue = 0;

    function updateDisplay() {
        console.log('display', displayValue);
        $('#screen').text(displayValue);
    }

    var first = null;
    var second = null;
    var oper = null;

    var expression = '';


    function processQueue(){

        constructExpressionFromInput();
        calculate();
        displayCurrentValue();

    }

    function displayCurrentValue() {
        console.log('display', displayValue);
        $('#screen').text(displayValue || "0");
    }

    function constructExpressionFromInput() {

        if(keyStroke) {
            expression = '';

            for(var i=0;i<keyStroke.length;i++){

                var val = keyStroke[i];

                if(val.match(/\d+/)) { //};//) === "number") {
                    expression += val.toString();
                } else {
                    expression += " " + val + " ";
                }
            }
        }

        //console.log('expression contructed', expression);
    }

    function calculate() {

        var val = 0;
        var prev = null;
        var oper = null;
        var oper2 = null;
        var next = null;


        var parts = expression.split(' ');
        parts = parts.filter(n => true && n.length > 0);
        console.log('calc:',expression, parts);

        for(var i=0; i<parts.length;i++){

            var inp = parts[i];

            //console.log(i, 'PRE in:',inp,'prev:', prev, 'oper:', oper, 'next:', next, 'oper2', oper2);

            if(!prev) {
                prev = inp;
                displayValue = prev;
            } else if (!oper) {
                oper = inp;
                displayValue = prev;
            } else if (!next) {
                next = inp;
                displayValue = next;
            } else {
                oper2 = inp;
            }

            //console.log(i, 'POST in:',inp,'prev:', prev, 'oper:', oper, 'next:', next, 'oper2', oper2);

            //console.log('opers',oper, oper2);
            if(oper2) {
                //store total in prev
                prev =
                    (oper === '+') ? parseInt(prev) + parseInt(next) :
                    (oper === '-') ? parseInt(prev) - parseInt(next) :
                    (oper === 'x') ? parseInt(prev) * parseInt(next) :
                        parseInt(prev) / parseInt(next);

                displayValue = prev;
                oper = oper2;
                next = null;
                oper2 = null;
            }

            console.log('dValue:', displayValue);
        }
    }


    function evaluateInput() {
        var currentState = 0;
        var prev = null;
        var oper = null;
        var oper2 = null;
        var next = null;

        

    }

    $('.buttons').on('click', 'span', function(e) {

        //console.log(e);
        var clickedKey = e.target;
        var clickedValue = clickedKey.innerText;
        //console.log('clicked', clickedKey, " = ", clickedValue);


        if(clickedValue === "C") {
            keyStroke = null;
        } else {



            ////////////////////////////////////////////////////
            ////////////////////////////////////////////////////
            // todo
            // need to have the expression contructed to evaluate
            // validity
            ////////////////////////////////////////////////////
            ////////////////////////////////////////////////////





            if(!keyStroke)
                keyStroke = [];

            var count = keyStroke.length;
            var lastVal = (keyStroke.length > 0) ? keyStroke[count-1] : null;
            var valid = true;

            //
            if(clickedValue.toString() === "0" && count === 1 && lastVal.toString() === "0") {
                valid = false;
            }

            // if not a number and not a number
            // if(clickedValue.match(/\d+/) === null && lastVal !== null && lastVal.match(/\d+/) === null) {
            //     valid = false;
            // }

            // todo only allow = sign at certain intervals
            // todo only allow operators at certain intervals
            // = can only com 2 idx after another operators
            // opers can only occupy odd idx
            var isOper = !clickedValue.match(/\d+/);
            if(isOper && count % 2 === 0) {
                valid = false;
            }


            // = must come 2 idx after a non-number - this is one minus the zero index factor
            if(clickedValue === "=" && count >=4 && keyStroke[count-2] !== "=") {
                valid = false;
            }




            console.log('valid',valid);


            if(valid) {
                keyStroke.push(clickedValue);
            }

            // // disallow leading zeroes
            // if(!(clickedValue === "0" && lastVal !== null && lastVal === "0")) {
            //
            //     var found = clickedValue.match(/\d+/);
            //
            //     if(!( clickedValue.match(/\d+/) === null && lastVal.match(/\d+/) === null)) {
            //
            //         keyStroke.push(clickedValue);
            //     }
            // }
        }

        processQueue();

    });

});
