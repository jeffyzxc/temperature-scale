export function objToQueryParams(obj: any): string {
  let query = '';

  let isFirstParam = true;
  for (const [key, value] of Object.entries(obj)) {
    if((value !== null || value !== undefined) && key) {
      if(isFirstParam) {
        query += `${key}=${value}`;
        isFirstParam = false;
      }
      else {
        query += `&${key}=${value}`;
      }
    }
  }

  return query;
}