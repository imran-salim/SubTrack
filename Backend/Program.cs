using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<SubscriptionDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnections")));

var clientUrl = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? new string[] { "http://localhost:5173" };
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins(clientUrl)
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "SubTrack API";
    config.Title = "SubTrack API v1";
    config.Version = "v1";
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "SubTrack API Documentation";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.UseCors("AllowLocalhost");

app.MapGet("/", () => "SubTrack API");

app.MapGet("/subs", async (SubscriptionDbContext context) =>
{
    return await context.Subscriptions.ToListAsync();
});

app.MapGet("/subs/{id}", async (SubscriptionDbContext context, int id) => {
    var sub = await context.Subscriptions.FindAsync(id);
    return sub is not null ? Results.Ok(sub) : Results.NotFound();
});

app.MapPost("/subs", async (SubscriptionDbContext context, Subscription sub) =>
{
    if (sub == null)
    {
        return Results.BadRequest();
    }

    if (sub.Cycle == Subscription.BillingCycle.Weekly)
    {
        sub.RenewalDate = DateTime.Now.AddDays(7);
    }
    else if (sub.Cycle == Subscription.BillingCycle.Monthly)
    {
        sub.RenewalDate = DateTime.Now.AddMonths(1);
    }
    else if (sub.Cycle == Subscription.BillingCycle.Yearly)
    {
        sub.RenewalDate = DateTime.Now.AddYears(1);
    }

    context.Subscriptions.Add(sub);
    await context.SaveChangesAsync();

    return Results.Created($"/subs/{sub.Id}", sub);
});

app.MapPut("/subs/{id}", async (SubscriptionDbContext context, int id, Subscription updatedSub) =>
{
    var sub = await context.Subscriptions.FindAsync(id);
    if (sub == null)
    {
        return Results.NotFound();
    }

    sub.Name = updatedSub.Name;
    sub.Cost = updatedSub.Cost;

    if (sub.Cycle != updatedSub.Cycle) 
    {
        if (updatedSub.Cycle == Subscription.BillingCycle.Weekly)
        {
            sub.RenewalDate = DateTime.Now.AddDays(7);
        }
        else if (updatedSub.Cycle == Subscription.BillingCycle.Monthly)
        {
            sub.RenewalDate = DateTime.Now.AddMonths(1);
        }
        else if (updatedSub.Cycle == Subscription.BillingCycle.Yearly)
        {
            sub.RenewalDate = DateTime.Now.AddYears(1);
        }
    }
    
    sub.Cycle = updatedSub.Cycle;
    await context.SaveChangesAsync();
    
    return Results.NoContent();
});

app.MapDelete("/subs/{id}", async (SubscriptionDbContext context, int id) =>
{
    var sub = await context.Subscriptions.FindAsync(id);
    if (sub == null)
    {
        return Results.NotFound();
    }

    context.Subscriptions.Remove(sub);
    await context.SaveChangesAsync();
    
    return Results.NoContent();
});

app.Run();
