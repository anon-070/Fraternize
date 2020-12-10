using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fraternize.Data;

namespace Fraternize.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommitteesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommitteesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Committees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Committee>>> GetCommittee()
        {
            return await _context.Committee.ToListAsync();
        }

        // GET: api/Committees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Committee>> GetCommittee(int id)
        {
            var committee = await _context.Committee.FindAsync(id);

            if (committee == null)
            {
                return NotFound();
            }

            return committee;
        }

        // PUT: api/Committees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommittee(int id, Committee committee)
        {
            if (id != committee.CommitteeId)
            {
                return BadRequest();
            }

            _context.Entry(committee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommitteeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Committees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Committee>> PostCommittee(Committee committee)
        {
            _context.Committee.Add(committee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommittee", new { id = committee.CommitteeId }, committee);
        }

        // DELETE: api/Committees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Committee>> DeleteCommittee(int id)
        {
            var committee = await _context.Committee.FindAsync(id);
            if (committee == null)
            {
                return NotFound();
            }

            _context.Committee.Remove(committee);
            await _context.SaveChangesAsync();

            return committee;
        }

        private bool CommitteeExists(int id)
        {
            return _context.Committee.Any(e => e.CommitteeId == id);
        }
    }
}
