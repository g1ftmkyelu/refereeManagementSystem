import { useFetchAllResources } from "./getAPI"
// getDataCount function
export const getDataCount = async (payload) => {
  const { path, dataSource } = payload;
  const { data, isLoading, error } = await useFetchAllResources(
    path,
    dataSource
  );
  console.log('Data in getDataCount:', data)
  if (data) {
    return { count: data.length, isLoading, error };
  }

  // Check if data is an empty array
  if (Array.isArray(data) && data.length === 0) {
    return { count: 0, isLoading, error };
  }

  return { count: "No data available" };
};

// getDataByTimeRange function
export const getDataByTimeRange = async (payload) => {
  const { path, dataSource, startTime, endTime } = payload;
  const { data, isLoading, error } = await useFetchAllResources(
    path,
    dataSource
  );
  console.log('Data in getDataByTimeRange:', data)
  if (data) {
    // Filter data based on the specified time frame
    const filteredData = data.filter(item => {
      const createdAtTimestamp = new Date(item.createdAt).getTime();
      return createdAtTimestamp >= startTime && createdAtTimestamp <= endTime;
    });

    return {
      count: filteredData.length,
      filteredData,
      isLoading,
      error
    };
  }

  return { count: 0, filteredData: [], isLoading, error };
};

// getDataByField function
export const getDataByField = async (payload) => {
  const { path, dataSource, field, value } = payload;
  const { data, isLoading, error } = await useFetchAllResources(
    path,
    dataSource
  );
  console.log('Data in getDataByField:', data)
  // Function to filter data based on a specific field and value
  const filterDataByField = (items, fieldName, filterValue) => {
    return items.filter((item) => {
      // Check if the field exists in the item
      if (item.hasOwnProperty(fieldName)) {
        return item[fieldName] === filterValue;
      }
      return false;
    });
  };

  // Check if data is available
  if (data) {
    // Filter data based on the specified field and value
    const filteredData = filterDataByField(data, field, value);

    // Return result in object format with count
    return {
      count: filteredData.length,
      data: filteredData,
      isLoading,
      error,
      refetch: () => {} // Add a dummy refetch function if needed
    };
  }

  // Return a default response if none of the conditions are met
  return { message: "No data available" };
};
