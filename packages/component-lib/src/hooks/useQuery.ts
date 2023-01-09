/**
 * copied from https://github.com/apollographql/apollo-client/issues/9627
 * author: Towelie Hrougier (heavily based on useSuspenseQuery by Brian Friedman)
 *
 * const { data, error } = useQuery(query, { suspense: true })
 */

import {
  DocumentNode,
  OperationVariables,
  QueryHookOptions as ApolloQueryHookOptions,
  QueryResult,
  TypedDocumentNode,
  useQuery as useApolloQuery,
} from "@apollo/client";
import { useMemo } from "react";

export type QueryHookOptions<TData = any, TVariables = OperationVariables> = {
  suspense?: boolean;
} & ApolloQueryHookOptions<TData, TVariables>;

export const useQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> =>
  useSuspenseQuery(useApolloQuery(query, options), options);
  
const useSuspenseQuery = <TData, TVariables>(
  { data, loading, error, observable, ...res }: QueryResult<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  const suspense = options?.suspense;
  const errorPolicy = options?.errorPolicy || "none";
  const promise = useMemo(
    () =>
      suspense &&
      new Promise((resolve) => {
        const resolver = () => {
          resolve(true);
          subscription.unsubscribe();
        };
        const subscription = observable.subscribe(({ data, loading }) => {
          if (data && !loading) resolver();
        });
      }),
    [observable, suspense]
  );
  const proxy = useMemo(
    () =>
      suspense &&
      new Proxy((data || {}) as any, {
        get: (target, prop) => {
          if (!Object.keys(target).length && loading) {
            throw promise;
          } else if (errorPolicy === "none" && error) {
            throw error;
          }
          return target[prop as keyof typeof target];
        },
      }),
    [data, error, errorPolicy, loading, promise, suspense]
  );
  return { data: suspense ? proxy : data, loading, error, observable, ...res };
};
