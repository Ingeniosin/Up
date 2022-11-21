namespace Up.Models.Entity; 

public class PayrollBookRequest {
    
    public int Id { get; set; }
    

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public virtual List<PayrollBookRowRequest> Rows { get; set; }

}