namespace Up.Models.Entity; 

public class PayrollBookRow {
    
    public int Id { get; set; }
    
    public virtual PayrollBook PayrollBook { get; set; }
    public int PayrollBookId { get; set; }

    public virtual PayrollBookRowRequest PayrollBookRowRequest { get; set; }
    public int? PayrollBookRowRequestId { get; set; }
    
    public double TransportAssistance { get; set; }
    public double TotalDevengated { get; set; }
    public double Health { get; set; }
    public double Pension { get; set; }
    public double NetPaid { get; set; }
    
}