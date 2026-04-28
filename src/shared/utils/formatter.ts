export const formatDateTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleString();
};