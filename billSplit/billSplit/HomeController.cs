using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;

namespace billSplit.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Privacy()
        {
            return RedirectToAction("/SplitEven");
        }
        public string Hello()
        {
            return "Hello There";
        }
    }
}
