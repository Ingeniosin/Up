using Up.Models.Types;

namespace Up.Models.Config; 

public class ClassificationDaysType {
    
    public int Id { get; set; }
    
    public virtual TypePaymentDate TypePaymentDate { get; set; }
    public int TypePaymentDateId { get; set; }

    public int Days { get; set; }

    public static List<ClassificationDaysType> DefaultValues(ApplicationDbContext db) {
        db.TypePaymentDates.ToList().ForEach(x => {
            db.ClassificationDaysTypes.Add(new ClassificationDaysType{
                TypePaymentDate = x, 
                Days = x.IsFortnightly ? 15 : x.IsMonthly ? 30 : x.IsWeekly ? 7 : 1
            });
        });
        return new List<ClassificationDaysType>();
    }
    
}