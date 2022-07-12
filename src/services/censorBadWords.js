import Filter from "bad-words";

const replaceRegex = /(?<=.).+(?=.)/;
const placeHolder = (str) => "*".repeat(str.length);

const badWordsFilter = new Filter({ replaceRegex, placeHolder });

const censorBadWords = (val) => {
  console.time("timer");
  console.log(val);
  const toFilter = JSON.stringify(val);
  const censored = badWordsFilter.clean(toFilter);
  console.timeEnd("timer");
  return JSON.parse(censored);
};

export { badWordsFilter };
export default censorBadWords;
