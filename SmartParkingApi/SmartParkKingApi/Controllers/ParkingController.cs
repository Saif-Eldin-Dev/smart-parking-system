using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartParkKingApi.Data;
using SmartParkKingApi.Models;

namespace SmartParkKingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ParkingController(ApplicationDbContext context)
        {
            _context = context;
        }

        // عرض كل الأماكن (لشبكة الموقف في الواجهة)
        [HttpGet("all-spots")]
        public async Task<IActionResult> GetAllSpots()
        {
            var spots = await _context.ParkingSpots.ToListAsync();
            return Ok(spots);
        }

        // 1. إضافة مكان ركن جديد
        [HttpPost("add-spot")]
        public async Task<IActionResult> AddSpot(string spotNumber)
        {
            var spot = new ParkingSpot { SpotNumber = spotNumber, IsOccupied = false, VehicleType = "Car" };
            _context.ParkingSpots.Add(spot);
            await _context.SaveChangesAsync();
            return Ok(spot);
        }

        // 2. عرض الأماكن المتاحة فقط
        [HttpGet("available-spots")]
        public async Task<IActionResult> GetAvailableSpots()
        {
            var spots = await _context.ParkingSpots.Where(s => !s.IsOccupied).ToListAsync();
            return Ok(spots);
        }

        // 3. دخول سيارة للجراج
        [HttpPost("entry")]
        public async Task<IActionResult> VehicleEntry(string licensePlate, int spotId)
        {
            var spot = await _context.ParkingSpots.FindAsync(spotId);
            if (spot == null || spot.IsOccupied)
                return BadRequest("المكان غير متاح أو غير موجود!");

            spot.IsOccupied = true;

            var ticket = new ParkingTicket
            {
                LicensePlate = licensePlate,
                SpotId = spotId,
                EntryTime = DateTime.Now,
                IsPaid = false
            };

            _context.ParkingTickets.Add(ticket);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "تم تسجيل الدخول بنجاح", TicketId = ticket.TicketId, SpotNumber = spot.SpotNumber });
        }

        // 4. خروج سيارة وحساب التكلفة
        [HttpPost("exit")]
        public async Task<IActionResult> VehicleExit(int ticketId, decimal hourlyRate = 20)
        {
            var ticket = await _context.ParkingTickets
                .Include(t => t.ParkingSpot)
                .FirstOrDefaultAsync(t => t.TicketId == ticketId);

            if (ticket == null || ticket.IsPaid)
                return BadRequest("التذكرة غير صالحة أو تم الدفع من قبل!");

            ticket.ExitTime = DateTime.Now;
            ticket.IsPaid = true;

            var hours = (ticket.ExitTime.Value - ticket.EntryTime).TotalHours;
            if (hours < 1) hours = 1;
            ticket.TotalCost = (decimal)hours * hourlyRate;

            if (ticket.ParkingSpot != null)
            {
                ticket.ParkingSpot.IsOccupied = false;
            }

            await _context.SaveChangesAsync();

            return Ok(new { Message = "تم الخروج بنجاح", TotalCost = ticket.TotalCost, Hours = Math.Round(hours, 2) });
        }
    }
}