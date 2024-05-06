import { faker } from "@faker-js/faker";

/**
 * Represents an employee record.
 *
 * @interface EmployeeRecord
 */
interface EmployeeRecord {
    "91": string;
    "4047": string;
    id: string;
    employeeStatusDate: string;
    employmentHistoryStatus: string;
    status: string;
    fullName2: string;
    jobTitle: string;
}

/**
 * Api data structure containing information about employee records.
 *
 * @interface FakeBambooApiResponse
 */
interface FakeBambooApiResponse {
    title: string;
    fields: { id: string | number; type: string; name: string }[];
    employees: EmployeeRecord[];
}

/**
 * Generates a random integer between the specified min and max values (both inclusive).
 *
 * @param {number} min - The bottom range limit.
 * @param {number} max - The upper range limit.
 * @returns {number} A random integer.
 */
const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generates a sequential date based on the last date and a maximum days to incrementation.
 *
 * @param {Date} lastDate - The last date in the sequence.
 * @param {number} maxDaysIncrement - The maximum day incrementation(default: 365).
 * @returns {Date} A new sequential date.
 */
const getSequentialDate = (
    lastDate: Date,
    maxDaysIncrement: number = 365
): Date => {
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
const generateEmployee = (
    isReported: boolean,
    employeeName: string,
    employeeId: string
): EmployeeRecord => {
    const commonFields = {
        id: employeeId,
        employeeStatusDate: faker.date.past().toISOString().split("T")[0],
        employmentHistoryStatus: faker.helpers.arrayElement([
            "Full Time Employee",
            "Part Time Employee",
            "Intern",
            "Terminated",
        ]),
        status: faker.helpers.arrayElement(["Active", "Inactive"]),
    };

    if (isReported) {
        return {
            ...commonFields,
            "91": employeeName,
            "4047": faker.date.past().toISOString().split("T")[0],
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
        };
    } else {
        return {
            ...commonFields,
            "91": faker.person.fullName(),
            "4047": faker.date.past().toISOString().split("T")[0],
            fullName2: employeeName,
            jobTitle: faker.person.jobTitle(),
        };
    }
};

/**
 * Generates an array of employee records representing the trajectory of an employee.
 *
 * @param {number} count - The number of employee records to generate.
 * @returns {EmployeeRecord[]} A representation of the trajectory of an employee.
 */
const generateEmployeeTrajectory = (count: number): EmployeeRecord[] => {
    const employeeTrayectory: EmployeeRecord[] = [];

    let employeeName: string = `${faker.person.lastName()}, ${faker.person.firstName()}`;
    let employeeId: string = faker.string.numeric(5);

    let isReported: boolean = false;
    const togglePoint: number = getRandomInt(0, count - 1);

    let lastGeneratedDate: Date = new Date(2019, 1, 1);

    for (let i = 0; i < count; i++) {
        if (i === togglePoint) {
            isReported = !isReported;
        }

        employeeTrayectory.push(
            generateEmployee(isReported, employeeName, employeeId)
        );

        lastGeneratedDate = getSequentialDate(lastGeneratedDate); // mutability check? fine?
    }

    return employeeTrayectory;
};

/**
 * Generates a fake response for similar to the Bamboo API.
 *
 * @param {number} trayectoryLength - The length of the employee trajectory.
 * @returns {FakeBambooApiResponse} A fake generated response.
 */
const generateFakeResponse = (
    trayectoryLength: number
): FakeBambooApiResponse => ({
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
const getNFakeResponses = (numberOfResponses: number): void => {
    const trayectoryLength: number = 10;
    for (let i = 0; i < numberOfResponses; i++) {
        console.log(generateFakeResponse(trayectoryLength));
    }
};

getNFakeResponses(2);
