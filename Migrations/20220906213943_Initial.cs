using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Up.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ParameterValues",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Value = table.Column<double>(type: "double precision", nullable: false),
                    IsTransportAssistance = table.Column<bool>(type: "boolean", nullable: false),
                    IsMinimumSalary = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ParameterValues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PayrollBooks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollBooks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PayrollBooksRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollBooksRequests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeContracts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    IsIndefiniteTerm = table.Column<bool>(type: "boolean", nullable: false),
                    IsFixedTerm = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeContracts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypePaymentDates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    IsMonthly = table.Column<bool>(type: "boolean", nullable: false),
                    IsFortnightly = table.Column<bool>(type: "boolean", nullable: false),
                    IsWeekly = table.Column<bool>(type: "boolean", nullable: false),
                    IsDaily = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypePaymentDates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ClassificationDaysTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TypePaymentDateId = table.Column<int>(type: "integer", nullable: false),
                    Days = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassificationDaysTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClassificationDaysTypes_TypePaymentDates_TypePaymentDateId",
                        column: x => x.TypePaymentDateId,
                        principalTable: "TypePaymentDates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContractEmployees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PaymentDateId = table.Column<int>(type: "integer", nullable: false),
                    TypeContractId = table.Column<int>(type: "integer", nullable: false),
                    Salary = table.Column<double>(type: "double precision", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContractEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContractEmployees_TypeContracts_TypeContractId",
                        column: x => x.TypeContractId,
                        principalTable: "TypeContracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContractEmployees_TypePaymentDates_PaymentDateId",
                        column: x => x.PaymentDateId,
                        principalTable: "TypePaymentDates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: true),
                    LastName = table.Column<string>(type: "text", nullable: true),
                    ContractEmployeeId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_ContractEmployees_ContractEmployeeId",
                        column: x => x.ContractEmployeeId,
                        principalTable: "ContractEmployees",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PayrollBookRowRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollBookRequestId = table.Column<int>(type: "integer", nullable: false),
                    EmployeeId = table.Column<int>(type: "integer", nullable: false),
                    DaysSettled = table.Column<int>(type: "integer", nullable: false),
                    EarnedIncome = table.Column<double>(type: "double precision", nullable: false),
                    Overtime = table.Column<double>(type: "double precision", nullable: false),
                    NightlySurcharges = table.Column<double>(type: "double precision", nullable: false),
                    SundayAndHolidayWork = table.Column<double>(type: "double precision", nullable: false),
                    OtherDeductions = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollBookRowRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollBookRowRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PayrollBookRowRequests_PayrollBooksRequests_PayrollBookRequ~",
                        column: x => x.PayrollBookRequestId,
                        principalTable: "PayrollBooksRequests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PayrollBooksRows",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PayrollBookId = table.Column<int>(type: "integer", nullable: false),
                    EmployeeId = table.Column<int>(type: "integer", nullable: false),
                    DaysSettled = table.Column<int>(type: "integer", nullable: false),
                    EarnedIncome = table.Column<double>(type: "double precision", nullable: false),
                    Overtime = table.Column<double>(type: "double precision", nullable: false),
                    NightlySurcharges = table.Column<double>(type: "double precision", nullable: false),
                    SundayAndHolidayWork = table.Column<double>(type: "double precision", nullable: false),
                    TransportationAssistance = table.Column<double>(type: "double precision", nullable: false),
                    TotalAccrued = table.Column<double>(type: "double precision", nullable: false),
                    Health = table.Column<double>(type: "double precision", nullable: false),
                    Pension = table.Column<double>(type: "double precision", nullable: false),
                    OtherDeductions = table.Column<double>(type: "double precision", nullable: false),
                    NetPaid = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayrollBooksRows", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayrollBooksRows_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PayrollBooksRows_PayrollBooks_PayrollBookId",
                        column: x => x.PayrollBookId,
                        principalTable: "PayrollBooks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassificationDaysTypes_TypePaymentDateId",
                table: "ClassificationDaysTypes",
                column: "TypePaymentDateId");

            migrationBuilder.CreateIndex(
                name: "IX_ContractEmployees_PaymentDateId",
                table: "ContractEmployees",
                column: "PaymentDateId");

            migrationBuilder.CreateIndex(
                name: "IX_ContractEmployees_TypeContractId",
                table: "ContractEmployees",
                column: "TypeContractId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ContractEmployeeId",
                table: "Employees",
                column: "ContractEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollBookRowRequests_EmployeeId",
                table: "PayrollBookRowRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollBookRowRequests_PayrollBookRequestId",
                table: "PayrollBookRowRequests",
                column: "PayrollBookRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollBooksRows_EmployeeId",
                table: "PayrollBooksRows",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_PayrollBooksRows_PayrollBookId",
                table: "PayrollBooksRows",
                column: "PayrollBookId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClassificationDaysTypes");

            migrationBuilder.DropTable(
                name: "ParameterValues");

            migrationBuilder.DropTable(
                name: "PayrollBookRowRequests");

            migrationBuilder.DropTable(
                name: "PayrollBooksRows");

            migrationBuilder.DropTable(
                name: "PayrollBooksRequests");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "PayrollBooks");

            migrationBuilder.DropTable(
                name: "ContractEmployees");

            migrationBuilder.DropTable(
                name: "TypeContracts");

            migrationBuilder.DropTable(
                name: "TypePaymentDates");
        }
    }
}
