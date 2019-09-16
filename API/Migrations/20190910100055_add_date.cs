using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class add_date : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "BlogPosts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Date",
                table: "BlogPosts");
        }
    }
}
