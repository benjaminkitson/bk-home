/**
 * Combine the TW classes of both a child and parent component into one className string
 */
export const appendClasses = (childClasses: string, parentClasses?: string) => {
  const toAppend = parentClasses ? " " + parentClasses : "";
  return childClasses + toAppend;
};
