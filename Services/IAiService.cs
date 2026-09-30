using Labb3MeetingAssistant.Models.Requests;

namespace Labb3MeetingAssistant.Services
{
    public interface IAiService
    {
        Task<string> SummarizeAsync(SummarizeRequest request);
        Task<string> AgendaAsync(AgendaRequest request);
        Task<string> InvitationAsync(InvitationRequest request);
    }
}
