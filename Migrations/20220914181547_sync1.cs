using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Up.Migrations
{
    public partial class sync1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PayrollBooksRows_Employees_EmployeeId",
                table: "PayrollBooksRows");

            migrationBuilder.DropIndex(
                name: "IX_PayrollBooksRows_EmployeeId",
                table: "PayrollBooksRows");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "PayrollBooksRows");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "PayrollBooksRows",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PayrollBooksRows_EmployeeId",
                table: "PayrollBooksRows",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_PayrollBooksRows_Employees_EmployeeId",
                table: "PayrollBooksRows",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
