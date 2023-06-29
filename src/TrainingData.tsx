import {
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface IData {
  date: Date;
  km: number;
}

export function TrainingData() {
  const [date, setDate] = useState<Date>(
    new Date(new Date().toISOString().split("T")[0])
  );
  const [km, setKm] = useState<number>(0);
  const [tableData, setTableData] = useState<IData[]>([]);
  const [edit, setEdit] = useState<boolean>(false);

  const buttonColor = edit ? "error" : "primary";

  const sortTableDate = tableData.sort((a, b) =>
    a.date.valueOf() < b.date.valueOf() ? 1 : -1
  );

  return (
    <Card>
      <CardContent>
        <Container maxWidth="sm">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              id="date"
              value={date.toISOString().split("T")[0]}
              type="date"
              label="Дата"
              variant="outlined"
              onChange={(e) => {
                setEdit(false);
                setDate(new Date(e.target.value));
              }}
              sx={{ m: 2 }}
            />
            <TextField
              id="km"
              type="number"
              value={km}
              label="Процдено км"
              variant="outlined"
              onChange={(e) => setKm(Number(e.target.value))}
              sx={{ m: 2 }}
            />

            <Button
              variant="outlined"
              sx={{ m: 2 }}
              size="large"
              color={buttonColor}
              onClick={() => {
                if (edit) {
                  setTableData(
                    tableData.map((table) =>
                      table.date.valueOf() === date.valueOf()
                        ? { ...table, km: km }
                        : { ...table }
                    )
                  );
                  setEdit(false);
                } else {
                  const find = tableData.some(
                    (element) => element.date.valueOf() === date.valueOf()
                  );

                  !find
                    ? setTableData((oldDate) => [
                        ...oldDate,
                        { date: date, km: km },
                      ])
                    : setTableData(
                        tableData.map((table) =>
                          table.date.valueOf() === date.valueOf()
                            ? { ...table, km: table.km + km }
                            : { ...table }
                        )
                      );
                }
              }}
            >
              Ok
            </Button>
          </div>
        </Container>
      </CardContent>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell align="right">Пройдено км</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortTableDate.map((row: IData, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date.toDateString()}
                </TableCell>
                <TableCell align="right">{row.km}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setDate(row.date);
                      setKm(row.km);
                      setEdit(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() =>
                      setTableData(
                        tableData.filter(
                          (element) =>
                            element.date.valueOf() !== row.date.valueOf()
                        )
                      )
                    }
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
