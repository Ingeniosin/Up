using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Up.Migrations
{
    public partial class sync2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClassificationDaysTypes_TypePaymentDateId",
                table: "ClassificationDaysTypes");

            migrationBuilder.DropColumn(
                name: "DaysSettled",
                table: "PayrollBooksRows");

            migrationBuilder.DropColumn(
                name: "EarnedIncome",
                table: "PayrollBooksRows");

            migrationBuilder.DropColumn(
                name: "NightlySurcharges",
                table: "PayrollBooksRows");

            migrationBuilder.DropColumn(
                name: "OtherDeductions",
                table: "PayrollBooksRows");

            migrationBuilder.DropColumn(
                name: "Overtime",
                table: "PayrollBooksRows");

            migrationBuilder.DropColumn(
                name: "SundayAndHolidayWork",
                table: "PayrollBooksRows");

            migrationBuilder.RenameColumn(
                name: "TransportationAssistance",
                table: "PayrollBooksRows",
                newName: "TransportAssistance");

            migrationBuilder.RenameColumn(
                name: "TotalAccrued",
                table: "PayrollBooksRows",
                newName: "TotalDevengated");

            migrationBuilder.AddColumn<int>(
                name: "PayrollBookRowRequestId",
                table: "PayrollBooksRows",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "PayrollBooksRequests",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "PayrollBooksRequests",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "PayrollBooks",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                table: "PayrollBooks",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_PayrollBooksRows_PayrollBookRowRequestId",
                table: "PayrollBooksRows",
                column: "PayrollBookRowRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassificationDaysTypes_TypePaymentDateId",
                table: "ClassificationDaysTypes",
                column: "TypePaymentDateId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PayrollBooksRows_PayrollBookRowRequests_PayrollBookRowReque~",
                table: "PayrollBooksRows",
                column: "PayrollBookRowRequestId",
                principalTable: "PayrollBookRowRequests",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PayrollBooksRows_PayrollBookRowRequests_PayrollBookRowReque~",
                table: "PayrollBooksRows");

            migrationBuilder.DropIndex(
                name: "IX_PayrollBooksRows_PayrollBookRowRequestId",
                table: "PayrollBooksRows");

            migrationBuilder.DropIndex(
                name: "IX_ClassificationDaysTypes_TypePaymentDateId",
                table: "ClassificationDaysTypes");

            migrationBuilder.DropColumn(
                name: "PayrollBookRowRequestId",
                table: "PayrollBooksRows");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "PayrollBooksRequests");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "PayrollBooksRequests");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "PayrollBooks");

            migrationBuilder.DropColumn(
                name: "StartDate",
                table: "PayrollBooks");

            migrationBuilder.RenameColumn(
                name: "TransportAssistance",
                table: "PayrollBooksRows",
                newName: "TransportationAssistance");

            migrationBuilder.RenameColumn(
                name: "TotalDevengated",
                table: "PayrollBooksRows",
                newName: "TotalAccrued");

            migrationBuilder.AddColumn<int>(
                name: "DaysSettled",
                table: "PayrollBooksRows",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "EarnedIncome",
                table: "PayrollBooksRows",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "NightlySurcharges",
                table: "PayrollBooksRows",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "OtherDeductions",
                table: "PayrollBooksRows",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Overtime",
                table: "PayrollBooksRows",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "SundayAndHolidayWork",
                table: "PayrollBooksRows",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_ClassificationDaysTypes_TypePaymentDateId",
                table: "ClassificationDaysTypes",
                column: "TypePaymentDateId");
        }
    }
}
