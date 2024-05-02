"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
/**
 * Generate a random integer between min and max
 *
 * @param {number} min - bottom limit inclusve
 * @param {number} max - aupper limit inclusive
 * @return {number} a random number
 */
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * Get a new sequential date based on the last date
 *
 * @param {Date} lastDate - the last date
 * @param {number} maxDaysIncrement - the maximum number of days to increment
 * @return {Date} a new date
 */
const getSequentialDate = (lastDate, maxDaysIncrement = 365) => {
    const increment = getRandomInt(1, maxDaysIncrement);
    const newDate = new Date(lastDate);
    newDate.setDate(newDate.getDate() + increment);
    return newDate;
};
/**
 * Generate an employee object
 *
 * @param {boolean} isReported - if the employee is reported
 * @param {string} employeeName - the employee name
 * @param {string} employeeId - the employee id
 * @return {Object} the employee object
 */
const generateEmployee = (isReported = true, employeeName, employeeId) => {
    const commonFields = {
        id: employeeId,
        employeeStatusDate: faker_1.faker.date.past().toISOString().split("T")[0],
        employmentHistoryStatus: faker_1.faker.helpers.arrayElement([
            "Full Time Employee",
            "Part Time Employee",
            "Intern",
            "Terminated",
            "null",
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
 * Generate a list of employee records
 *
 * @param {number} count - the number of employee records to generate
 * @return {Array} a list of employee records
 */
const generateEmployees = (count) => {
    const employeTrayectory = [];
    let employeeName = `${faker_1.faker.person.lastName()}, ${faker_1.faker.person.firstName()}`;
    let employeeId = faker_1.faker.string.numeric(5);
    let isReported = false;
    let togglePoint = getRandomInt(0, count - 1);
    let lastGeneratedDate = new Date(2019, 1, 1);
    for (let i = 0; i < count; i++) {
        if (i === togglePoint) {
            isReported = !isReported;
        }
        const nextDate = getSequentialDate(lastGeneratedDate);
        employeTrayectory.push(generateEmployee(isReported, employeeName, employeeId));
        lastGeneratedDate = nextDate;
    }
    return employeTrayectory;
};
/**
 * Generate the data structure
 *
 * @return {Object} the data structure
 */
const generateDataStructure = (trayectory_lenght) => ({
    title: "Tier/Rank Advancement",
    fields: [
        { id: "fullName2", type: "text", name: "Last Name, First Name" },
        { id: 4047, type: "date", name: "Job Information: Date" },
        { id: "jobTitle", type: "list", name: "Job Title" },
        { id: 91, type: "employee", name: "Reporting to" },
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
    // get 10 employee records of trayectory
    employees: generateEmployees(trayectory_lenght),
});
/**
 * Get the employees trayectory
 *
 * @param {number} numberOfEmployees - the number of employee records to generate
 */
const getEmployeesTRayectory = (numberOfEmployees) => {
    //let employees = [];
    let trayectory_lenght = 10;
    for (let i = 0; i < numberOfEmployees; i++) {
        //employees.push(generateDataStructure());
        console.log(generateDataStructure(trayectory_lenght));
    }
};
getEmployeesTRayectory(2);
