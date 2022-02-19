export type IPaginationApi =
{
    currentPage: number;
    currentUrl: string;
    firstUrl: string;
    from: number;
    lastPage: number;
    lastUrl: string;
    limit: number;
    nextUrl: string;
    offset: number;
    path: string;
    perPage: number;
    prevUrl: number | null;
    to: number;
    total: number;
};
