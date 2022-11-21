using DynamicApi.Services.Listener;
using Up.Models;
using Up.Models.Entity;

namespace Up.Service; 

public class PayrollBookRowRequestService : ListenerService<PayrollBookRowRequest, ApplicationDbContext> {

    public override async Task OnUpdating(PayrollBookRowRequest model, Func<bool, Task<PayrollBookRowRequest>> getOldModel, ApplicationDbContext context) {
        var workDays = model.DaysSettled;
        var contract = model.Employee.ContractEmployee;
        var contractDays = model.Employee.ContractEmployee.PaymentDate.ClassificationDaysType;
        
        var paymentPeriods = (double)workDays / contractDays.Days;
        var earnedIncome = contract.Salary * paymentPeriods;
            
        model.EarnedIncome = earnedIncome + model.NightlySurcharges+model.SundayAndHolidayWork+model.Overtime-model.OtherDeductions;
    }

    public static ListenerConfiguration Configuration => new(){
        OnUpdating = true,
    };
}