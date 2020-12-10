using Fraternize.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Fraternize.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<MemberDataCommittee>().HasKey(m => new { m.MemberDataId, m.CommitteeId });
            builder.Entity<MemberDataTitle>().HasKey(m => new { m.MemberDataId, m.TitleId });
            builder.Entity<MemberDataCommittee>().HasOne(m => m.Committee).WithMany(m => m.MemberDataCommittees).HasForeignKey(m => m.CommitteeId);
            builder.Entity<MemberDataCommittee>().HasOne(m => m.MemberData).WithMany(m => m.MemberDataCommittees).HasForeignKey(m => m.MemberDataId);
            builder.Entity<MemberDataTitle>().HasOne(m => m.Title).WithMany(m => m.MemberDataTitles).HasForeignKey(m => m.TitleId);
            builder.Entity<MemberDataTitle>().HasOne(m => m.MemberData).WithMany(m => m.MemberDataTitles).HasForeignKey(m => m.MemberDataId);
        }

        public DbSet<Fraternize.Data.MemberData> MemberData { get; set; }
        public DbSet<Fraternize.Data.Profession> Profession { get; set; }
        public DbSet<Fraternize.Data.Chapter> Chapter { get; set; }
        public DbSet<Fraternize.Data.Title> Title { get; set; }
        public DbSet<Fraternize.Data.Committee> Committee { get; set; }
        public DbSet<Fraternize.Data.MemberDataCommittee> MemberDataCommittee { get; set; }
        public DbSet<Fraternize.Data.MemberDataTitle> MemberDataTitle { get; set; }

    }



    public class MemberData
    {
        public int MemberDataId { get; set; }

        public int? MemberId { get; set; }

        [DisplayName("Card Number")]
        public string CardNumber { get; set; }

        [DisplayName("Surname")]
        public string SurName { get; set; }

        [DisplayName("Other Names")]
        public string OtherNames { get; set; }

        [DisplayName("First Name")]
        public string FirstName { get; set; }

       

        [DisplayName("Profession")]
        [ForeignKey("Profession")]
        public int ProfessionId { get; set; }
        public virtual Profession Profession { get; set; }

        [DisplayName("Date of Birth")]
        public DateTime DateofBirth { get; set; }

        [DisplayName("Wedding Anniversary")]
        public DateTime? DateofWedding { get; set; }

        [DisplayName("Residential Address")]
        public string ResidenceLocation { get; set; }

        [DisplayName("Cell Phone Number")]
        public string CellPhoneNumber { get; set; }

        [DisplayName("House Phone Number")]
        public string HomePhoneNumber { get; set; }

        [DisplayName("Email Address")]
        public string EmailAddress { get; set; }

        [DisplayName("Postal Address")]
        public string PostalAddress { get; set; }

        [DisplayName("Date of Full Membership")]
        public DateTime DateofFullMembership { get; set; }

        public virtual List<MemberDataCommittee> MemberDataCommittees { get; set; }

        [NotMapped]
        public string[] Committees { get; set; }

        [NotMapped]
        public string[] Titles { get; set; }

        public virtual List<MemberDataTitle> MemberDataTitles { get; set; }


        [DisplayName("Chapter")]
        [ForeignKey("Chapter")]
        public int ChapterId { get; set; }

        public virtual Chapter Chapter { get; set; }

        public MemberData()
        {
            MemberDataCommittees = new List<MemberDataCommittee>();
            MemberDataTitles = new List<MemberDataTitle>();
        }
    }

    public class Chapter
    {
        public int ChapterId { get; set; }
        public string Name { get; set; }
    }

    public class Committee
    {
        public int CommitteeId { get; set; }
        [DisplayName("Committee Name")]
        public string Name { get; set; }

        public virtual List<MemberDataCommittee> MemberDataCommittees { get; set; }
    }

    public class Profession
    {
        public int ProfessionId { get; set; }
        [DisplayName("Profession")]
        public string Name { get; set; }
    }



    public class MemberDataCommittee
    {
        [ForeignKey("MemberData")]
        public int MemberDataId { get; set; }
        public virtual MemberData MemberData { get; set; }

        [ForeignKey("Committee")]
        public int CommitteeId { get; set; }
        public virtual Committee Committee { get; set; }
    }

    public class MemberDataTitle
    {
        [ForeignKey("MemberData")]
        public int MemberDataId { get; set; }
        public virtual MemberData MemberData { get; set; }

        [ForeignKey("Title")]
        public int TitleId { get; set; }

        public virtual Title Title { get; set; }

    }






    public enum MembershipStatus
    {
        FM,
        AM
    }


    public class Title
    {
        public int TitleId { get; set; }
        [DisplayName("Title")]
        public string Name { get; set; }

        public List<MemberDataTitle> MemberDataTitles { get; set; }
    }

}

