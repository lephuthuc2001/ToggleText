export const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

export const isOlderThan18 = (value) => {
  const { day, month, year } = value;

  // Convert day, month, and year to integers
  const dayInt = parseInt(day, 10);
  const monthInt = parseInt(month, 10);
  const yearInt = parseInt(year, 10);

  if (!dayInt || !monthInt || !yearInt) {
    return true; // Skip validation if any of the fields are missing or invalid
  }

  const today = new Date();
  const birthDate = new Date(yearInt, monthInt - 1, dayInt); // month is 0-indexed
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 18;
};

export function isSkillDetail(str) {
  const regex = /^skills\[\d+\]\.(level|name)$/;
  const match = regex.exec(str);
  if (match) {
    return {
      isMatch: true,
      isName: match[1] === "name",
      isLevel: match[1] === "level",
    };
  }
  return {
    isMatch: false,
    isName: false,
    isLevel: false,
  };
}

export function getLastPartOfString(str) {
  const parts = str.split(".");
  return parts[parts.length - 1];
}

export function getDateRangeForDateOfBirthInput() {
  const today = new Date();

  const dayRange = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
  const monthRange = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const yearRange = Array.from({ length: 100 }, (_, i) =>
    (today.getFullYear() - 70 + i).toString()
  );

  return { dayRange, monthRange, yearRange };
}
