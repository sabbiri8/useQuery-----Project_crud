// hooks/useCrudQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useCallback } from "react";

export const useCrudQuery = ({
  queryKey,
  fetchFn,
  createFn,
  updateFn,
  deleteFn,
  getOptimisticData,
  getOptimisticUpdateData,
  getOptimisticDeleteData,
}) => {
  const queryClient = useQueryClient();

  // 🔹 READ
  const query = useQuery({
    queryKey,
    queryFn: fetchFn,
  });

  // 🔹 CREATE
  const createMutation = useMutation({
    mutationFn: createFn,
    onMutate: async (newData) => {
      await queryClient.cancelQueries(queryKey);
      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) =>
        getOptimisticData?.(old, newData)
      );

      return { prevData };
    },
    onError: (_e, _v, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(queryKey, context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  // 🔹 UPDATE
  const updateMutation = useMutation({
    mutationFn: updateFn,
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries(queryKey);
      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) =>
        getOptimisticUpdateData?.(old, updatedData)
      );

      return { prevData };
    },
    onError: (_e, _v, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(queryKey, context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  // 🔹 DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onMutate: async (deletedData) => {
      await queryClient.cancelQueries(queryKey);
      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old) =>
        getOptimisticDeleteData?.(old, deletedData)
      );

      return { prevData };
    },
    onError: (_e, _v, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(queryKey, context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  return {
    query,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
