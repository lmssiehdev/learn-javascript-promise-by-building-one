/**
  Retrieves the error message from an error object or any other value.
  
  @param error - The error object.
  @returns The error message.
*/
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export function getChallengeUrl({
  paths,
  startCommand,
}: {
  paths: string[];
  startCommand: string;
}): string {
  const params = new URLSearchParams();

  paths.forEach((path) => params.append("file", path));
  params.append("view", "editor");
  params.append("startScript", startCommand);

  const url = new URL(
    "https://stackblitz.com/github/lmssiehdev/learn-javascript-promise-by-building-one/tree/main/examples"
  );
  url.search = params.toString();

  return url.toString();
}
