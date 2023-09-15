import { useState, useEffect } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Search } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Alert } from "@mui/material";

import "../Styles/Styles.css";

export const Date = () => {
  // Inicializar los campos de respsuesta vacios
  const [nasaData, setNasaData] = useState({
    title: "",
    date: "",
    imageUrl: "",
    explanation: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const queryNasa = async (e) => {
    e.preventDefault();

    const apiKey = "fmnQD3jZLLVekLaQz7V02OErAaB4K7O3m55kOsKY";
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${formattedDate}`;
    console.log(url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.code === 400 || data.code === 404) {
        setError(data.msg);
        setShowAlert(true);
        setNasaData({
          title: "",
          date: "",
          imageUrl: "",
          explanation: "",
        });
      } else {
        setNasaData({
          title: data.title,
          date: data.date,
          imageUrl: data.url,
          explanation: data.explanation,
        });
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setError("");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="containerDate">
        <div className="containerInput">
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              slotProps={{
                textField: {
                  variant: "filled",
                  label: (
                    <label className="styledLabel">Ingresa una fecha</label>
                  ),
                },
              }}
            />
            <Button
              className="styledSearchButton"
              onClick={queryNasa}
            >
              <Search />
            </Button>
          </DemoContainer>
        </div>

        {error && (
          <Alert className="styledAlert " severity="error" variant="outlined">
            {error}
          </Alert>
        )}
        {selectedDate && (
          <div id="nasa">
            <h2 className="serchTitle">{nasaData.title}</h2>
            <h4 className="serchSubtitle">{nasaData.date}</h4>
            <div className="containerSearch">
              <img
                className="serchImg"
                src={nasaData.imageUrl}
                alt={nasaData.title}
              />
              <p className="serchText">{nasaData.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};
