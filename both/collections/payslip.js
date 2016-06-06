Payslip = new Mongo.Collection('payslip');

Payslip.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.name = doc["0"]+ " " +doc["1"]; 
  doc.period = doc["4"];
  //console.log("Gross income> " + grossIncome(doc["2"]));
  doc.gross = grossIncome(doc["2"]);
  
  //console.log("Gross income> " + incomeTax(doc["2"]));
  doc.incomeTax = incomeTax(doc["2"]);
  
  //console.log("Net Income> " + incomeTax(doc["2"]));
  doc.net = netIncome(doc["2"]);
  
  //console.log("Super > " + getSuper(doc["2"],doc["3"] ));
  doc.super = getSuper(doc["2"],doc["3"] );
  
  doc.annual = doc["2"];
  
});

/**
Taxable income Tax on this income 
0 - $18,200 Nil 
$18,201 - $37,000 19c for each $1 over $18,200 
$37,001 - $80,000 $3,572 plus 32.5c for each $1 over $37,000 $
80,001 - $180,000 $17,547 plus 37c for each $1 over $80,000 $180,001 and 
over $54,547 plus 45c for each $1 over $180,000

Example Data Employee annual salary is 
60,050, super rate is 9%, how much will this employee be paid for the month of March ? • 

pay period = Month of March (01 March to 31 March) • 
gross income = 60,050 / 12 = 5,004.16666667 (round down) = 5,004 • 
income tax = (3,572 + (60,050 - 37,000) x 0.325) / 12 = 921.9375 (round up) = 922 • 

net income = 5,004 - 922 = 4,082 • super = 5,004 x 9% = 450.36 (round down) = 450
**/


function grossIncome(salary){
	return Math.floor(salary/12);
}

function incomeTax(salary){
	var tier = getTier(salary);
	console.log("tier>" + tier.base);
	return  Math.ceil((tier.base + (salary - tier.lowerLimit) * tier.tax) / 12);
}

function netIncome(salary){
	return grossIncome(salary) - incomeTax(salary); 
}

function getSuper(salary, rate){
	
	rate = parseFloat(rate.replace('%',''));
	if (rate <= 50 && rate > 0) {
		return Math.floor(grossIncome(salary) * rate/100);
	}else{
		return "invalid value";
	}
	
	
}

var tier0 = {
	base:0, 
	lowerLimit:0, 
	upperLimit:18200,
	tax:0
}


var tier1 = {
	base:0, 
	lowerLimit:18200, 
	upperLimit:37000,
	tax:.19
}

var tier2 = {
	base:3572, 
	lowerLimit:37000, 
	upperLimit:80000,
	tax:.325
}

var tier3 = {
	base:17547, 
	lowerLimit:80000, 
	upperLimit:180000,
	tax:.37
}

var tier4 = {
	base:54547, 
	lowerLimit:180000, 
	upperLimit:-1,
	tax:.45
}

function getTier(salary){
	
		if (salary <= tier1.lowerLimit){
			return tier0; 
		}else if (salary <= tier2.lowerLimit){
			return tier1; 
		}else if (salary <= tier3.lowerLimit){
			return tier2; 
		}else if (salary <= tier4.lowerLimit){
			return tier3; 
		}else if (salary > tier4.lowerLimit){
			return tier4; 
		}

	
}








