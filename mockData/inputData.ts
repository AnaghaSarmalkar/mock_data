export const input = JSON.stringify({
  PersonalDetails: {
    age: "number",
    name: "string",
    isAdult: "boolean",
    address: "Address",
    bank: "Bank",
    friends: "string[]",
    pets: "Pet[]",
  },
});

const input2 = JSON.stringify({
  Address: {
    city: "string",
    country: "string",
  },
});

const input3 = JSON.stringify({
  Bank: {
    name: "string",
    bankAddress: "Address",
  },
});

const input4 = JSON.stringify({
  Pet: {
    name: "string",
    species: "Cat",
  },
});

export const schemaArray: any[] = [input2, input3, input4];
