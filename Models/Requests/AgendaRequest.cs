using System.ComponentModel.DataAnnotations;

namespace Labb3MeetingAssistant.Models.Requests
{
    public class AgendaRequest
    {
        [Required]
        [MaxLength(1000)]
        public Dictionary<string, double> Points { get; set; } = new Dictionary<string, double>();
    }
}
