Meteor.publishComposite("payslip", function() {
  return {
    find: function() {
      return Payslip.find({});
    }
  }
});
