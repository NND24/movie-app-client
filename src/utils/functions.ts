export const removePTags = (str: string) => {
  if (str?.includes("<p>")) {
    return str.replace(/<\/?p>/g, "");
  }
  return str;
};
