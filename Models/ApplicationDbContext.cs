using DynamicApi.Manager;
using Microsoft.EntityFrameworkCore;
using Up.Models.Config;
using Up.Models.Entity;
using Up.Models.Types;

namespace Up.Models; 

public class ApplicationDbContext : DynamicDbContext {
    public ApplicationDbContext(DbContextOptions options) : base(options) {
    }
    
    public DbSet<TypePaymentDate> TypePaymentDates { get; set; }
    public DbSet<ClassificationDaysType> ClassificationDaysTypes { get; set; }
    public DbSet<TypeContract> TypeContracts { get; set; }
    
    public DbSet<Employee> Employees { get; set; }
    public DbSet<ContractEmployee> ContractEmployees { get; set; }
 
    public DbSet<ParameterValue> ParameterValues { get; set; }
    
    public DbSet<PayrollBook> PayrollBooks { get; set; }
    public DbSet<PayrollBookRow> PayrollBooksRows { get; set; }
    
    public DbSet<PayrollBookRowRequest> PayrollBookRowRequests { get; set; }
    public DbSet<PayrollBookRequest> PayrollBooksRequests { get; set; }
    
}