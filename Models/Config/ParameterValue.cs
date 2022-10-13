namespace Up.Models.Config; 

public class ParameterValue {
    
    public int Id { get; set; }
    public string Name { get; set; }
    public double Value { get; set; }
    public bool IsTransportAssistance { get; set; }
    public bool IsMinimumSalary { get; set; }
    
}