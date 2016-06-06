# Problem Description:

[Java verion ](https://github.com/marquinhe/tax) for Java lovers

When I input the employee's details: first name, last name, annual salary(positive integer) and super rate(0% - 50% inclusive), payment start date, the program should generate payslip information with name, pay period,  gross income, income tax, net income and super.

The calculation details will be the following:
•       pay period = per calendar month
•       gross income = annual salary / 12 months
•       income tax = based on the tax table provide below
•       net income = gross income - income tax
•       super = gross income x super rate

Notes: All calculation results should be rounded to the whole dollar. If >= 50 cents round up to the next dollar increment, otherwise round down.

The following rates for 2012-13 apply from 1 July 2012.

Taxable income   Tax on this income
0 - $18,200     Nil
$18,201 - $37,000       19c for each $1 over $18,200
$37,001 - $80,000       $3,572 plus 32.5c for each $1 over $37,000
$80,001 - $180,000      $17,547 plus 37c for each $1 over $80,000
$180,001 and over       $54,547 plus 45c for each $1 over $180,000

Example Data
Employee annual salary is 60,050, super rate is 9%, how much will this employee be paid for the month of March ?
•       pay period = Month of March (01 March to 31 March)
•       gross income = 60,050 / 12 = 5,004.16666667 (round down) = 5,004
•       income tax = (3,572 + (60,050 - 37,000) x 0.325) / 12  = 921.9375 (round up) = 922
•       net income = 5,004 - 922 = 4,082
•       super = 5,004 x 9% = 450.36 (round down) = 450
 
 
 ## Solution
 
Hackathon approach. 
Build fast, realible web / hibrid apps in a couple of hours. The implememtatiom uses Meteor JS and uses Differential boilerplate as starting point for giving a richer U/X Experince. 

- Load a CSV file 
- Whilst parsing - calculate payslip 
- Store it to Mongo
- Display results! 



  
## Build

Install meteor with: curl https://install.meteor.com/ | sh

git clone https://github.com/marquinhe/tax-meteor

rm -rf .git 

meteor
  

  
## Stuff used to make this:

 * [meteor](https://install.meteor.com/) Meteor framework > node js, mongo, blaze, ironLrouter .... 
 * [Differential Boilerplate](https://github.com/Differential/meteor-boilerplate) for the awesome UX
 * [PapaPArse](https://github.com/mholt/PapaParse) CSV Parser

