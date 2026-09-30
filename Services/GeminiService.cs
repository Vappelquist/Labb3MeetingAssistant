using Labb3MeetingAssistant.Data;
using Labb3MeetingAssistant.Models.Requests;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Globalization;
using System.Runtime.CompilerServices;
using System.Text.Json;

namespace Labb3MeetingAssistant.Services
{
    public class GeminiService : IAiService
    {
        private readonly HttpClient _http;
        private readonly string _apiKey;
        private readonly string _model;

        public GeminiService(HttpClient http, IConfiguration config)
        {
            _http = http;
            _apiKey = config["GEMINI_API_KEY"]
                ?? throw new InvalidOperationException("Gemini key may be invalid");
            _model = string.IsNullOrWhiteSpace(config["Gemini:Model"])
                ? "gemini-3.5-flash-lite"
                : config["Gemini:Model"]!;
        }
        public async Task<string> SummarizeAsync(SummarizeRequest request)
        {
            var prompt = $"Summarize following meeting audio... \n\n{request.Notes}";
            return await SendPromptAsync(prompt);
        }

        public async Task<string> AgendaAsync(AgendaRequest request)
        {
            throw new NotImplementedException();
        }
        private async Task<string> SendPromptAsync(string prompt)
        {
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/{_model}:generateContent";
            var body = new
            {
                contents = new[]
                {
                    new {parts = new [] {new {text = prompt} } }
                }
            };
            var request = new HttpRequestMessage(HttpMethod.Post, url);
            request.Headers.Add("x-goog-api-key", _apiKey);
            request.Content = JsonContent.Create(body);

            var response = await _http.SendAsync(request);
            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new HttpRequestException(
                    $"Gemini returned {(int)response.StatusCode}: {json}");
            }

            using var doc = JsonDocument.Parse(json);

            var text = doc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            return text ?? string.Empty;
        }
        private static string FormatPerson(string name)
        {
            return Staff.Positions.TryGetValue(name, out var role)
                ? $"{name} ({role})"
                : name;
        }
        public async Task<string> InvitationAsync(InvitationRequest request)
        {
            var host = FormatPerson(request.Host);
            var guests = string.Join(", ", request.Guests.Select(FormatPerson));
            var prompt = $"""
                Write a short and professional meeting invitation in English, if there's multiple words in another language then translate it to english.
                Title: {request.Title}
                Host: {host}
                Guests: {guests}
                Location: {request.Place}
                Time: {request.Time.ToString("dddd d MMMM HH:mm", new CultureInfo("en-US"))}
                Don't invent any information that isn't provided above.
                """;

            return await SendPromptAsync(prompt);
        }
    }
}
