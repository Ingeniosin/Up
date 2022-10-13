namespace Up.Models.Entity; 

public class PayrollBookRequest {
    
    public int Id { get; set; }
    
    public virtual Employee Employee { get; set; }
    public int EmployeeId { get; set; }
    
    public int DaysSettled { get; set; }
    
    public double EarnedIncome { get; set; }
    public double Overtime { get; set; }
    public double NightlySurcharges { get; set; }
    public double SundayAndHolidayWork { get; set; }
    
    public double OtherDeductions { get; set; }
    
    
}