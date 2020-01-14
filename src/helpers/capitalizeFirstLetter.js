import { isEmpty } from "lodash";

export default function capitalizeFirstLetter(string) {
  if (!isEmpty(string)) {
    return string[0].toUpperCase() + string.slice(1);
  }
}
