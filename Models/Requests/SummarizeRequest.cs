using System.ComponentModel.DataAnnotations;

namespace Labb3MeetingAssistant.Models.Requests
{
    public class SummarizeRequest
    {
        [Required]
        [MaxLength(1000)]
        public string Notes { get; set; } = string.Empty;
    }
}
