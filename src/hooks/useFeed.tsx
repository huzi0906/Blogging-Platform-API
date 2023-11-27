import { UseQueryResult, useQuery } from "@tanstack/react-query";

import APIClient from "../services/apiClient";
import { Blog } from "../types";

const apiClient = new APIClient("users/:id/feed");

const useFeed = (): UseQueryResult<Blog[], Error> => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const response = await apiClient.getRequest();
      return response.data;
    },
  });
};

export default useFeed;

//   params: {
//     genres: gameQuery.genreId,
//     parent_platforms: gameQuery.platformId,
//     ordering: gameQuery.sortOrder,
//     search: gameQuery.searchText,
//     page: pageParam,
//   },
