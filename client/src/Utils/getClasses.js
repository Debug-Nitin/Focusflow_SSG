export const getClasses = (classes) => {
  return classes
    .filter((item) => item !== "")
    .join(" ") //if classes are not null join them with a space
    .trim();
};
