import { chakra } from "@chakra-ui/react";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

const ThumbBar = chakra("div", {
  baseStyle: {},
});

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    width: "8px",
    backgroundColor: "#A0AEC0",
  };
  return <ThumbBar style={{ ...style, ...thumbStyle }} {...props} />;
};

const AppScrollbar = (props) => (
  <Scrollbars
    autoHide
    autoHideTimeout={500}
    autoHideDuration={200}
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

export default chakra(AppScrollbar, {
  baseStyle: {
    // width: "100%",
    // height: "100%",
  },
});
