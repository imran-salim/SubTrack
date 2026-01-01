using Microsoft.EntityFrameworkCore;

class SubscriptionDbContext : DbContext
{
    public SubscriptionDbContext(DbContextOptions<SubscriptionDbContext> options)
        : base(options) { }

    public DbSet<Subscription> Subscriptions => Set<Subscription>();
}
