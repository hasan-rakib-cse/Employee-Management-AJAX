using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Employee_Management_AJAX.Models;

namespace Employee_Management_AJAX.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee_Management_AJAX.Models.Employee> Employee { get; set; } = default!;
    }
}
