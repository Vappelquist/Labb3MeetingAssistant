using Labb3MeetingAssistant.Models;
using Labb3MeetingAssistant.Models.Requests;
using Labb3MeetingAssistant.Services;
using Microsoft.AspNetCore.Mvc;

namespace Labb3MeetingAssistant.Controllers
{
    [ApiController]
    [Route("api/ai")]
    public class AiController : ControllerBase
    {
        private readonly IAiService _aiService;

        public AiController(IAiService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("summarize")]
        public async Task<IActionResult> Summarize(SummarizeRequest request)
        {
            var result = await _aiService.SummarizeAsync(request);
            return Ok(new AiResponse { Result = result});   
        }
        [HttpPost("invitation")]
        public async Task<IActionResult> Invite(InvitationRequest request)
        {
            var result = await _aiService.InvitationAsync(request);
            return Ok(new AiResponse { Result = result});
        }
        [HttpPost("agenda")]
        public async Task<IActionResult> Agenda(AgendaRequest request)
        {
            var result = await _aiService.AgendaAsync(request);
            return Ok(new AiResponse { Result = result });
        }
        
    }

}
