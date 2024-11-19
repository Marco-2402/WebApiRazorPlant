using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorPlant.Pages
{
    public class EjemploWebApiGet : PageModel
    {
        private readonly ILogger<EjemploWebApiGet> _logger;

        public EjemploWebApiGet(ILogger<EjemploWebApiGet> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }

}
