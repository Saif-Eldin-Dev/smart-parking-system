using Microsoft.EntityFrameworkCore;
using SmartParkKingApi.Models;   // سطر واحد بس، واتأكد الاسم SmartParkKingApi

namespace SmartParkKingApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<ParkingSpot> ParkingSpots { get; set; }
        public DbSet<ParkingTicket> ParkingTickets { get; set; }
    }
}