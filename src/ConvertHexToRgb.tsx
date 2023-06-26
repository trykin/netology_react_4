import {
  Box,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export function ConvertHexToRgb() {
  const [hex, setHex] = useState<string>("#000000");
  const [error, setError] = useState<boolean>(false);
  const [currentCollor, setCurrentCollor] = useState<string>("#000000");
  const [rgb, setRgb] = useState<string>("");
  const errorColor = error ? "error" : "success";

  useEffect(() => {
    if (!isValidHexaCode(hex)) {
      setError(true);
    } else {
      setError(false);
      setCurrentCollor(hex);
      setRgb(hexToRgb(hex));
    }

    function isValidHexaCode(hex: string) {
      if (hex[0] != "#") return false;

      if (!(hex.length == 4 || hex.length == 7)) return false;

      for (let i = 1; i < hex.length; i++)
        if (
          !(
            (hex[i].charCodeAt(0) <= "0".charCodeAt(0) &&
              hex[i].charCodeAt(0) <= 9) ||
            (hex[i].charCodeAt(0) >= "a".charCodeAt(0) &&
              hex[i].charCodeAt(0) <= "f".charCodeAt(0)) ||
            hex[i].charCodeAt(0) >= "A".charCodeAt(0) ||
            hex[i].charCodeAt(0) <= "F".charCodeAt(0)
          )
        ) {
          return false;
        }

      return true;
    }

    function hexToRgb(hex: string) {
      const rgb = parseInt(hex.substring(1, hex.length), 16);

      const r = (rgb >> 16) & 255;
      const g = (rgb >> 8) & 255;
      const b = rgb & 255;

      return `rgb(${r}, ${g}, ${b})`;
    }
  }, [hex]);

  return (
    <Card style={{ backgroundColor: `${currentCollor}` }}>
      <CardContent>
        <Container maxWidth="sm">
          <Box
            sx={{ p: 2 }}
            style={{ backgroundColor: "white" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <TextField
                id="HEX"
                label="HEX"
                variant="outlined"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                color={errorColor}
              />
              {error ? (
                <ErrorIcon sx={{ p: 1 }} color="error" />
              ) : (
                <CheckCircleOutlineIcon sx={{ p: 1 }} color="success" />
              )}
            </Box>
          </Box>
          <Box
            sx={{ p: 2 }}
            style={{ backgroundColor: "lightgray" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <TextField
              id="RGB"
              value={rgb}
              label="RGB"
              variant="outlined"
              disabled
            />
          </Box>
        </Container>
      </CardContent>
    </Card>
  );
}
