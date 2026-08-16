using System.ComponentModel.DataAnnotations;

namespace SmartParkKingApi.Models
{
    public class ParkingTicket
    {
        [Key]
        public int TicketId { get; set; }
        public string LicensePlate { get; set; } = string.Empty;
        public int SpotId { get; set; }
        public DateTime EntryTime { get; set; } = DateTime.Now;
        public DateTime? ExitTime { get; set; }
        public decimal? TotalCost { get; set; }
        public bool IsPaid { get; set; } = false;
        public ParkingSpot? ParkingSpot { get; set; }
    }
}