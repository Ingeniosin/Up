using Up.Models.Types;

namespace Up.Models.Entity; 

public class ContractEmployee {
    public int Id { get; set; }
    
    public virtual TypePaymentDate PaymentDate { get; set; }
    public int PaymentDateId { get; set; }
    
    public virtual TypeContract TypeContract { get; set; }
    public int TypeContractId { get; set; }
    
    public double Salary { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    
}