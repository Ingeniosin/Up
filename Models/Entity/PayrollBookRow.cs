namespace Up.Models.Entity; 

public class PayrollBook {
    
    public int Id { get; set; }
    
    public virtual Employee Employee { get; set; }
    public int EmployeeId { get; set; }
    
    public int DaysSettled { get; set; }
    
    public double EarnedIncome { get; set; }
    public double Overtime { get; set; }
    public double NightlySurcharges { get; set; }
    public double SundayAndHolidayWork { get; set; }
    public double TransportationAssistance { get; set; }
    public double TotalAccrued { get; set; }
    public double Health { get; set; }
    public double Pension { get; set; }
    public double OtherDeductions { get; set; }
    public double NetPaid { get; set; }
    
}