/**
 * An object used to get page information from the server
 */
export class Page {
  // The number of elements in the page
  pageSize = 0;
  // The total number of elements
  totalRowCount = 0;
  // The total number of pages
  totalPages = 0;
  // The current page number
  pageNumber = 0;
  /**
   *  Sorting information {column prop, sorting dir}
   *  sorting dir: asc/desc
   */
  sorts: any;
}
