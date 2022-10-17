import { Box, Paper, Typography, Button } from "@mui/material";
import Tick from "@mui/icons-material/Check";
// import DoubleTick from "@mui/icons-material/CheckCircle";
import Delete from "@mui/icons-material/Delete";
import React,{ useState } from "react";

const Message = ({ message,me }) => {
  let { text, statut, date, sender } = message;
  date = new Date(date);
  date = date.toLocaleDateString();
  const [option, setOption] = useState(false);
  const handelOption = () => {
    setOption(!option);
  };
  const closeContextMenu = () => {
    if (option) handelOption();
  };
  document.addEventListener("click", () => closeContextMenu());

  return (
    <Box
      style={{
        width: "100%",
        display: "block",
        float: "left",
      }}
    >
      <Box
        className={sender === me ? "message me" : "message notme"}
        onContextMenu={handelOption}
      >
        <span className="date">
            { statut === "send" ? (
              <Tick fontSize='small' className='check-icon' />
            ) : statut === "recieved" ? (
              <>
                <Tick fontSize='small' className='check-icon recieved' />
                <Tick fontSize='small' className='check-icon recieved' />
              </>
            ) : (
              <>
                <Tick fontSize='small' className='check-icon' />
              </>
            )}
            {"  "+ date}
          </span>
        <Typography>
          {text}
        </Typography>
        {option ? (
          <Paper className="menu">
            <Button className="element">
              Delete <Delete fontSize="small" className="icon" />
            </Button>
            {/* <Button className="element">
              Delete <Delete fontSize="small" className="icon" />
            </Button> */}
          </Paper>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};
export default Message;
