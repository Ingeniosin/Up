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


    public static List<TypePaymentDate> DefaultValues(ApplicationDbContext db) {
        return new List<TypePaymentDate>(){
            new(){ Name = "Mensual", IsMonthly = true },
            new(){ Name = "Diario", IsDaily = true },
            new(){ Name = "Semanal", IsWeekly = true },
            new(){ Name = "Quincenal", IsFortnightly = true }
        };
    }

}