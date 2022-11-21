namespace Up.Models.Entity; 

public class PayrollBook {
    
    public int Id { get; set; }
    
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public virtual List<PayrollBookRow> Rows { get; set; }
    
}