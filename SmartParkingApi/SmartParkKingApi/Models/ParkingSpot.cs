using System.ComponentModel.DataAnnotations;

namespace SmartParkKingApi.Models
{
    public class ParkingSpot
    {
        [Key]
        public int SpotId { get; set; }
        public string SpotNumber { get; set; } = string.Empty;
        public bool IsOccupied { get; set; } = false;
        public string VehicleType { get; set; } = "Car";
    }
}