var script_url = "https://script.google.com/macros/s/AKfycbzpuaOOPcCN-qKg5kyulRkqlHFxkmKDB750LoQ_vJ0SSL2iaeg4UqiGna8NE29vXnMkxQ/exec";
let payable = 0;
let personPay = 0;
let spousePay = 0;
let kidsPay = 0;
let netPayable = 0;
let accountNo = '';
var emailcheck = false;
// Make an AJAX call to Google Script
function insert_value() {

    let name = $('#name').val();
    let roll = $('#roll').val();
    let batch = $('#batch').val();
    let department = $('#department').val();
    let mobileNumber = $('#mobile_number').val();
    let email = $('#email').val();
    let bloodGroup = $('#bloodGroup').val();
    let iebMembershipNo = $('#iebMembershipNo').val();
    let spouse = $("input[name=spouse]:checked").val();
    let kids = $('input[name=kids]:checked').val();
    let numberOfKids = $('#numberOfKids').val();
    let driver = $('input[name=driver]:checked').val();
    let paymentMode = $('input[name=paymentMode]:checked').val();
    let transactionID = $('#transactionID').val();

    if(!paymentMode || !transactionID || !accountNo){
        $('#secondForm').addClass('was-validated');
        return false;
    }

    $('#submit').prop('disabled', true);

    var url = script_url + "?name=" + name + "&roll=" + roll + "&batch=" + batch + "&department=" + department + "&mobileNumber=" + mobileNumber + "&email=" + email + "&bloodGroup=" + bloodGroup + "&iebMembershipNo=" + iebMembershipNo + "&spouse=" + spouse + "&kids=" + kids + "&numberOfKids=" + numberOfKids + "&driver=" + driver + "&payable=" + payable + "&paymentMode=" + paymentMode + "&netPayable=" + netPayable + "&accountNo=" + accountNo + "&transactionID=" + transactionID + "&action=insert";

    try{
        jQuery.ajax({
            crossDomain: true,
            url: url,
            method: "GET",
            dataType: "jsonp",
            complete: function(data, text){
                window.location.href = "./greetings.html";
            }
        });
    }
    catch(exception){
        alert('Registration Failed. Please try again.');
    }
}

function onLoad() {
    $('#numberOfKidsDiv').hide();
    $('#secondPage').hide();
    $('#bkashAccount').hide();
    $('#nagadAccount').hide();
    $('#rocketAccount').hide();
    // $('#nextButton').hide();
}

function handleBatch() {
    let batch = $('#batch').val();
    if (batch <= 2011 && batch >= 1972)
        personPay = 1500;
    else
        personPay = 1000;

    if(payable){
        payable = personPay + spousePay + kidsPay;
        $('#payable').text('Payable: ' + payable + ' tk');
    }

    if(netPayable){
        netPayable = payable + Math.ceil((payable * charge) / 1000);
        $('#netPayable').text('Net Payable: ' + netPayable + ' tk'); 
    }
}

function handleSpouse(){
    let spouse = $("input[name=spouse]:checked").val();
    if (spouse === 'Yes')
        spousePay = 1000;
    
    if(payable){
        payable = personPay + spousePay + kidsPay;
        $('#payable').text('Payable: ' + payable + ' tk');
    }
    if(netPayable){
        netPayable = payable + Math.ceil((payable * charge) / 1000);
        $('#netPayable').text('Net Payable: ' + netPayable + ' tk'); 
    }
}

function handleNumberOfKids(){
    let kids = $('input[name=kids]:checked').val();
    let number_of_kids = $('#numberOfKids').val();
    if(kids === 'Yes'){
        kidsPay = (number_of_kids*500);
    }
    if(payable){
        payable = personPay + spousePay + kidsPay;
        $('#payable').text('Payable: ' + payable + ' tk');
    }

    if(netPayable){
        netPayable = payable + Math.ceil((payable * charge) / 1000);
        $('#netPayable').text('Net Payable: ' + netPayable + ' tk'); 
    }
}

function handleKidsYes() {
    $('#numberOfKidsDiv').show();
}

function handleKidsNo() {
    $('#numberOfKidsDiv').hide();
}

function handleNext() {
    let name = $('#name').val();
    let roll = $('#roll').val();
    let batch = $('#batch').val();
    let department = $('#department').val();
    let mobile_number = $('#mobile_number').val();
    let email = $('#email').val();
    let spouse = $("input[name=spouse]:checked").val();
    let kids = $('input[name=kids]:checked').val();
    let number_of_kids = $('#numberOfKids').val();
    let driver = $('input[name=driver]:checked').val();

    if (!name || !roll || !batch || !department || !mobile_number || !email || !spouse || !kids || !driver) {
        $('#firstForm').addClass("was-validated");
        return false;
    }

    if (kids === 'Yes' && !number_of_kids) {
        $('#firstForm').addClass("was-validated");
        return false;
    }

    $('#nextButton').hide();
    $('#secondPage').show();

    payable = personPay + spousePay + kidsPay;

    $('#payable').text('Payable: ' + payable + ' tk');

    $(window).scrollTop($('#secondPage').offset().top);
}

function handlePaymentMode(e) {
    let paymentMode = e.getAttribute('value');

    let charge = 0;
    if (paymentMode === 'Bkash') {
        charge = 15;
        $('#bkashAccount').show();
        $('#nagadAccount').hide();
        $('#rocketAccount').hide();
    } 
    else if (paymentMode === 'Nagad') {
        charge = 12;
        $('#bkashAccount').hide();
        $('#nagadAccount').show();
        $('#rocketAccount').hide();
    }
    else if (paymentMode === 'Rocket') {
        charge = 10;
        $('#bkashAccount').hide();
        $('#nagadAccount').hide();
        $('#rocketAccount').show();
    } 
    
    netPayable = payable + Math.ceil((payable * charge) / 1000);
    $('#netPayable').text('Net Payable: ' + netPayable + ' tk');
    console.log(payable + ' ' + netPayable);
}

function handleAccountNo(e) {
    accountNo = e.getAttribute("value");

    console.log(accountNo);
}