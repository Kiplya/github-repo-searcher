import { FC, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { useLazySearchRepositoriesQuery } from "../../api";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setOrder, setPage, setPerPage, setSort } from "../../store";

import styles from "../../styles/Main/main.module.css";

const formateDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

export const RepoTable: FC = () => {
  const data = useAppSelector((state) => state.searchReducer.data);
  const [trigger] = useLazySearchRepositoriesQuery();
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector((state) => state.searchReducer.query);
  const currentPage = useAppSelector((state) => state.searchReducer.page);
  const rowsPerPage = useAppSelector((state) => state.searchReducer.perPage);
  const sortBy = useAppSelector((state) => state.searchReducer.sort);
  const orderBy = useAppSelector((state) => state.searchReducer.order);

  const handleSortBy = useCallback(
    (newSortBy: string) => {
      const isAsc = sortBy === newSortBy && orderBy === "asc";
      dispatch(setOrder(isAsc ? "desc" : "asc"));
      dispatch(setSort(newSortBy));

      dispatch(setPage(1));
      trigger({
        q: searchQuery,
        sort: newSortBy,
        per_page: rowsPerPage,
        order: isAsc ? "desc" : "asc",
      });
    },
    [orderBy, sortBy, dispatch, trigger]
  );

  return (
    <div className={styles.container}>
      <div className={styles.table_container}>
        <h1>Результаты поиска</h1>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === "name"}
                  direction={sortBy === "name" ? orderBy : "asc"}
                  onClick={() => {
                    handleSortBy("name");
                  }}
                >
                  Название
                </TableSortLabel>
              </TableCell>

              <TableCell>Язык</TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortBy === "forks"}
                  direction={sortBy === "forks" ? orderBy : "asc"}
                  onClick={() => {
                    handleSortBy("forks");
                  }}
                >
                  Число форков
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortBy === "stars"}
                  direction={sortBy === "stars" ? orderBy : "asc"}
                  onClick={() => {
                    handleSortBy("stars");
                  }}
                >
                  Число звезд
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortBy === "updated"}
                  direction={sortBy === "updated" ? orderBy : "asc"}
                  onClick={() => {
                    handleSortBy("updated");
                  }}
                >
                  Дата обновления
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.items.map((rep, index) => (
              <TableRow key={index}>
                <TableCell>{rep.name}</TableCell>
                <TableCell>{rep.language || "Мультиязычный"}</TableCell>
                <TableCell>{rep.forks_count}</TableCell>
                <TableCell>{rep.stargazers_count}</TableCell>
                <TableCell>{formateDate(rep.updated_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={data ? Math.ceil(data.total_count / rowsPerPage) : 0}
          page={currentPage - 1}
          onPageChange={(_, newPage) => {
            dispatch(setPage(newPage + 1));
            trigger({
              q: searchQuery,
              page: newPage + 1,
              per_page: rowsPerPage,
              sort: sortBy,
              order: orderBy,
            });
          }}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            const perPage = parseInt(e.target.value);
            dispatch(setPerPage(perPage));
            dispatch(setPage(1));
            trigger({
              q: searchQuery,
              per_page: perPage,
              sort: sortBy,
              order: orderBy,
            });
          }}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>

      <div className={styles.info_container}></div>
    </div>
  );
};
