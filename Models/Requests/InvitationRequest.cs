using Labb3MeetingAssistant.Data;
using System.ComponentModel.DataAnnotations;

namespace Labb3MeetingAssistant.Models.Requests
{
    public class InvitationRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Host { get; set; } = string.Empty;
        [Required]
        public Rooms Place { get; set; }
        [Required]
        public DateTime Time { get; set; }
        [Required]
        public List<string> Guests { get; set; } = new();
    
    }
}
