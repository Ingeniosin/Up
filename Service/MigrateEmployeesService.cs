using DynamicApi.Serializers;
using DynamicApi.Services;
using Up.Models;
using Up.Models.Entity;

namespace Up.Service; 

public class MigrateEmployeesService : IActionService<MigrateEmployeesInput> {
    
    private readonly ApplicationDbContext _context;

    public MigrateEmployeesService(ApplicationDbContext context) {
        _context = context;
    }

    public async Task<object> OnQuery(MigrateEmployeesInput input, HttpContext httpContext) {
        
        var errors = new List<List<string>>();
        
        foreach (var inputEmployee in input.Employees) {
            
            var contractEmployeePaymentDateId = inputEmployee.ContractEmployee.PaymentDateId;
            var contractEmployeePaymentDate = await _context.TypePaymentDates.FindAsync(contractEmployeePaymentDateId);

            var contractEmployeeTypeContractId = inputEmployee.ContractEmployee.TypeContractId;
            var contractEmployeeTypeContract = await _context.TypeContracts.FindAsync(contractEmployeeTypeContractId);

            var fieldErrors = new List<string>();
            
            if (contractEmployeePaymentDate == null) 
                fieldErrors.Add($"El tipo de contrato con Id [{contractEmployeePaymentDateId}] no se ha encontrado!");
            if (contractEmployeeTypeContract == null) 
                fieldErrors.Add($"El tipo de contrato con Id [{contractEmployeeTypeContractId}] no se ha encontrado!");
            
            errors.Add(fieldErrors);
        }
        
        if (errors.Any(x => x.Any())) {
            return new {
                success = false,
                errors
            };
        }

        
        
        try {
            await using var transaction = await _context.Database.BeginTransactionAsync();
            
            await _context.AddRangeAsync(input.Employees);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            return new {success = true};
        } catch(Exception ex) {
            return new{
                success = false,
                message = ex.InnerException?.Message ?? ex.Message
            };
        }
    }
    

    public SerializeType SerializeType => SerializeType.STANDARD;
}

public class MigrateEmployeesInput {
    
    public List<Employee> Employees { get; set; }

}
