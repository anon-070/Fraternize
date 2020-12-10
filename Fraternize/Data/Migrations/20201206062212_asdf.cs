using Microsoft.EntityFrameworkCore.Migrations;

namespace Fraternize.Data.Migrations
{
    public partial class asdf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MembershipStatus",
                table: "MemberData");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MembershipStatus",
                table: "MemberData",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
