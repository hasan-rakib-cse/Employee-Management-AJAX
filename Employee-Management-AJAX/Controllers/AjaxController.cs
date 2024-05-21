using Employee_Management_AJAX.Data;
using Employee_Management_AJAX.Models;
using Microsoft.AspNetCore.Mvc;

namespace Employee_Management_AJAX.Controllers
{
    public class AjaxController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AjaxController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult EmployeeList()
        {
            var data = _context.Employee.ToList();
            return new JsonResult(data);

        }

        // The Action Method below is working

        //public JsonResult EmployeeList()
        //{
        //    var data = _context.Employee.ToList();
        //    if (data != null && data.Count > 0)
        //    {
        //        return Json(new { flag = "1", msg = "Employee Data Found", empdata = data });
        //    }
        //    else
        //    {
        //        return Json(new { flag = "0", msg = "No Employee Data Available", empdata = data });
        //    }
        //}

        [HttpPost]
        public JsonResult CreateEmployee(Employee employee)
        {
            var emp = new Employee()
            {
                Name = employee.Name,
                Designation = employee.Designation,
                City = employee.City,
                Salary = employee.Salary
            };
            _context.Employee.Add(emp);
            _context.SaveChanges();
            return new JsonResult("Data is Saved");
        }

        [HttpPost]
        public JsonResult DeleteEmployee(int id)
        {
            var emp = _context.Employee.FirstOrDefault(x => x.Id == id);

            _context.Employee.Remove(emp);
            _context.SaveChanges();

            return new JsonResult("Data is Deleted");
        }

        public JsonResult EditEmployee(int id)
        {
            var data = _context.Employee.Find(id);

            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult UpdateEmployee(Employee employee)
        {
            _context.Employee.Update(employee);
            _context.SaveChanges();
            return new JsonResult("Record Updated");
        }

        public JsonResult EmployeeDetails (int id)
        {
            var data = _context.Employee.Find(id);

            return new JsonResult(data);
        }

    }
}
