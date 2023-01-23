import React, { useEffect, useState } from "react";
import { ReactComponent as LogoIcon } from "../../assets/logo.svg";
import { ReactComponent as MoreIcon } from "../../assets/moreBtn.svg";
import { MenuComponentDemo } from "./MenuDemo";
import { Drawer } from "antd";
import { Header } from "../../common/Layout/Header";

export const HeaderComponentDemo = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const drawerSize = document.documentElement.scrollWidth;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', setWindowDimensions);
    return () => {
      window.removeEventListener('resize', setWindowDimensions)
    }
  }, [])


  return (
    <Header>
      <LogoIcon />
      <MoreIcon onClick={showDrawer} style={{ cursor: "pointer" }} />
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        width={drawerSize}
      >
        <MenuComponentDemo onHeaderClose={onClose} />
      </Drawer>
    </Header>
  );
};
