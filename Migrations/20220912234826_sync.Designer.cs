// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Up.Models;

#nullable disable

namespace Up.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20220912234826_sync")]
    partial class sync
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Up.Models.Config.ClassificationDaysType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Days")
                        .HasColumnType("integer");

                    b.Property<int>("TypePaymentDateId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("TypePaymentDateId");

                    b.ToTable("ClassificationDaysTypes");
                });

            modelBuilder.Entity("Up.Models.Config.ParameterValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsMinimumSalary")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsTransportAssistance")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<double>("Value")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.ToTable("ParameterValues");
                });

            modelBuilder.Entity("Up.Models.Entity.ContractEmployee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("PaymentDateId")
                        .HasColumnType("integer");

                    b.Property<double>("Salary")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("TypeContractId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PaymentDateId");

                    b.HasIndex("TypeContractId");

                    b.ToTable("ContractEmployees");
                });

            modelBuilder.Entity("Up.Models.Entity.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("ContractEmployeeId")
                        .HasColumnType("integer");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ContractEmployeeId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("Up.Models.Entity.PayrollBook", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.HasKey("Id");

                    b.ToTable("PayrollBooks");
                });

            modelBuilder.Entity("Up.Models.Entity.PayrollBookRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.HasKey("Id");

                    b.ToTable("PayrollBooksRequests");
                });

            modelBuilder.Entity("Up.Models.Entity.PayrollBookRow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("DaysSettled")
                        .HasColumnType("integer");

                    b.Property<double>("EarnedIncome")
                        .HasColumnType("double precision");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<double>("Health")
                        .HasColumnType("double precision");

                    b.Property<double>("NetPaid")
                        .HasColumnType("double precision");

                    b.Property<double>("NightlySurcharges")
                        .HasColumnType("double precision");

                    b.Property<double>("OtherDeductions")
                        .HasColumnType("double precision");

                    b.Property<double>("Overtime")
                        .HasColumnType("double precision");

                    b.Property<int>("PayrollBookId")
                        .HasColumnType("integer");

                    b.Property<double>("Pension")
                        .HasColumnType("double precision");

                    b.Property<double>("SundayAndHolidayWork")
                        .HasColumnType("double precision");

                    b.Property<double>("TotalAccrued")
                        .HasColumnType("double precision");

                    b.Property<double>("TransportationAssistance")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("PayrollBookId");

                    b.ToTable("PayrollBooksRows");
                });

            modelBuilder.Entity("Up.Models.Entity.PayrollBookRowRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("DaysSettled")
                        .HasColumnType("integer");

                    b.Property<double>("EarnedIncome")
                        .HasColumnType("double precision");

                    b.Property<int>("EmployeeId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<double>("NightlySurcharges")
                        .HasColumnType("double precision");

                    b.Property<double>("OtherDeductions")
                        .HasColumnType("double precision");

                    b.Property<double>("Overtime")
                        .HasColumnType("double precision");

                    b.Property<int>("PayrollBookRequestId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<double>("SundayAndHolidayWork")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("PayrollBookRequestId");

                    b.ToTable("PayrollBookRowRequests");
                });

            modelBuilder.Entity("Up.Models.Types.TypeContract", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsFixedTerm")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsIndefiniteTerm")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("TypeContracts");
                });

            modelBuilder.Entity("Up.Models.Types.TypePaymentDate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsDaily")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsFortnightly")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsMonthly")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsWeekly")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("TypePaymentDates");
                });

            modelBuilder.Entity("Up.Models.Config.ClassificationDaysType", b =>
                {
                    b.HasOne("Up.Models.Types.TypePaymentDate", "TypePaymentDate")
                        .WithMany()
                        .HasForeignKey("TypePaymentDateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TypePaymentDate");
                });

            modelBuilder.Entity("Up.Models.Entity.ContractEmployee", b =>
                {
                    b.HasOne("Up.Models.Types.TypePaymentDate", "PaymentDate")
                        .WithMany()
                        .HasForeignKey("PaymentDateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Up.Models.Types.TypeContract", "TypeContract")
                        .WithMany()
                        .HasForeignKey("TypeContractId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PaymentDate");

                    b.Navigation("TypeContract");
                });

            modelBuilder.Entity("Up.Models.Entity.Employee", b =>
                {
                    b.HasOne("Up.Models.Entity.ContractEmployee", "ContractEmployee")
                        .WithMany()
                        .HasForeignKey("ContractEmployeeId");

                    b.Navigation("ContractEmployee");
                });

            modelBuilder.Entity("Up.Models.Entity.PayrollBookRow", b =>
                {
                    b.HasOne("Up.Models.Entity.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Up.Models.Entity.PayrollBook", "PayrollBook")
                        .WithMany("Rows")
                        .HasForeignKey("PayrollBookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("PayrollBook");
                });

            modelBuilder.Entity("Up.Models.Entity.PayrollBookRowRequest", b =>
                {
                    b.HasOne("Up.Models.Entity.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Up.Models.Entity.PayrollBookRequest", "PayrollBookRequest")
                        .WithMany("Rows")
                        .HasForeignKey("PayrollBookRequestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Employee");

                    b.Navigation("PayrollBookRequest");
                });

            modelBuilder.Entity("Up.Models.Entity.PayrollBook", b =>
                {
                    b.Navigation("Rows");
                });

            modelBuilder.Entity("Up.Models.Entity.PayrollBookRequest", b =>
                {
                    b.Navigation("Rows");
                });
#pragma warning restore 612, 618
        }
    }
}
