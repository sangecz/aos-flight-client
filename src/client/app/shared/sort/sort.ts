/**
 * Created by sange on 29/10/2016.
 */

export interface Sort {
  order: string;
  field: string;
}

/**
 * Order:
 * 0 == no sort
 * 1 == asc
 * 2 == desc
 */
export type SortOrder = 0 | 1 | 2

