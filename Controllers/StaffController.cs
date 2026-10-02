using Microsoft.AspNetCore.Mvc;
using Labb3MeetingAssistant.Models;
using Labb3MeetingAssistant.Services;
using Labb3MeetingAssistant.Data;

namespace Labb3MeetingAssistant.Controllers
{
    [ApiController]
    [Route("api/staff")]
    public class StaffController : Controller
    {
        [HttpGet]
        public IActionResult GetStaff()
        {
            var staff = Staff.Positions.Select(p => new { name = p.Key, role = p.Value }).ToList();
            return Ok(staff);
        }

        [HttpGet("rooms")]
        public IActionResult GetRooms()
        {
            return Ok(Enum.GetNames<Rooms>());
        }
    }
}
