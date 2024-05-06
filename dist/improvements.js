"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
/**
 * Generates a random integer between the specified min and max values (both inclusive).
 *
 * @param {number} min - The bottom range limit.
 * @param {number} max - The upper range limit.
 * @returns {number} A random integer.
 */
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * Generates a sequential date based on the last date and a maximum days to incrementation.
 *
 * @param {Date} lastDate - The last date in the sequence.
 * @param {number} maxDaysIncrement - The maximum day incrementation(default: 365).
 * @returns {Date} A new sequential date.
 */
const getSequentialDate = (lastDate, maxDaysIncrement = 365) => {
    const increment = getRandomInt(1, maxDaysIncrement);
    const newDate = new Date(lastDate);
    newDate.setDate(newDate.getDate() + increment);
    return newDate;
};
/**
 * Generates an employee record
 *
 * @param {boolean} isReported - Indicates whether the employee is reported.
 * @param {string} employeeName - The name of the employee.
 * @param {string} employeeId - The ID of the employee.
 * @returns {EmployeeRecord} An random employee record.
 */
const generateEmployee = (isReported, employeeName, employeeId) => {
    const commonFields = {
        id: employeeId,
        employeeStatusDate: faker_1.faker.date.past().toISOString().split("T")[0],
        employmentHistoryStatus: faker_1.faker.helpers.arrayElement([
            "Full Time Employee",
            "Part Time Employee",
            "Intern",
            "Terminated",
        ]),
        status: faker_1.faker.helpers.arrayElement(["Active", "Inactive"]),
    };
    if (isReported) {
        return Object.assign(Object.assign({}, commonFields), { "91": employeeName, "4047": faker_1.faker.date.past().toISOString().split("T")[0], fullName2: `${faker_1.faker.person.lastName()}, ${faker_1.faker.person.firstName()}`, jobTitle: faker_1.faker.helpers.arrayElement([
                "Software Developer Intern",
                "Tier 1 Developer - B",
                "Tier 2 Developer - B",
                "Tier 1 Developer - A",
                "Tier 2 Developer - A",
                "Tier 1 Developer - C",
                "Tier 2 Developer - C",
                "Software Developer",
                "null",
            ]) });
    }
    else {
        return Object.assign(Object.assign({}, commonFields), { "91": faker_1.faker.person.fullName(), "4047": faker_1.faker.date.past().toISOString().split("T")[0], fullName2: employeeName, jobTitle: faker_1.faker.person.jobTitle() });
    }
};
/**
 * Generates an array of employee records representing the trajectory of an employee.
 *
 * @param {number} count - The number of employee records to generate.
 * @returns {EmployeeRecord[]} A representation of the trajectory of an employee.
 */
const generateEmployeeTrajectory = (count) => {
    const employeeTrayectory = [];
    let employeeName = `${faker_1.faker.person.lastName()}, ${faker_1.faker.person.firstName()}`;
    let employeeId = faker_1.faker.string.numeric(5);
    let isReported = false;
    const togglePoint = getRandomInt(0, count - 1);
    let lastGeneratedDate = new Date(2019, 1, 1);
    for (let i = 0; i < count; i++) {
        if (i === togglePoint) {
            isReported = !isReported;
        }
        employeeTrayectory.push(generateEmployee(isReported, employeeName, employeeId));
        lastGeneratedDate = getSequentialDate(lastGeneratedDate);
    }
    return employeeTrayectory;
};
/**
 * Generates a fake response for similar to the Bamboo API.
 *
 * @param {number} trayectoryLength - The length of the employee trajectory.
 * @returns {FakeBambooApiResponse} A fake generated response.
 */
const generateFakeResponse = (trayectoryLength) => ({
    title: "Tier/Rank Advancement",
    fields: [
        { id: "fullName2", type: "text", name: "Last Name, First Name" },
        { id: 4047, type: "date", name: "Job Information: Date" },
        { id: "jobTitle", type: "list", name: "Job Title" },
        { id: "91", type: "employee", name: "Reporting to" },
        {
            id: "employmentHistoryStatus",
            type: "list",
            name: "Employment Status",
        },
        {
            id: "employeeStatusDate",
            type: "date",
            name: "Employment Status: Date",
        },
        { id: "status", type: "status", name: "Status" },
    ],
    employees: generateEmployeeTrajectory(trayectoryLength),
});
/**
 * Generates a specified number of fake responses.
 *
 * @param {number} numberOfResponses The number of fake responses to generate.
 */
const getNFakeResponses = (numberOfResponses) => {
    const trayectoryLength = 10;
    for (let i = 0; i < numberOfResponses; i++) {
        console.log(generateFakeResponse(trayectoryLength));
    }
};
getNFakeResponses(2);
