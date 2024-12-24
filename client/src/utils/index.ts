export const formatSalary = (salary: number) => {
  if (salary >= 1000) {
    return `$${(salary / 1000).toFixed(0)}k`;
  }
  return `$${salary}`;
};
