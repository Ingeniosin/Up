using DynamicApi.Manager.Api.Managers.Action;
using Microsoft.EntityFrameworkCore;
using Up.Models;
using Up.Models.Entity;

namespace Up.Service {
    public class CreatePayrollBookService : ActionService<InputCreatePayrollBook> {
    
        private readonly ApplicationDbContext _context;

        public CreatePayrollBookService(ApplicationDbContext context) {
            _context = context;
        }

        public override async Task<object> OnQuery(InputCreatePayrollBook model) {
            var payRollRequest = await _context.PayrollBooksRequests.Include(x => x.Rows).FirstAsync(x => x.Id == model.IdPayrollBookRequest);
            var rows = payRollRequest.Rows;

            var payrollBook = new PayrollBook(){
                StartDate = payRollRequest.StartDate,
                EndDate = payRollRequest.EndDate,
            };
            
            var minimumSalary = (await _context.ParameterValues.FirstAsync(x => x.IsMinimumSalary)).Value;
            var transportAssistance = (await _context.ParameterValues.FirstAsync(x => x.IsTransportAssistance)).Value;


            var payrollBookRows = rows.AsParallel().Select(rowRequest => {
                var payrollBookRow = new PayrollBookRow(){ PayrollBookRowRequest = rowRequest, PayrollBook = payrollBook};
                payrollBookRow.TransportAssistance = rowRequest.EarnedIncome > minimumSalary * 2 ? 0 : transportAssistance;
                payrollBookRow.TotalDevengated = rowRequest.EarnedIncome + payrollBookRow.TransportAssistance;
                payrollBookRow.Health = rowRequest.EarnedIncome * 0.04;
                payrollBookRow.Pension = rowRequest.EarnedIncome * 0.04;
                payrollBookRow.NetPaid = payrollBookRow.TotalDevengated - payrollBookRow.Health - payrollBookRow.Pension;
                return payrollBookRow;
            });

            await _context.PayrollBooks.AddAsync(payrollBook);
            await _context.PayrollBooksRows.AddRangeAsync(payrollBookRows);
            await _context.SaveChangesAsync();
            return payrollBook.Id;
        }


        public override InputCreatePayrollBook GetInstance() =>  new();
    }

    public class InputCreatePayrollBook {
 
        public int IdPayrollBookRequest { get; set; }

    }
}