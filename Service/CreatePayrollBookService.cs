using DynamicApi.Manager.Api.Managers.Static;
using Microsoft.EntityFrameworkCore;
using Up.Models;
using Up.Models.Entity;

namespace Up.Service; 

public class CreatePayrollBookRequestService : StaticModelService<InputCreatePayrollBookRequest> {
    
    private readonly ApplicationDbContext _context;

    public CreatePayrollBookRequestService(ApplicationDbContext context) {
        _context = context;
    }

    public override async Task<object> OnQuery(InputCreatePayrollBookRequest model) {
        var startPayrollDay = model.StartDate;
        var endPayrollDay = model.EndDate;
        var employes = await _context.Employees.Where(x => !x.ContractEmployee.EndDate.HasValue || x.ContractEmployee.EndDate >= startPayrollDay).ToListAsync();

        var payRollRequest = new PayrollBookRequest();

        var payrollBookRowRequests = employes.Select(employee => {
            var contract = employee.ContractEmployee;
            var payroll = new PayrollBookRowRequest{Employee = employee, PayrollBookRequest = payRollRequest};

            var startDay = contract.StartDate > startPayrollDay ? contract.StartDate : startPayrollDay;
            var endDay = contract.EndDate.HasValue && contract.EndDate < endPayrollDay ? contract.EndDate.Value : endPayrollDay;
            var workDays = (endDay - startDay).Days + 1;
            var contractDays = _context.ClassificationDaysTypes.First(x => x.TypePaymentDateId == contract.PaymentDateId).Days;
            var paymentPeriods = (double)  workDays / contractDays;
            var earnedIncome = contract.Salary * paymentPeriods;
            
            payroll.EarnedIncome = earnedIncome;
            payroll.DaysSettled = workDays;
            payroll.StartDate = startDay;
            payroll.EndDate = endDay;
            
            return payroll;
        }).ToList();

        await _context.AddAsync(payRollRequest);
        await _context.AddRangeAsync(payrollBookRowRequests);
        await _context.SaveChangesAsync();
        return payRollRequest.Id;
    }


    public override InputCreatePayrollBookRequest GetInstance() =>  new();
}

public class InputCreatePayrollBookRequest {
 
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
}