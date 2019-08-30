using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class Added_IsMainProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Photo_BlogPostId",
                table: "Photo");

            migrationBuilder.AddColumn<bool>(
                name: "IsMain",
                table: "Photo",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Photo_BlogPostId",
                table: "Photo",
                column: "BlogPostId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Photo_BlogPostId",
                table: "Photo");

            migrationBuilder.DropColumn(
                name: "IsMain",
                table: "Photo");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_BlogPostId",
                table: "Photo",
                column: "BlogPostId",
                unique: true);
        }
    }
}
