export const getIncompleteTodos = async () => {
  const response = await fetch("http://localhost:8080/api/incomplete");
  const data = await response.json();
  if (data.message === "no user exists" || data.status === 400) {
    return [];
  }

  return data;
};
