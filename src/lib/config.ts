export const formConfig = {
  caste: [
    { value: "Brahmin", label: "Brahmin 🤓", percentage: 0.3 }, // 30% impact
    { value: "Kshatriya", label: "Kshatriya ⚔️", percentage: 0.25 }, // 25% impact
    { value: "Bhumihar", label: "Bhumihar 🏞️", percentage: 0.2 }, // 20% impact
    { value: "Yadav", label: "Yadav 🐄", percentage: 0.15 }, // 15% impact
    { value: "General", label: "General 👀", percentage: 0.1 }, // 10% impact
    { value: "Odiya", label: "Odiya 🌾", percentage: 0.1 }, // 10% impact
    { value: "SC/ST", label: "SC/ST ✊", percentage: -0.3 }, // Negative impact
  ] as const,
  education: [
    { value: "PhD", label: "PhD 🧑‍🏫", percentage: 0.5 }, // 50% impact
    { value: "Masters", label: "Masters 🎓", percentage: 0.4 }, // 40% impact
    { value: "Bachelors", label: "Bachelors 🍻", percentage: 0.3 }, // 30% impact
    { value: "12th Pass", label: "12th Pass 🧑‍🏫", percentage: 0.1 }, // 10% impact
  ] as const,
  skinTone: [
    { value: "Fair", label: "Fair 🌝", percentage: 0.2 }, // 20% impact
    { value: "Medium", label: "Medium 🧑‍🦳", percentage: 0.15 }, // 15% impact
    { value: "Dark", label: "Dark 🌚", percentage: 0.1 }, // 10% impact
  ] as const,
  bodyCount: [
    { value: "0", label: "0 📈", percentage: 0.05 }, // Small positive impact
    { value: "1", label: "1 💸", percentage: -0.1 }, // Negative impact
    { value: "2", label: "2 🤫", percentage: -0.15 }, // More negative impact
    { value: "2+", label: "2+ 🚩", percentage: -0.25 }, // Even more negative impact
  ] as const,
  cooking: [
    { value: "Yes", label: "Yes 🍳", percentage: 0.2 }, // 20% impact
    { value: "No", label: "No 🚫", percentage: -0.1 }, // Negative impact
  ] as const,
  job: [
    { value: "Government", label: "Government 🏛️", percentage: 0.4 }, // 40% impact
    { value: "Business", label: "Business 💼", percentage: 0.3 }, // 30% impact
    { value: "Private", label: "Private 🏢", percentage: 0.2 }, // 20% impact
    { value: "Other", label: "Other 🧐", percentage: 0.1 }, // 10% impact
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

export const siteConfig = {
  name: "Dahej Calculator",
  description:
    "Calculate dahej expectations based on various factors such as age, caste, education, skin tone, and more.",
  url: "https://dahej-calculator-phi.vercel.app",
  ogImage: "https://dahej-calculator-phi.vercel.app/opengraph-image.png",
  links: {
    github: "https://github.com/viruop/dahej-calculator",
  },
  keywords: [
    "dowry calculator",
    "dahej",
    "marriage dowry",
    "calculator",
    "dahej prediction",
    "traditional dowry",
    "marriage expectations",
  ],
};
