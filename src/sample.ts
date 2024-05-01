// import { Factory } from "fishery";
// import { faker } from "@faker-js/faker";

// // Definir el tipo para los parámetros de la "factory"
// interface EmployeeParams {
//     isReported?: boolean;
//     employeeName?: string;
//     employeeId?: string;
// }

// // Función auxiliar para obtener un número entero aleatorio
// const getRandomInt = (min: number, max: number): number => {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// };

// // Función para obtener una fecha secuencial
// const getSequentialDate = (
//     lastDate: Date,
//     maxDaysIncrement: number = 365
// ): Date => {
//     const increment = getRandomInt(1, maxDaysIncrement);
//     const newDate = new Date(lastDate);
//     newDate.setDate(newDate.getDate() + increment);
//     return newDate;
// };

// // Definir la "factory" para los empleados
// const employeeFactory = Factory.define<EmployeeParams>(({ params }) => {
//     const isReported = params.isReported ?? true;
//     const employeeName =
//         params.employeeName ??
//         `${faker.person.lastName()}, ${faker.person.firstName()}`;
//     const employeeId = params.employeeId ?? faker.string.numeric(5);

//     const commonFields = {
//         id: employeeId,
//         employeeStatusDate: faker.date.past().toISOString().split("T")[0],
//         employmentHistoryStatus: faker.helpers.arrayElement([
//             "Full Time Employee",
//             "Part Time Employee",
//             "Intern",
//             "Terminated",
//             "null",
//         ]),
//         status: faker.helpers.arrayElement(["Active", "Inactive"]),
//     };

//     if (isReported) {
//         return {
//             ...commonFields,
//             "91": employeeName,
//             "4047": faker.date.past().toISOString().split("T")[0],
//             fullName2: `${faker.person.lastName()}, ${faker.person.firstName()}`,
//             jobTitle: faker.helpers.arrayElement([
//                 "Software Developer Intern",
//                 "Tier 1 Developer - B",
//                 "Tier 2 Developer - B",
//                 "Tier 1 Developer - A",
//                 "Tier 2 Developer - A",
//                 "Tier 1 Developer - C",
//                 "Tier 2 Developer - C",
//                 "Software Developer",
//                 "null",
//             ]),
//         };
//     } else {
//         return {
//             ...commonFields,
//             "91": faker.person.fullName(),
//             "4047": faker.date.past().toISOString().split("T")[0],
//             fullName2: employeeName,
//             jobTitle: faker.person.jobTitle(),
//         };
//     }
// });

// // Función para generar empleados
// const generateEmployees = (count: number): any[] => {
//     const employeeTrayectory = [];

//     let employeeName = `${faker.person.lastName()}, ${faker.person.firstName()}`;
//     let employeeId = faker.string.numeric(5);

//     let isReported = false;
//     let togglePoint = getRandomInt(0, count - 1);

//     let lastGeneratedDate = new Date(2010, 0, 1);

//     for (let i = 0; i < count; i++) {
//         if (i === togglePoint) {
//             isReported = !isReported;
//         }

//         const nextDate = getSequentialDate(lastGeneratedDate);
//         employeeTrayectory.push(
//             employeeFactory.build({
//                 isReported,
//                 employeeName,
//                 employeeId,
//             })
//         );

//         lastGeneratedDate = nextDate;
//     }

//     return employeeTrayectory;
// };

// // Genera la estructura de datos para el reporte
// const generateDataStructure = (): any => ({
//     title: "Tier/Rank Advancement",
//     fields: [
//         { id: "fullName2", type: "text", name: "Last Name, First Name" },
//         { id: 4047, type: "date", name: "Job Information: Date" },
//         { id: "jobTitle", type: "list", name: "Job Title" },
//         { id: 91, type: "employee", name: "Reporting to" },
//         {
//             id: "employmentHistoryStatus",
//             type: "list",
//             name: "Employment Status",
//         },
//         {
//             id: "employeeStatusDate",
//             type: "date",
//             name: "Employment Status: Date",
//         },
//         { id: "status", type: "status", name: "Status" },
//     ],
//     employees: generateEmployees(10),
// });

// // Función para obtener y mostrar empleados
// const getEmployeesTrayectory = (numberOfEmployees: number) => {
//     for (let i = 0; i < numberOfEmployees; i++) {
//         console.log(generateDataStructure());
//     }
// };

// getEmployeesTrayectory(2);
