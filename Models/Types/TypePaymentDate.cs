using Up.Models.Config;

namespace Up.Models.Types; 

public class TypePaymentDate {
    
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsMonthly { get; set; }
    public bool IsFortnightly { get; set; }
    public bool IsWeekly { get; set; }
    public bool IsDaily { get; set; }

    public virtual ClassificationDaysType ClassificationDaysType { get; set; }
    
}