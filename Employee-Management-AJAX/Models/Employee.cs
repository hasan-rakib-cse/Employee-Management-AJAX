using System.ComponentModel.DataAnnotations;

namespace Employee_Management_AJAX.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [Required, StringLength(50)]
        public string Designation { get; set; }

        [Required, StringLength(50)]
        public string City { get; set; }

        [Required]
        public decimal Salary { get; set; }
    }
}
