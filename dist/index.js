"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getSequentialDate = (lastDate, maxDaysIncrement = 365) => {
    const increment = getRandomInt(1, maxDaysIncrement);
    const newDate = new Date(lastDate);
    newDate.setDate(newDate.getDate() + increment);
    return newDate;
};
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
const generateEmployees = (count) => {
    const employeTrayectory = [];
    let employeeName = `${faker_1.faker.person.lastName()}, ${faker_1.faker.person.firstName()}`;
    let employeeId = faker_1.faker.string.numeric(5);
    let isReported = false;
    let togglePoint = getRandomInt(0, count - 1);
    let lastGeneratedDate = new Date(2010, 0, 1);
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
const generateDataStructure = () => ({
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
    employees: generateEmployees(10),
});
const getEmployeesTRayectory = (numberOfEmployees) => {
    for (let i = 0; i < numberOfEmployees; i++) {
        console.log(generateDataStructure());
    }
};
getEmployeesTRayectory(2);
