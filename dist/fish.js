"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fishery_1 = require("fishery");
const faker_1 = require("@faker-js/faker");
const employeeFactory = fishery_1.Factory.define(() => ({
    "91": `${faker_1.faker.person.lastName()}, ${faker_1.faker.person.firstName()}`,
    "4047": faker_1.faker.date.past().toISOString().split("T")[0],
    id: faker_1.faker.string.numeric(5),
    employeeStatusDate: faker_1.faker.date.past().toISOString().split("T")[0],
    employmentHistoryStatus: faker_1.faker.helpers.arrayElement([
        "Full Time Employee",
        "Part Time Employee",
        "Intern",
        "Terminated",
    ]),
    status: faker_1.faker.helpers.arrayElement(["Active", "Inactive"]),
    fullName2: `${faker_1.faker.person.lastName()}, ${faker_1.faker.person.firstName()}`,
    jobTitle: faker_1.faker.helpers.arrayElement([
        "Software Developer Intern",
        "Tier 1 Developer - B",
        "Tier 2 Developer - B",
        "Tier 1 Developer - A",
        "Tier 2 Developer - A",
        "Tier 1 Developer - C",
        "Tier 2 Developer - C",
        "Software Developer",
        "null",
    ]),
}));
const dataStructureFactory = new fishery_1.Factory(() => ({
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
    employees: employeeFactory.buildList(10),
}));
const generatedData = dataStructureFactory.buildList(2);
generatedData.forEach((data) => console.log(data));
