// @flow
const a = {
  Ё: "yo",
  Й: "i",
  Ц: "ts",
  У: "u",
  К: "k",
  Е: "e",
  Н: "n",
  Г: "g",
  Ш: "sh",
  Щ: "sch",
  З: "z",
  Х: "h",
  Ъ: "",
  ё: "yo",
  й: "i",
  ц: "ts",
  у: "u",
  к: "k",
  е: "e",
  н: "n",
  г: "g",
  ш: "sh",
  щ: "sch",
  з: "z",
  х: "h",
  ъ: "",
  Ф: "f",
  Ы: "i",
  В: "v",
  А: "a",
  П: "p",
  Р: "r",
  О: "o",
  Л: "l",
  Д: "d",
  Ж: "zh",
  Э: "e",
  ф: "f",
  ы: "i",
  в: "v",
  а: "a",
  п: "p",
  р: "r",
  о: "o",
  л: "l",
  д: "d",
  ж: "zh",
  э: "e",
  Я: "ya",
  Ч: "ch",
  С: "s",
  М: "m",
  И: "i",
  Т: "t",
  Ь: "",
  Б: "b",
  Ю: "yu",
  я: "ya",
  ч: "ch",
  с: "s",
  м: "m",
  и: "i",
  т: "t",
  ь: "",
  б: "b",
  ю: "yu",
  " ": "-"
};

export default function transliterate(word: string): string {
  return (word || "")
    .split("")
    .map(char => {
      if (char === "ь") {
        return "";
      }
      if (char === "Ь") {
        return "";
      }
      if (char === "ъ") {
        return "";
      }
      if (char === "Ъ") {
        return "";
      }
      return a[char] || char;
    })
    .join("");
}
