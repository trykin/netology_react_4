import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { ConvertHexToRgb } from "./ConvertHexToRgb";
import { TrainingData } from "./TrainingData";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Convert HEX to RGB" />
          <Tab label="Данные о тренировках" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ConvertHexToRgb />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TrainingData />
      </TabPanel>
    </Box>
  );
}
