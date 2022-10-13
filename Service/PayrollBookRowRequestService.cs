using DynamicApi.Manager.Api.Managers.Service;
using Up.Models;
using Up.Models.Entity;

namespace Up.Service; 

public class PayrollBookRowRequestService : ServiceModel<PayrollBookRowRequest, ApplicationDbContext> {

    public override Task<bool> OnUpdating(PayrollBookRowRequest model, Func<bool, Task<PayrollBookRowRequest>> getOldModel, Query query, ApplicationDbContext db) {
        var workDays = model.DaysSettled;
        var contract = model.Employee.ContractEmployee;
        var contractDays = model.Employee.ContractEmployee.PaymentDate.ClassificationDaysType;
        
        var paymentPeriods = (double)workDays / contractDays.Days;
        var earnedIncome = contract.Salary * paymentPeriods;
            
        model.EarnedIncome = earnedIncome + model.NightlySurcharges+model.SundayAndHolidayWork+model.Overtime-model.OtherDeductions;
        return Task.FromResult(true);
    }



    public override ServiceConfiguration Configuration => new(){
        OnUpdating = true,
    };
}