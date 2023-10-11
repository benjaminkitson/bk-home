/**
 * Combine the TW classes of both a child and parent component into one className string
 * This doesn't necessarily work quite as expected, as the order of the classNames doesn't matter
 */
export const appendClasses = (childClasses: string, parentClasses?: string) => {
  const toAppend = parentClasses ? " " + parentClasses : "";
  return childClasses + toAppend;
};

// TODO: make some fancy helper to do this properly
