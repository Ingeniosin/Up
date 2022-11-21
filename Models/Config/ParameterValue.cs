namespace Up.Models.Config; 

public class ParameterValue {
    
    public int Id { get; set; }
    public string Name { get; set; }
    public double Value { get; set; }
    public bool IsTransportAssistance { get; set; }
    public bool IsMinimumSalary { get; set; }
 
    
    public static List<ParameterValue> DefaultValues(ApplicationDbContext db) {
        return new List<ParameterValue>(){
            new(){Name = "Salario minimo", Value = 1000000, IsMinimumSalary = true},
            new(){Name = "Auxilio de transporte", Value = 100000, IsTransportAssistance = true}
        };
    }
    
}