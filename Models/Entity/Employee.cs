using System.ComponentModel.DataAnnotations.Schema;
using DynamicApi.Manager;

namespace Up.Models.Entity; 

public class Employee {
    
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
    [NotMapped]
    public string FullName => $"{FirstName} {LastName}";
    
    public virtual ContractEmployee ContractEmployee { get; set; }
}