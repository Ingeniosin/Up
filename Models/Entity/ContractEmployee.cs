using System.ComponentModel.DataAnnotations;
using Up.Models.Types;

namespace Up.Models.Entity; 

public class ContractEmployee {
    public int Id { get; set; }
    
    public virtual TypePaymentDate PaymentDate { get; set; }
    
    [Required]
    public int PaymentDateId { get; set; }
    
    public virtual TypeContract TypeContract { get; set; }
    
    [Required]
    public int TypeContractId { get; set; }
    
    [Required]
    public double Salary { get; set; }

    [Required]
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    
}