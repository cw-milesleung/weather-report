const encryptedAPIKey = () => {
  const str = "BF8DC5352E01D6C08148G64BD3E0C47D";
  const rotNum = 1;
  const originalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let newOGArray = originalAlphabet.split("");
  let LettersBeforeIndexArray = [];

  for (let i = 0; i < newOGArray.length; i++) {
    const lettersBeforeIndex = (i - rotNum + 26) % 26;
    LettersBeforeIndexArray.push(newOGArray[lettersBeforeIndex]);
  }

  const rot13Object = {};
  newOGArray.forEach((key, index) => {
    rot13Object[key] = LettersBeforeIndexArray[index];
  });

  const translatedString = str
    .split("")
    .map((value) => (value ? rot13Object[value] || value : value))
    .join("")
    .toLowerCase();

  return translatedString;
};

export default encryptedAPIKey;
