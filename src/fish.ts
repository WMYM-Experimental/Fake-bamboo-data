import { Factory } from "fishery";
import { faker } from "@faker-js/faker";

const employeeFactory = Factory.define(() => ({
    "91": `${faker.person.lastName()}, ${faker.person.firstName()}`,
    "4047": faker.date.past().toISOString().split("T")[0],
    id: faker.string.numeric(5),
    employeeStatusDate: faker.date.past().toISOString().split("T")[0],
    employmentHistoryStatus: faker.helpers.arrayElement([
        "Full Time Employee",
        "Part Time Employee",
        "Intern",
        "Terminated",
    ]),
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
    fullName2: `${faker.person.lastName()}, ${faker.person.firstName()}`,
    jobTitle: faker.helpers.arrayElement([
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

const dataStructureFactory = new Factory(() => ({
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
