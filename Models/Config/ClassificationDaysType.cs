using Up.Models.Types;

namespace Up.Models.Config; 

public class ClassificationDaysType {
    
    public int Id { get; set; }
    
    public virtual TypePaymentDate TypePaymentDate { get; set; }
    public int TypePaymentDateId { get; set; }

    public int Days { get; set; }

}