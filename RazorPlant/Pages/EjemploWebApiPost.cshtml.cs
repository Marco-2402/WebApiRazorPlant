using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorPlant.Pages
{
    public class EjemploWebApiPost : PageModel
    {
        private readonly ILogger<EjemploWebApiPost> _logger;

        public EjemploWebApiPost(ILogger<EjemploWebApiPost> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }

}
