import { Waypoint } from 'react-waypoint'

import { Spinner } from '~/components'

/**
 *  Usage:
 * ```jsx
 *   <InfiniteScroll
 *     hasNextPage={pageInfo.hasNextPage}
 *     loadMore={loadMore}
 *     loading={loading}
 *     Loader={
 *         <Spinner />
 *     }
 *   >
 *     {logbooks.map(lb => (
 *         <LogbookCard
 *             title={lb.title}
 *              forkCount={lb.forkCount}
 *              ....
 *         />
 *     ))}
 * </InfiniteScroll>
 * ```
 */

interface Props {
  /**
   * Does the resource have more entities
   */
  hasNextPage: boolean;

  /**
   * Callback to load more entities
   */
  loadMore: () => Promise<any>
  // loadMore: () => any;

  /**
   * A React component to act as loader
   */
  loader?: React.ReactNode;
}

export const InfiniteScroll: React.FC<Props> = ({
  hasNextPage,
  loader = <Spinner />,
  loadMore,
  children,
}) => {
  return (
    <>
      {children}
      {hasNextPage && <Waypoint onEnter={loadMore} />}
      {hasNextPage && loader}
    </>
  )
}
