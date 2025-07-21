import { FC, useCallback, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Link,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { useLazySearchRepositoriesQuery } from "../../api";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setOrder, setPage, setPerPage, setSort } from "../../store";

const formateDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

interface Props {
  styles: { [key: string]: string };
}

export const RepoTable: FC<Props> = ({ styles }) => {
  const data = useAppSelector((state) => state.searchReducer.data);
  const [trigger] = useLazySearchRepositoriesQuery();
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector((state) => state.searchReducer.query);
  const currentPage = useAppSelector((state) => state.searchReducer.page);
  const rowsPerPage = useAppSelector((state) => state.searchReducer.perPage);
  const sortBy = useAppSelector((state) => state.searchReducer.sort);
  const orderBy = useAppSelector((state) => state.searchReducer.order);

  const [selectedRep, setSelectedRep] = useState<
    NonNullable<typeof data>["items"][number] | null
  >(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

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

  const toggleVisibility = useCallback(() => {
    if (infoRef.current && tableRef.current) {
      infoRef.current.classList.toggle(styles.visible);
      tableRef.current.classList.toggle(styles.hidden);
    }
  }, []);

  return (
    <div className={styles.container}>
      <div ref={tableRef} className={styles.table_container}>
        <Typography variant="h4">Результаты поиска</Typography>

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
            {data?.items.map((rep) => (
              <TableRow
                onClick={() => {
                  toggleVisibility();
                  setSelectedRep(rep);
                }}
                selected={selectedRep?.full_name === rep.full_name}
                key={rep.full_name}
              >
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

      <Card ref={infoRef} className={styles.info_container}>
        <CardContent>
          {!selectedRep && (
            <Typography className={styles.centredMessage}>
              Выберите репозиторий
            </Typography>
          )}

          {selectedRep && (
            <>
              <Typography
                onClick={() => {
                  toggleVisibility();
                  setSelectedRep(null);
                }}
                className={styles.backButton}
              >
                &#10006;
              </Typography>

              <Link
                href={`https://github.com/${selectedRep.full_name}`}
                underline="hover"
                target="_blank"
                rel="noopener"
                color="black"
              >
                <Typography variant="h4">{selectedRep.name}</Typography>
              </Link>

              <Box className={styles.language_container}>
                <Chip
                  label={selectedRep.language || "Мультиязычный"}
                  color="primary"
                />

                <Box>
                  <StarIcon />
                  <Typography>{selectedRep.stargazers_count}</Typography>
                </Box>
              </Box>

              {selectedRep.topics.length > 0 && (
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap="1rem"
                  marginBottom="1rem"
                >
                  {selectedRep.topics.map((topic) => (
                    <Chip label={topic} />
                  ))}
                </Box>
              )}

              <Typography>
                {selectedRep.license?.name || "Нет лицензии"}
              </Typography>

              <Typography>
                {selectedRep.description || "Нет описания"}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
