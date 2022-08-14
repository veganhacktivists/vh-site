export const firstLetterUppercase: (str: string) => string = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const toBaseUrl: (url: string) => string = (url) => {
  return url.split('/')[0];
};

// https://gist.github.com/andrei-m/982927
export const getLevenshteinDistance = (a: string, b: string): number => {
  if (a.length == 0) return b.length;
  if (b.length == 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }

  return matrix[b.length][a.length];
};
