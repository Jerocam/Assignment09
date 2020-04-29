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
            balance += depositAmount;
        };

        //WITHDRAW
        let withdraw = function (withdrawalAmount){
            balance -= withdrawalAmount;
        };

        //BALANCE
        let getBalance = function (){
            return balance;
        };

        //OWNER
        let getOwnerName = function (){

            //OPTIONAL - ACCEPT TO OPEN THE ACCOUNT IF IT FINDS NAMES(MATHC)
            if(accounts.indexOf(owner)!==-1) {
                alert("Welcome to the Bank Jerocam!");
                $("div h3.accH").text("Your Account Name: "+owner);
                $('#nn').attr('disabled', true);
                $('#dd').attr('disabled', false);
                $('#ww').attr('disabled', false);
                $("div h3.balH").text("Your Current Balance: $"+balance);
                $('#ex').show();
                return owner;   //RETURN OWNERNAME
            }
            //OPTIONAL - NOT FOUND ACCOUNT NAMES IN THE BANK
            else {
                alert("Sorry, we do not have your account in the bank");
                return false;
            }
        };

        //PUBLIC METHODS TO ACCESS THE PRIVATE VARIABLES/FUNCTIONS
        return {
            rDeposit:deposit,   //ACCESS TO FUNCTION DEPOSIT
            rWithdraw:withdraw, //ACCESS TO FUNCTION WITHDRAWAL
            rGetBalance:getBalance, //ACCESS TO FUNCTION BALANCE
            rGetOwnerName:getOwnerName  //ACCESS TO FUNCTION OWNER/ACCOUNT NAMES
        };

};

//LOAD THE HTML
$(()=>{
    
    //VARIABLE TO GET BANKACCOUNT FUNCTION
    let acccount = bankAccount();
    
    //OPTIONAL - BUTTONS DISABLED UNTIL CLICK THE BUTTON NAME (ONLY IF IT FINDS NAMES IN THE ACCOUNT)
    $('#dd').attr('disabled', true);
    $('#ww').attr('disabled', true);

    //BUTTON NAME
    $('#nn').click(function(e) { 
        e = window.prompt("Enter your name");
        while (!e.match(/^[a-zA-Z]+$/)) {
            e = prompt("Please, insert only letters to proceed!");
        }
        let x = bankAccount(e); //PASS OWNERNAME VALUE TO BANKACCOUNT
        x.rGetOwnerName();
       $('.dt').text('');   //CLEAR THE BALANCE WHEN CLICK NAME BUTTON
       $('.wl').text('');   //CLEAR THE WITHDRAWAL WHEN CLICK NAME BUTTON
    });
    
    //BUTTON DEPOSIT
    $('#dd').click(function () { 
        let d = parseFloat(window.prompt("Enter your deposit"));

        while (isNaN(d)){
            alert("Error! Please enter only numbers");
            d = parseFloat(window.prompt("Enter your deposit"));}

        acccount.rDeposit(d);   //DEPOSIT AMOUNT FROM PROMPT

        let newBalance = acccount.rGetBalance();    //GET NEW BALANCE AFTER DEPOSIT

        //DISPLAY THE BALANCES AND DEPOSITS
        $('div').append("<h3 class=\"dt\"> Deposited!: $"+d+"<br>New Balance: $"+newBalance+"</h3>");
        $(".dt").css("color", 'green');
        
        //OPTIONAL - IF THE BALANCE IS ABOVE 0 AFTER DEPOSIT SOME $, IT WILL ACTIVATE WITHDRAWAL BUTTON 
        if (newBalance>0){ 
            $('#ww').attr('disabled', false);
        }
        
    });

    //BUTTON WITHDRAW
    $('#ww').click(function (w) {
        w= parseFloat(window.prompt("Enter your withdrawal"));

        while (isNaN(w)){
            alert("Error! Please enter only numbers");
            w = parseFloat(window.prompt("Enter your withdrawal"));}

        while (w>300){
            alert("Sorry! The Limit of withdrawal is $300.00");
            w = parseFloat(window.prompt("Enter your withdrawal less than $300.00"));}

        acccount.rWithdraw(w);  //PASS VALUES OF WITHDRAWAL TO BANKACCOUNT
    
        let newBalance2 = acccount.rGetBalance();   //GET BALANCE

        //DISPLAY WITHDRAWALS AND BALANCES
        $('div').append("<h3 class=\"wl\"> Withdrawed!: $"+w+"<br>New Balance: $"+newBalance2+"</h3>");
        $('.wl').css("color", 'red');
        
        //OPTIONAL - IF THE BALANCE IS BELOW 0, IT BLOCKS WITHDRAWAL BUTTON TO AVOID CHARGE MORE UNTIL BALANCE IS ABOVE 0 (DEPOSIT SOME)
        if (newBalance2<0){
            $('#ww').attr('disabled', true);
            alert("Now is Insufficient $! You cannot withdrawal more");
        }
    });

    // OPTIONAL - BUTTON 'EXIT' (RELOAD THE PAGE IF WANNA CHANGE NAME ACCOUNT OR BEING SATIFIED OF DEPOSIT/WITHDRAW IN ACCOUNT NAME)
    $('#ex').click(function () {
        location.reload(true);
    });

});    


