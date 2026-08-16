using Microsoft.EntityFrameworkCore;
using SmartParkKingApi.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. إضافة خدمة CORS للسماح بالربط مع الـ Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. تسجيل DbContext للربط بـ SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 3. تفعيل CORS قبل Authorization
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();