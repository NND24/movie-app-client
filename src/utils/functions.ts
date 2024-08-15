export const removeHTMLTags = (str: string): string => {
  if (str?.includes("<p>") || str?.includes("<i>")) {
    return str.replace(/<\/?p>|<\/?i>/g, "");
  }
  return str;
};
