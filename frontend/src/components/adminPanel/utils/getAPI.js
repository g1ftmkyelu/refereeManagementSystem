import axios from "axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getToken } from "./helperFunctions";

const getAuthToken = () => {
  const token = getToken(); // Implement getToken function as needed
  return `Bearer ${token}`;
};

export const useFetchAllResources = (rname, rbase) => {
  return useQuery([rname], async () => {
    const headers = {
      Authorization: getAuthToken(),
    };
    const response = await axios.get(rbase, { headers });
    const data = response.data;
    return data;
  });
};

export const useFetchFilteredResources = (rname, rbase, field, value) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery([rname], async () => {
    const headers = {
      Authorization: getAuthToken(),
    };
    const response = await axios.get(rbase, { headers });
    const data = response.data;

    // Client-side filtering
    const filteredData = filterDataByField(data, field, value);

    return filteredData;
  }, {
    onSuccess: (data) => {
      // Cache the filtered data separately to avoid refetching when filtering
      queryClient.setQueryData([rname, field, value], data);
    },
  });

  return { data, isLoading, isError, refetch };
};

// Helper function to filter data on the client side
const filterDataByField = (data, field, value) => {
  if (!field || !value) {
    return data;
  }

  return data.filter(item => item[field] === value);
};

export const useThrowBack = (value) => {
  return value;
};

export const useFetchResourceById = (rname, rbase) => {
  return useQuery([rname], async ({ queryKey }) => {
    const [, id] = queryKey;
    const { data } = await axios.get(`${rbase}/${id}`);
    return data;
  });
};

export const useCreateResource = (rname, rbase) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newResource) => {
      const headers = {
        Authorization: getAuthToken(),
      };
      const { data } = await axios.post(rbase, newResource, { headers });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(rname);
      },
    }
  );
};

export const useUpdateResource = (rname, rbase) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (updatedResource) => {
      const headers = {
        Authorization: getAuthToken(),
      };

      // Use either 'id' or '_id' based on availability
      const resourceId = updatedResource.id || updatedResource._id;

      const { data } = await axios.put(
        `${rbase}/${resourceId}`,
        updatedResource,
        { headers }
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(rname);
      },
    }
  );
};


export const usePatchResource = (rname, rbase) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (patchedResource) => {
      const headers = {
        Authorization: getAuthToken(),
      };
      const { data } = await axios.patch(
        `${rbase}/${patchedResource.id}`,
        patchedResource,
        { headers }
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(rname);
      },
    }
  );
};

export const useDeleteResource = (rname, rbase) => {
  const queryClient = useQueryClient();

  return useMutation(
    async (resourceId) => {
      const headers = {
        Authorization: getAuthToken(),
      };
      await axios.delete(`${rbase}/${resourceId}`, { headers });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(rname);
      },
    }
  );
};


export const useGetResourceCount = (resourceName, resourceBase) => {
  return useQuery([`${resourceName}_count`], async () => {
    const headers = {
      Authorization: getAuthToken(),
    };
    const response = await axios.get(`${resourceBase}`, { headers });
    return response.data.count; 
  });
};