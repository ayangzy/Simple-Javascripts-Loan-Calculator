//listen to submit

document.getElementById('loan-form').addEventListener('submit', function(e){

    //show loader
    document.getElementById('loading').style.display = 'block';

    //hide result
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateResults, 2000);



    e.preventDefault();
});

function calculateResults(e){

//UI variables
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12;
const calculatedPayments = parseFloat(years.value) * 12;

//compute monthly payment

const x = Math.pow(1 + calculatedInterest, calculatedPayments);

const monthly = (principal * x * calculatedInterest) / (x-1);

if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    //show result

    document.getElementById('results').style.display = 'block';

    //hide loader

    document.getElementById('loading').style.display = 'none';
    
}else{
    showError('please check your numbers');  
}  
}


//create error

function showError(error){

    //hide load on error
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'none';

    //create a div
    const errorDiv = document.createElement('div');

    //get element
    const card = document.querySelector('.card');
    const header = document.querySelector('.card-header');
    //add classname
    errorDiv.className = 'alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    
    card.insertBefore(errorDiv, header);

    //clear error after 3 seconds

    setTimeout(clearError, 3000);


}

function clearError(){
    document.querySelector('.alert').remove();
}






