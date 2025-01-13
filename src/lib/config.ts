// formConfig.ts
export const formConfig = {
  caste: [
    { value: "Brahmin", label: "Brahmin 🤓" },
    { value: "Kshatriya", label: "Kshatriya ⚔️" },
    { value: "Bhumihar", label: "Bhumihar 🏞️" },
    { value: "Yadav", label: "Yadav 🐄" },
    { value: "Odiya", label: "Odiya 🌾" },
    { value: "SC/ST", label: "SC/ST ✊" },
  ] as const,
  education: [
    { value: "PhD", label: "PhD 🧑‍🏫" },
    { value: "Masters", label: "Masters 🎓" },
    { value: "Bachelors", label: "Bachelors 🍻" },
    { value: "12th Pass", label: "12th Pass 🧑‍🏫" },
  ] as const,
  skinTone: [
    { value: "Fair", label: "Fair 🤍" },
    { value: "Medium", label: "Medium 🧑‍🦳" },
    { value: "Dark", label: "Dark 🖤" },
  ] as const,
  bodyCount: [
    { value: "0", label: "0 📈" },
    { value: "1", label: "1 💸" },
    { value: "2", label: "2 🤫" },
    { value: "3+", label: "2+ 🧨" },
  ] as const,
  cooking: [
    { value: "Yes", label: "Yes 🍳" },
    { value: "No", label: "No 🚫" },
  ] as const,
  job: [
    { value: "Government", label: "Government 🏛️" },
    { value: "Business", label: "Business 💼" },
    { value: "Private", label: "Private 🏢" },
    { value: "Other", label: "Other 🧐" },
  ] as const,
  formValues: [
    "name",
    "age",
    "height",
    "caste",
    "education",
    "skinTone",
    "bodyCount",
    "cooking",
    "income",
    "snapscore",
    "job",
  ] as const,
};
