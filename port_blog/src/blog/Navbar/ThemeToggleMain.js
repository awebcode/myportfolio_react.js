import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import ThemeAction from "../../actions/ThemeAction";
import PaletteIcon from "@mui/icons-material/Palette";
import CheckIcon from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import "./thememenu.css";
const mode_settings = [
  {
    id: "light",
    name: "Light",
    background: "light-background",
    class: "theme-mode-light",
  },
  {
    id: "dark",
    name: "Dark",
    background: "dark-background",
    class: "theme-mode-dark",
  },
];

const color_settings = [
  {
    id: "blue",
    name: "Blue",
    background: "blue-color",
    class: "theme-color-blue",
  },
  {
    id: "red",
    name: "Red",
    background: "red-color",
    class: "theme-color-red",
  },
  {
    id: "cyan",
    name: "Cyan",
    background: "cyan-color",
    class: "theme-color-cyan",
  },
  {
    id: "green",
    name: "Green",
    background: "green-color",
    class: "theme-color-green",
  },
  {
    id: "orange",
    name: "Orange",
    background: "orange-color",
    class: "theme-color-orange",
  },
  {
    id: "yellow",
    name: "Yellow",
    background: "yellow-color",
    class: "theme-color-yellow",
  },
];

const clickOutsideRef = (content_ref, toggle_ref) => {
  document.addEventListener("mousedown", (e) => {
    // user click toggle
    if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
      content_ref.current.classList.toggle("active");
    } else {
      // user click outside toggle and content
      if (content_ref.current && !content_ref.current.contains(e.target)) {
        content_ref.current.classList.remove("active");
      }
    }
  });
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
  color: "#000",
};

export default function ThemeToggleMain() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const menu_ref = React.useRef(null);
  const menu_toggle_ref = React.useRef(null);

  clickOutsideRef(menu_ref, menu_toggle_ref);

  const setActiveMenu = () => menu_ref.current.classList.add("active");

  const closeMenu = () => menu_ref.current.classList.remove("active");

  const [currMode, setcurrMode] = React.useState("theme-mode-dark");

  const [currColor, setcurrColor] = React.useState("theme-color-cyan");

  const dispatch = useDispatch();

  const setMode = (mode) => {
    setcurrMode(mode.id);
    localStorage.setItem("themeMode", mode.class);
    dispatch(ThemeAction.setMode(mode.class));
  };

  const setColor = (color) => {
    setcurrColor(color.id);
    localStorage.setItem("colorMode", color.class);
    dispatch(ThemeAction.setColor(color.class));
  };

  React.useEffect(() => {
    const themeClass = mode_settings.find(
      (e) => e.class === localStorage.getItem("themeMode", "theme-mode-light")
    );

    const colorClass = color_settings.find(
      (e) => e.class === localStorage.getItem("colorMode", "theme-mode-light")
    );

    if (themeClass !== undefined) setcurrMode(themeClass.id);

    if (colorClass !== undefined) setcurrColor(colorClass.id);
  }, []);
  return (
    <div>
      <Button onClick={handleOpen}>
        <PaletteIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box">
          <h1 onClick={handleClose} className="handle-close">
            <Close />
          </h1>
          <div className="theme-menu__select">
            <span>Choose mode</span>
            <ul className="mode-list">
              {mode_settings.map((item, index) => (
                <li key={index} onClick={() => setMode(item)}>
                  <div
                    className={`mode-list__color ${item.background} ${
                      item.id === currMode ? "active" : ""
                    }`}
                  >
                    <CheckIcon />
                  </div>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="theme-menu__select">
            <span>Choose color</span>
            <ul className="mode-list">
              {color_settings.map((item, index) => (
                <li key={index} onClick={() => setColor(item)}>
                  <div
                    className={`mode-list__color ${item.background} ${
                      item.id === currColor ? "active" : ""
                    }`}
                  >
                    <CheckIcon />
                  </div>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
