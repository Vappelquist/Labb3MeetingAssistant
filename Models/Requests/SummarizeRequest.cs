using System.ComponentModel.DataAnnotations;

namespace Labb3MeetingAssistant.Models.Requests
{
    public class SummarizeRequest
    {
        [Required]
        [MaxLength(10000)]
        public string Notes { get; set; } = string.Empty;
        [Required]
        public string InternalAttendees { get; set; }
        public string ExternalAttendees { get; set; }
    }
}
