public class Subscription
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public decimal Cost { get; set; }
    public enum BillingCycle { Weekly, Monthly, Yearly }
    public BillingCycle Cycle { get; set; }
    public DateTime RenewalDate { get; set; }
}