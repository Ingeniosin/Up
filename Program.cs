using DynamicApi;
using DynamicApi.Manager.Api;
using DynamicApi.Manager.Api.Managers;
using DynamicApi.Manager.Api.Managers.Action;
using DynamicApi.Manager.Api.Managers.Service;
using Up.Models;
using Up.Models.Config;
using Up.Models.Entity;
using Up.Models.Types;
using Up.Service;

var builder = WebApplication.CreateBuilder(args);

new DynamicApi<ApplicationDbContext>(new List<IApiManager>(){
   new NonServiceApiManager<TypePaymentDate, ApplicationDbContext>("typepaymentdate", x => x.TypePaymentDates),
   new NonServiceApiManager<ClassificationDaysType, ApplicationDbContext>("classificationdaystype", x => x.ClassificationDaysTypes),
   new NonServiceApiManager<TypeContract, ApplicationDbContext>("typecontract", x => x.TypeContracts),
   new NonServiceApiManager<Employee, ApplicationDbContext>("employee", x => x.Employees),
   new NonServiceApiManager<ContractEmployee, ApplicationDbContext>("contractemployee", x => x.ContractEmployees),   
   new NonServiceApiManager<ParameterValue, ApplicationDbContext>("ParameterValues", x => x.ParameterValues),
   new ServiceApiManager<PayrollBookRowRequest, PayrollBookRowRequestService, ApplicationDbContext>("payrollbookrequests", x => x.PayrollBookRowRequests),
   
   new NonServiceApiManager<PayrollBookRow, ApplicationDbContext>("payrollbook", x => x.PayrollBooksRows),

   new ActionApiManager<InputCreatePayrollBookRequest, CreatePayrollBookRequestService>("createPayrollRequest"){IsScoped = true},
   new ActionApiManager<InputCreatePayrollBook, CreatePayrollBookService>("createPayroll"){IsScoped = true},
   
}, builder, db => {
    if(!db.TypePaymentDates.Any()) {
        db.TypePaymentDates.AddRange(
            new TypePaymentDate{Name = "Mensual", IsMonthly = true},
            new TypePaymentDate{Name = "Diario", IsDaily = true},
            new TypePaymentDate{Name = "Semanal", IsWeekly = true},
            new TypePaymentDate{Name = "Quincenal", IsFortnightly = true}
        );
    }
    
    if(!db.ClassificationDaysTypes.Any()) {
        db.TypePaymentDates.ToList().ForEach(x => {
            db.ClassificationDaysTypes.Add(new ClassificationDaysType{ TypePaymentDate = x, Days = x.IsFortnightly ? 15 : x.IsMonthly ? 30 : x.IsWeekly ? 7 : 1 });
        });
    }
    
    if(!db.TypeContracts.Any()) {
        db.TypeContracts.AddRange(
            new TypeContract{Name = "Indefinido", IsIndefiniteTerm = true},
            new TypeContract{Name = "Fijo", IsFixedTerm = false}
        );
    }
    
    if(!db.ParameterValues.Any()) {
        db.ParameterValues.AddRange(
            new ParameterValue{Name = "Salario minimo", Value = 1000000, IsMinimumSalary = true},
            new ParameterValue{Name = "Auxilio de transporte", Value = 100000, IsTransportAssistance = true}
        );
    }

}).Start();