using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fraternize.Data;
using System.Runtime.InteropServices.WindowsRuntime;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Fraternize.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberDataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MemberDataController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MemberData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberData>>> GetMemberData()
        {
            return await _context.MemberData.ToListAsync();
        }



        // GET: api/MemberData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberData>> GetMemberData(int id)
        {
            var memberData = await _context.MemberData.FindAsync(id);

            if (memberData == null)
            {
                return NotFound();
            }

            return memberData;
        }

        [HttpGet("Create")]
        public IActionResult CreateMemberData()
        {
            /////Get for Edit
            //var memberData = await _context.MemberData.Include(m => m.MemberDataCommittees).Include(m => m.MemberDataTitles).FirstOrDefaultAsync(m => m.MemberDataId == id);

            //memberData.Titles = memberData.MemberDataTitles.Select(x => x.TitleId.ToString()).ToArray();
            //memberData.Committees = memberData.MemberDataCommittees.Select(x => x.CommitteeId.ToString()).ToArray();
            /////////////////////////////

            var ChapterId = new SelectList(_context.Set<Chapter>(), "ChapterId", "Name");
            var ChapterIds = keyValuePairs(ChapterId);
           
            var ProfessionId = new SelectList(_context.Set<Profession>(), "ProfessionId", "Name");
            var ProfessionIds = keyValuePairs(ProfessionId);


            var Titles = new SelectList(_context.Set<Title>(), "TitleId", "Name");
            var TitleIds = keyValuePairs(Titles);


            var Committees = new SelectList(_context.Set<Committee>(), "CommitteeId", "Name");
            var CommitteeIds = keyValuePairs(Committees);


            return Ok( new { ChapterIds, ProfessionIds, TitleIds, CommitteeIds});
        }

        private object keyValuePairs(SelectList items)
        {
            var pairs = new List<object>();
            foreach (var item in items.ToList())
            {
                pairs.Add(new { value = item.Value, label = item.Text });
            }

            return pairs;
        }

        // PUT: api/MemberData/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemberData(int id, MemberData memberData)
        {
            if (id != memberData.MemberDataId)
            {
                return BadRequest();
            }

            _context.Entry(memberData).State = EntityState.Modified;

            _context.Update(memberData);

            var ministriesInside = await _context.MemberDataCommittee.Where(m => m.MemberDataId == id).ToListAsync();
            var ministryids = ministriesInside.Select(i => i.CommitteeId.ToString()).ToList();
            if (memberData.Committees == null) memberData.Committees = new string[] { };
            var ministriesToAdd = memberData.Committees.Except(ministryids).ToList();
            var ministriesToDelete = ministryids.Except(memberData.Committees).ToList();

            foreach (var item in ministriesToAdd)
            {
                var newCommittee = new MemberDataCommittee() { MemberDataId = id, CommitteeId = Int32.Parse(item) };
                await _context.AddAsync(newCommittee);
            }

            foreach (var item in ministriesToDelete)
            {
                var itemInDb = await _context.MemberDataCommittee.FirstAsync(x => x.MemberDataId == id && x.CommitteeId == Int32.Parse(item));
                _context.MemberDataCommittee.Remove(itemInDb);
            }


            var titlesInside = await _context.MemberDataTitle.Where(m => m.MemberDataId == id).ToListAsync();
            var titleids = titlesInside.Select(i => i.TitleId.ToString()).ToList();
            if (memberData.Titles == null) memberData.Titles = new string[] { };
            var titlesToAdd = memberData.Titles.Except(titleids).ToList();
            var titlesToDelete = titleids.Except(memberData.Titles).ToList();

            foreach (var item in titlesToAdd)
            {
                var newTitle = new MemberDataTitle() { MemberDataId = id, TitleId = Int32.Parse(item) };
                await _context.AddAsync(newTitle);
            }

            foreach (var item in titlesToDelete)
            {
                var itemInDb = await _context.MemberDataTitle.FirstAsync(x => x.MemberDataId == id && x.TitleId == Int32.Parse(item));
                _context.MemberDataTitle.Remove(itemInDb);
            }


            await _context.SaveChangesAsync();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemberDataExists(id))
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

        // POST: api/MemberData
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MemberData>> PostMemberData(MemberData memberData)
        {
            _context.MemberData.Add(memberData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMemberData", new { id = memberData.MemberDataId }, memberData);
        }

        // DELETE: api/MemberData/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MemberData>> DeleteMemberData(int id)
        {
            var memberData = await _context.MemberData.FindAsync(id);
            if (memberData == null)
            {
                return NotFound();
            }

            _context.MemberData.Remove(memberData);
            await _context.SaveChangesAsync();

            return memberData;
        }

        private bool MemberDataExists(int id)
        {
            return _context.MemberData.Any(e => e.MemberDataId == id);
        }
    }
}
