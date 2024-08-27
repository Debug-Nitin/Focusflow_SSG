export const getCompletedTodos = async () => {
  const response = await fetch("http://localhost:8080/api/complete");
  const data = await response.json();
  if (data.message === "no user exists" || data.status === 400) {
    return [];
  }

  return data;
};
