using Microsoft.AspNetCore.Mvc;
using ExpenseApi.Models;

namespace ExpenseApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private static List<Expense> expenses = new();

    [HttpGet]
    public IActionResult Get() => Ok(expenses);

    [HttpPost]
    public IActionResult Post(Expense expense)
    {
        expense.Id = expenses.Count + 1;
        expenses.Add(expense);
        return Ok(expense);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var expense = expenses.FirstOrDefault(e => e.Id == id);
        if (expense == null) return NotFound();
        expenses.Remove(expense);
        return NoContent();
    }
}
