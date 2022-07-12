import Filter from "bad-words";

const replaceRegex = /(?<=.).+(?=.)/;
const placeHolder = (str) => "*".repeat(str.length);

const badWordsFilter = new Filter({ replaceRegex, placeHolder });

const censorBadWords = (val) => {
  let censored = val;
  const containsEnglishWords = /\b/.test(val);

  if (containsEnglishWords) {
    console.log(val);
    console.time("timer");
    const toFilter = JSON.stringify(val);
    censored = JSON.parse(badWordsFilter.clean(toFilter));
    console.timeEnd("timer");
  }
  return censored;
};

export { badWordsFilter };
export default censorBadWords;
