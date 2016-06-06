Payslip = new Mongo.Collection('payslip');

Payslip.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
  doc.name = doc.first + " " + doc.last; 
});
