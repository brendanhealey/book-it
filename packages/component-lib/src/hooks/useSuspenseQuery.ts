import { useMemo } from "react";

import {
  OperationVariables,
  DocumentNode,
  TypedDocumentNode,
  QueryHookOptions,
  QueryResult,
  useQuery,
} from "@apollo/client";

/**
 * copied from https://github.com/apollographql/apollo-client/issues/9627
 * author: James Friedman
 *
 * This is a drop in replacement for Apollo's useQuery hook that works directly
 * with React.Suspense and has the improved ergonomics of `data` being non-nullable.
 *
 * function Example() {
 *  <React.Suspense fallback={'My Fallback'}>
 *   <MyComponent />
 *  </React.Suspense>
 * }
 *
 * function MyComponent() {
 *  const { data } = useSuspenseQuery(MyQuery);
 *  return <>{data.someValue}</>
 * }
 *
 */
export const useSuspenseQuery = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TData extends any = any,
  TVariables extends OperationVariables = OperationVariables
>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: QueryHookOptions<TData, TVariables> = {}
): Omit<QueryResult<TData, TVariables>, "data"> & {
  data: NonNullable<QueryResult<TData, TVariables>["data"]>;
} => {
  const { data, loading, error, observable, ...rest } = useQuery(
    query,
    options
  );

  const errorPolicy = options.errorPolicy || "none";

  const promise = useMemo(() => {
    return new Promise((resolve) => {
      const resolver = () => {
        resolve(true);
        subscription.unsubscribe();
      };
      const subscription = observable.subscribe(({ data, loading }) => {
        data && !loading && resolver();
      });
    });
  }, [observable]);

  const proxy = useMemo(
    () =>
      new Proxy((data || {}) as object, {
        get: (target, prop) => {
          if (!Object.keys(target).length && loading) {
            throw promise;
          } else if (errorPolicy === "none" && error) {
            throw error;
          }
          return target[prop as keyof typeof target];
        },
      }) as NonNullable<TData>,
    [data, loading, error, errorPolicy, promise]
  );

  return { data: proxy, loading, error, observable, ...rest };
};
