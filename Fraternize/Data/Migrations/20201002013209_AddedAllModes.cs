using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Fraternize.Data.Migrations
{
    public partial class AddedAllModes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chapter",
                columns: table => new
                {
                    ChapterId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chapter", x => x.ChapterId);
                });

            migrationBuilder.CreateTable(
                name: "Committee",
                columns: table => new
                {
                    CommitteeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Committee", x => x.CommitteeId);
                });

            migrationBuilder.CreateTable(
                name: "Profession",
                columns: table => new
                {
                    ProfessionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profession", x => x.ProfessionId);
                });

            migrationBuilder.CreateTable(
                name: "Title",
                columns: table => new
                {
                    TitleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Title", x => x.TitleId);
                });

            migrationBuilder.CreateTable(
                name: "MemberData",
                columns: table => new
                {
                    MemberDataId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MemberId = table.Column<int>(nullable: true),
                    CardNumber = table.Column<string>(nullable: true),
                    SurName = table.Column<string>(nullable: true),
                    OtherNames = table.Column<string>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    MembershipStatus = table.Column<int>(nullable: false),
                    ProfessionId = table.Column<int>(nullable: false),
                    DateofBirth = table.Column<DateTime>(nullable: false),
                    DateofWedding = table.Column<DateTime>(nullable: true),
                    ResidenceLocation = table.Column<string>(nullable: true),
                    CellPhoneNumber = table.Column<string>(nullable: true),
                    HomePhoneNumber = table.Column<string>(nullable: true),
                    EmailAddress = table.Column<string>(nullable: true),
                    PostalAddress = table.Column<string>(nullable: true),
                    DateofFullMembership = table.Column<DateTime>(nullable: false),
                    ChapterId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberData", x => x.MemberDataId);
                    table.ForeignKey(
                        name: "FK_MemberData_Chapter_ChapterId",
                        column: x => x.ChapterId,
                        principalTable: "Chapter",
                        principalColumn: "ChapterId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberData_Profession_ProfessionId",
                        column: x => x.ProfessionId,
                        principalTable: "Profession",
                        principalColumn: "ProfessionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MemberDataCommittee",
                columns: table => new
                {
                    MemberDataId = table.Column<int>(nullable: false),
                    CommitteeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberDataCommittee", x => new { x.MemberDataId, x.CommitteeId });
                    table.ForeignKey(
                        name: "FK_MemberDataCommittee_Committee_CommitteeId",
                        column: x => x.CommitteeId,
                        principalTable: "Committee",
                        principalColumn: "CommitteeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberDataCommittee_MemberData_MemberDataId",
                        column: x => x.MemberDataId,
                        principalTable: "MemberData",
                        principalColumn: "MemberDataId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MemberDataTitle",
                columns: table => new
                {
                    MemberDataId = table.Column<int>(nullable: false),
                    TitleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberDataTitle", x => new { x.MemberDataId, x.TitleId });
                    table.ForeignKey(
                        name: "FK_MemberDataTitle_MemberData_MemberDataId",
                        column: x => x.MemberDataId,
                        principalTable: "MemberData",
                        principalColumn: "MemberDataId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberDataTitle_Title_TitleId",
                        column: x => x.TitleId,
                        principalTable: "Title",
                        principalColumn: "TitleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MemberData_ChapterId",
                table: "MemberData",
                column: "ChapterId");

            migrationBuilder.CreateIndex(
                name: "IX_MemberData_ProfessionId",
                table: "MemberData",
                column: "ProfessionId");

            migrationBuilder.CreateIndex(
                name: "IX_MemberDataCommittee_CommitteeId",
                table: "MemberDataCommittee",
                column: "CommitteeId");

            migrationBuilder.CreateIndex(
                name: "IX_MemberDataTitle_TitleId",
                table: "MemberDataTitle",
                column: "TitleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberDataCommittee");

            migrationBuilder.DropTable(
                name: "MemberDataTitle");

            migrationBuilder.DropTable(
                name: "Committee");

            migrationBuilder.DropTable(
                name: "MemberData");

            migrationBuilder.DropTable(
                name: "Title");

            migrationBuilder.DropTable(
                name: "Chapter");

            migrationBuilder.DropTable(
                name: "Profession");
        }
    }
}
