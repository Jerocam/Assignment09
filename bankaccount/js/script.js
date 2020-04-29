/*eslint-env browser*/

//FUNCTION BANKACCOUNT
let bankAccount = function (ownerName){
"use strict";
    
    //PRIVATE VARIABLES & FUNCTIONS

    //BALANCE AND OWNER
    let balance = 500, owner = ownerName;

    //OPTIONAL - ACCOUNTS WITH NAMES FOR MATCHING THE INPUTS
    let accounts = ["Jeronimo", "Vanessa", "Lucia", "Luis", "Scotty", "Rogelio", "Marisa"];
    
        //DEPOSIT
        let deposit = function (depositAmount){
            depositAmount = parseFloat(window.prompt("Enter your deposit"));
            while (isNaN(depositAmount)){
                alert("Error! Please enter only numbers");
                depositAmount = parseFloat(window.prompt("Enter your deposit"));
            }
            balance += depositAmount; //+ $ FROM PROMPT

            $('div').append("<h3 class=\"nb\"> Deposited!: +$"+depositAmount+"</h3>");
            $('.nb').css("color", 'green');
        }

        //WITHDRAW
        let withdraw = function (withdrawalAmount){
            withdrawalAmount = parseFloat(window.prompt("Enter your withdrawal"));

        while (isNaN(withdrawalAmount)){
            alert("Error! Please enter only numbers");
            withdrawalAmount = parseFloat(window.prompt("Enter your withdrawal"));}

        while (withdrawalAmount > 300){ //IF YOU WITHDRAW MORE THAN 300, IT WONT ALLOW TO PROCESS IT
            alert("Sorry! The Limit of withdrawal is $300.00");
            withdrawalAmount = parseFloat(window.prompt("Enter your withdrawal less than $300.00"));}

        balance -= withdrawalAmount;    // - $ FROM PROMPT

        $('div').append("<h3 class=\"negb\"> Withdrawed!: -$"+withdrawalAmount+"</h3>");
        $('.negb').css("color", 'red');
        }

        //BALANCE
        let getBalance = function (){
            return balance;
        }

        //OWNER
        let getOwnerName = function (){

            //OPTIONAL - ACCEPT TO OPEN THE ACCOUNT IF IT FINDS NAMES(MATHC)
            if(accounts.indexOf(owner)!==-1) {
                alert("Welcome to the Bank Jerocam!");
                $('#nn').text(owner).attr('disabled', true);
                $('#dd').attr('hidden', false);
                $('#ww').attr('hidden', false);
                $("div h3.balH").text("Your Current Balance: $"+balance);
                $('#ex').show();
            }
            //OPTIONAL - NOT FOUND ACCOUNT NAMES IN THE BANK
            else {
                alert("Sorry, we do not have your account in the bank");
            }
        }

        //PUBLIC METHODS TO ACCESS THE PRIVATE VARIABLES/FUNCTIONS
        return {
            deposit,   //ACCESS TO FUNCTION DEPOSIT
            withdraw, //ACCESS TO FUNCTION WITHDRAWAL
            getBalance, //ACCESS TO FUNCTION BALANCE
            getOwnerName  //ACCESS TO FUNCTION OWNER/ACCOUNT NAMES
        }

};

//LOAD THE HTML
$(()=>{
    
    //VARIABLE TO GET BANKACCOUNT FUNCTION
    let acccount = bankAccount();
    
    //OPTIONAL - DISABLED BUTTONS UNTIL CLICK THE BUTTON NAME (ONLY IF IT FINDS NAMES IN THE ACCOUNT)
    $('#dd').attr('hidden', true); //HIDE BUTTON DEPOSIT
    $('#ww').attr('hidden', true); //HIDE BUTTON WITHDRAW

    //BUTTON NAME
    $('#nn').click(function(e) {
        e = window.prompt("Enter your name");
            while (!e.match(/^[a-zA-Z]+$/)) {
                e = prompt("Please, insert only letters to proceed!");
            }
        let x = bankAccount(e); //PASS NAMES (ownername) AS VALUES TO BANKACCOUNT FUNCTION
        x.getOwnerName();
    });
    
    //BUTTON DEPOSIT
    $('#dd').click(function () { 
        acccount.deposit();   //DEPOSIT AMOUNT FROM PROMPT
        let newBalance = acccount.getBalance();    //GET NEW BALANCE AFTER DEPOSIT

        //DISPLAY THE BALANCES AND DEPOSITS
        $('div').append("<h3>New Balance: $"+newBalance+"</h3>");
        
        //OPTIONAL - IF THE BALANCE IS ABOVE 0 AFTER DEPOSIT SOME $, IT WILL ACTIVATE WITHDRAWAL BUTTON 
        if (newBalance > 0){ 
            $('#ww').attr('hidden', false);
        }
    });

    //BUTTON WITHDRAW
    $('#ww').click(function () {
        acccount.withdraw();  //PASS VALUES OF WITHDRAWAL TO BANKACCOUNT
        let newBalance2 = acccount.getBalance();   //GET BALANCE

        //DISPLAY WITHDRAWALS AND BALANCES
        $('div').append("<h3>New Balance: $"+newBalance2+"</h3>");
        
        //OPTIONAL - IF THE BALANCE IS BELOW 0, IT BLOCKS WITHDRAWAL BUTTON TO AVOID CHARGE MORE UNTIL BALANCE IS ABOVE 0 (DEPOSIT SOME)
        if (newBalance2<0){
            $('#ww').attr('hidden', true);
            alert("Now is Insufficient $! You cannot withdrawal more");
        }
    });

    // OPTIONAL - BUTTON 'EXIT' (RELOAD THE PAGE IF WANNA CHANGE NAME ACCOUNT OR BEING SATIFIED OF DEPOSIT/WITHDRAW IN ACCOUNT NAME)
    $('#ex').click(function () {
        location.reload(true);
    });

});    


//THE LIST OF ACCOUNTS NAMES TO ENTER/OPEN THE JEROCAM BANK 2020
// Jeronimo
// Vanessa
// Lucia
// Luis
// Scotty
// Rogelio
// Marisa
