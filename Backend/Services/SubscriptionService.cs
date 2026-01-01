public interface ISubscriptionService
{
    DateTime CalculateRenewalDate(Subscription.BillingCycle cycle);
}

public class SubscriptionService : ISubscriptionService
{
    public DateTime CalculateRenewalDate(Subscription.BillingCycle cycle)
    {
        return cycle switch
        {
            Subscription.BillingCycle.Weekly => DateTime.UtcNow.AddDays(7),
            Subscription.BillingCycle.Monthly => DateTime.UtcNow.AddMonths(1),
            Subscription.BillingCycle.Yearly => DateTime.UtcNow.AddYears(1),
            _ => throw new ArgumentOutOfRangeException(nameof(cycle), "Invalid billing cycle")
        };
    }
}
