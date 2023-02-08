export function useTextValidation({
  formInput,
  maxLength,
  minLength,
  regEx,
  displayText,
  required,
  negateRegEx,
  regExDisplay,
}) {
  const validations = {
    requiredField: [required && !formInput.trim(), " "], // .tim() elimina espacios
    maxLength: [
      maxLength && formInput.length > maxLength,
      `${displayText} no puede ser mayor a ${maxLength} caracteres`,
    ],
    minLength: [
      minLength && formInput.length < minLength,
      `${displayText} no puede ser menor a ${minLength} caracteres`,
    ],
    regularExpression: [
      formInput &&
        regEx &&
        (negateRegEx ? !regEx.test(formInput) : regEx.test(formInput)),
      regExDisplay,
    ],
  };
  const error = Object.values(validations).map((validation) => {
    if (validation[0]) {
      // validation = [required && !formInput, " "]
      return validation[1];
    }
    return null;
  });
  const filterErrors = error.filter((e) => e);
  return filterErrors.length ? filterErrors[0] : null;
}

//////////////////////////////////////

/* const [input, setInput] = useState({
  name: "",
  image: "",
  rating: "",
  description_raw: "",
  released: "",
  platforms: [],
  genres: [],
}); */
