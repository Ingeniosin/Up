using DynamicApi;
using Up.Models;
using Up.Models.Entity;
using Up.Service;

var builder = WebApplication.CreateBuilder(args);

new DynamicApi<ApplicationDbContext>(routeBuilder => routeBuilder
    .addNonService(x => x.TypePaymentDates)
    .addNonService(x => x.ClassificationDaysTypes)
    .addNonService(x => x.TypeContracts)
    .addNonService(x => x.Employees)
    .addNonService(x => x.ContractEmployees)
    .addNonService(x => x.ParameterValues)
    .addNonService(x => x.PayrollBooksRows)
    .addNonService(x => x.PayrollBooksRequests)
    .addNonService(x => x.PayrollBooks)
    .addService<PayrollBookRowRequest, PayrollBookRowRequestService>(x => x.PayrollBookRowRequests)
    .addAction<InputCreatePayrollBookRequest, CreatePayrollBookRequestService>("createPayrollRequest", true)
    .addAction<InputCreatePayrollBook, CreatePayrollBookService>("createPayroll", true)
    .addAction<MigrateEmployeesInput, MigrateEmployeesService>("migrateEmployees", true)

, builder).Start();