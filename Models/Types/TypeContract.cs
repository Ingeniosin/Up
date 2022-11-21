namespace Up.Models.Types; 

public class TypeContract {
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsIndefiniteTerm { get; set; }
    public bool IsFixedTerm { get; set; }
    
    public static List<TypeContract> DefaultValues(ApplicationDbContext db) {
        return new List<TypeContract>(){
            new(){Name = "Indefinido", IsIndefiniteTerm = true},
            new(){Name = "Fijo", IsFixedTerm = false}
        };
    }
    
}