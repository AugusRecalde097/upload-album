import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";

const TooltipCustom = ({ children, text }) => {

  return (
    <Tooltip title={text}
    slotProps={{
      popper: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -14],
            },
          },
        ],
      },
    }}
    >
      {children}
    </Tooltip>
  )
};

TooltipCustom.propTypes = {
  children: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
}

export default TooltipCustom;