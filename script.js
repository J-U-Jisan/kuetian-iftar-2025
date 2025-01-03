var script_url = "https://script.google.com/macros/s/AKfycbz0vW3Gf_NN4PRfSiVfMaNqrJKVROhF3t_mmdVZvNCGdkvlWEWGmK7aOglWYnjZGCc1IQ/exec";

let payable = 0;
let personPay = 0;
let spousePay = 0;
let kidsPay = 0;
let driverPay = 0;
let maidPay = 0;
let netPayable = 0;
let accountNo = '';
let charge = 0;
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
    let maid = $('input[name=maid]:checked').val();
    let paymentMode = $('input[name=paymentMode]:checked').val();
    let transactionID = $('#transactionID').val();

    if(kids==='No')
        numberOfKids= '';

    if(!paymentMode || !transactionID || !accountNo){
        $('#secondForm').addClass('was-validated');
        return false;
    }

    $('#submit').prop('disabled', true);

    var url = script_url + "?name=" + name + "&roll=" + roll + "&batch=" + batch + "&department=" + department + "&mobileNumber=" + mobileNumber + "&email=" + email + "&bloodGroup=" + bloodGroup + "&iebMembershipNo=" + iebMembershipNo + "&spouse=" + spouse + "&kids=" + kids + "&numberOfKids=" + numberOfKids + "&driver=" + driver + "&maid=" + maid + "&payable=" + payable + "&paymentMode=" + paymentMode + "&netPayable=" + netPayable + "&accountNo=" + accountNo + "&transactionID=" + transactionID + "&action=insert";

    try{
        jQuery.ajax({
            crossDomain: true,
            url: url,
            method: "GET",
            dataType: "jsonp",
            complete: function(data, text){
                console.log('Registration', data);
                window.location.href = "./greetings.html";
            }
        });
    }
    catch(exception){
        alert('Registration Failed. Please try again.');
    }
}

function onLoad() {
    $("#nonKuetianSection").hide();
    $('#numberOfKidsDiv').hide();
    $('#secondPage').hide();
    showPaymentMode('');
    closeRegistration();
}

function closeRegistration() {
    const targetDate = new Date(2025, 0, 7, 12, 0);
    const now = new Date();
    console.log('date', now);
    console.log('current', targetDate);
    if (now >= targetDate) {
        $("#registrationClosed").show();
        $('#nextButton').prop('disabled', 'true');
    } else {
        $("#registrationClosed").hide();
        $('#nextButton').prop('enabled', 'true');
    }
}

function handleBatch() {
    let batch = $('#batch').val();
    
    if (batch) {
        $("#nonKuetianSection").show();
        batch = parseInt(batch);
    }

    personPay = 1500;
    
    paymentCalculator();
}

function handleSpouse(){
    let spouse = $("input[name=spouse]:checked").val();

    if (spouse === 'Yes')
        spousePay = 1200;
    else
        spousePay = 0;
    
    paymentCalculator();
}

function handleNumberOfKids(){
    let kids = $('input[name=kids]:checked').val();
    let number_of_kids = $('#numberOfKids').val();
    if(kids === 'Yes'){
        kidsPay = (number_of_kids*500);
    }
    else{
        kidsPay = 0;
    }

    paymentCalculator();
}

function handleKidsYes() {
    $('#numberOfKidsDiv').show();
}

function handleKidsNo() {
    $('#numberOfKidsDiv').hide();
    $('#numberOfKids').val('')
    kidsPay = 0;
    
    paymentCalculator();
}

function handleDriver() {
    const driver = $("input[name=driver]:checked").val();
    
    console.log(driver)
    if (driver === 'Yes')
        driverPay = 500;
    else 
        driverPay = 0;

    paymentCalculator();
}

function handleMaid() {
    const maid = $("input[name=maid]:checked").val();
    console.log(maid);
    if (maid === 'Yes')
        maidPay = 500;
    else 
        maidPay = 0;

    paymentCalculator();
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
    let maid = $('input[name=maid]:checked').val();

    if (!name || !roll || !batch || !department || !mobile_number || !email || !spouse || !kids || !driver || !maid) {
        $('#firstForm').addClass("was-validated");
        return false;
    }

    if (kids === 'Yes' && !number_of_kids) {
        $('#firstForm').addClass("was-validated");
        return false;
    }

    $('#nextButton').hide();
    $('#secondPage').show();

    payable = personPay + spousePay + kidsPay + driverPay + maidPay;

    $('#payable').text('Payable: ' + payable + ' tk');

    $(window).scrollTop($('#secondPage').offset().top);
}

function handlePaymentMode(e) {
    let paymentMode = e.getAttribute('value');
    
    console.log('account no', accountNo);

    if (paymentMode === 'Bkash') {
        charge = 15;
        accountNo = $('input[name=bkashAccountNo]:checked').val();
        showPaymentMode('bkashAccount');
    } 
    else if (paymentMode === 'Nagad') {
        charge = 12;
        accountNo = $('input[name=nagadAccountNo]:checked').val();
        showPaymentMode('nagadAccount');
    }
    else if (paymentMode === 'Rocket') {
        charge = 10;
        accountNo = $('input[name=rocketAccountNo]:checked').val();
        showPaymentMode('rocketAccount');
    } 
    else if (paymentMode === 'OBL') {
        charge = 0;
        accountNo = $('input[name=oblAccountNo]:checked').val();
        showPaymentMode('oblAccount');
    }
    
    netPayable = payable + Math.ceil((payable * charge) / 1000);
    $('#netPayable').text('Net Payable: ' + netPayable + ' tk');
    console.log(payable + ' ' + netPayable);
}

function handleAccountNo(e) {
    accountNo = e.getAttribute("value");

    console.log(accountNo);
}

function paymentCalculator() {
    if(payable){
        payable = personPay + spousePay + kidsPay + driverPay + maidPay;
        $('#payable').text('Payable: ' + payable + ' tk');
    }

    if(netPayable){
        netPayable = payable + Math.ceil((payable * charge) / 1000);
        $('#netPayable').text('Net Payable: ' + netPayable + ' tk'); 
    }
}

function showPaymentMode(id) {
    const paymentModes = ['bkashAccount', 'nagadAccount', 'rocketAccount', 'oblAccount'];

    paymentModes.forEach((mode) => {
        if (mode === id) {
            $('#' + mode).show();
        } else {
            $('#' + mode).hide();
        }
    })
}