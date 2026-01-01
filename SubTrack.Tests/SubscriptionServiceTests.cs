using SubTrack.Services;
using SubTrack.Models;

namespace SubTrack.Tests;

public class SubscriptionServiceTests
{
    private readonly SubscriptionService _service;

    public SubscriptionServiceTests()
    {
        _service = new SubscriptionService();
    }

    [Fact]
    public void CalculateRenewalDate_Weekly_Returns7DaysFromNow()
    {
        var cycle = Subscription.BillingCycle.Weekly;
        var expectedDate = DateTime.UtcNow.AddDays(7);
        var result = _service.CalculateRenewalDate(cycle);
        var diff = Math.Abs((result - expectedDate).TotalSeconds);
        Assert.True(diff < 1, $"Expected date to be within 1 second of {expectedDate}, but was {result}");
    }

    [Fact]
    public void CalculateRenewalDate_Monthly_Returns1MonthFromNow()
    {
        var cycle = Subscription.BillingCycle.Monthly;
        var expectedDate = DateTime.UtcNow.AddMonths(1);
        var result = _service.CalculateRenewalDate(cycle);
        var diff = Math.Abs((result - expectedDate).TotalSeconds);
        Assert.True(diff < 1, $"Expected date to be approximately 1 month from now");
    }

    [Fact]
    public void CalculateRenewalDate_Yearly_Returns1YearFromNow()
    {
        var cycle = Subscription.BillingCycle.Yearly;
        var expectedDate = DateTime.UtcNow.AddYears(1);
        var result = _service.CalculateRenewalDate(cycle);
        var diff = Math.Abs((result - expectedDate).TotalSeconds);
        Assert.True(diff < 1, $"Expected date to be aprroximately 1 year from now");
    }

    [Fact]
    public void CalculateRenewalDate_InvalidCycle_ThrowsException()
    {
        var invalidCycle = (Subscription.BillingCycle)999;
        Assert.Throws<ArgumentOutOfRangeException>(() => _service.CalculateRenewalDate(invalidCycle));
    }
}
