import { input, schemaArray } from "./mockData/inputData";
import { getRandomBool, repeatX } from "./utilities/getRandomInt";
var randomstring = require("randomstring");

// console.log(input)
function converter(inputData: any, typesHelper: any[] = []) {
  const input = JSON.parse(inputData);
  //check the value
  // compare with existing types in typescript
  // create new value acc to this type
  // create a new object with this
  const output: any = {};
  for (const [key, value] of Object.entries(input)) {
    let mockValue: any = undefined;
    if (typeof value === "string" && value.includes("number")) {
      if (value.includes("[]")) {
        mockValue = repeatX(() => Math.round(Math.random() * 100), 5);
      } else {
        mockValue = repeatX(() => Math.round(Math.random() * 100), 1)[0];
      }
    } else if (typeof value === "string" && value.includes("string")) {
      if (value.includes("[]")) {
        mockValue = repeatX(
          () =>
            randomstring.generate({ readable: true, charset: "alphabetic" }),
          5
        );
      } else {
        mockValue = repeatX(
          () =>
            randomstring.generate({ readable: true, charset: "alphabetic" }),
          1
        )[0];
      }
    } else if (typeof value === "string" && value.includes("boolean")) {
      if (value.includes("[]")) {
        mockValue = repeatX(getRandomBool, 5);
      } else {
        mockValue = repeatX(getRandomBool, 1)[0];
      }
    } else if (typeof value === "object") {
      mockValue = converter(JSON.stringify(value), typesHelper);
    } else if (typeof value === "string") {
      const typesHelperObjArr = typesHelper.map((obj: any) => JSON.parse(obj));
      const searchValue = value.includes("[]") ? value.slice(0, -2) : value;
      const index = typesHelperObjArr.findIndex(
        (obj) => value.slice(0, -2) in obj
      );
      if (index !== -1) {
        if (value.includes("[]")) {
          mockValue = repeatX(
            () =>
              converter(
                JSON.stringify(typesHelperObjArr[index][searchValue]),
                typesHelper
              ),
            4
          );
        } else
          mockValue = repeatX(
            () =>
              converter(
                JSON.stringify(typesHelperObjArr[index][searchValue]),
                typesHelper
              ),
            1
          )[0];
      } else {
        //Consider string literal
        mockValue = value;
      }
    }
    output[key] = mockValue;
  }
  return output;
}
let final = converter(input, schemaArray);
console.log(final);
console.log("JSON", JSON.stringify(final, null, 2));
