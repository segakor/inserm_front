import React, { useEffect, useState } from "react";
import { ReactComponent as LogoIcon } from "../../assets/logo.svg";
import { ReactComponent as MoreIcon } from "../../assets/moreBtn.svg";
import { MenuComponent } from "./Menu";
import { Drawer } from "antd";
import { useAuthCheck } from "../hooks/useAuthCheck";
import { Header } from "../../common/Layout/Header";

export const HeaderComponent = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const drawerSize = document.documentElement.scrollWidth;

  const { auth } = useAuthCheck();

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
      {auth ? (
        <>
          <MoreIcon onClick={showDrawer} style={{ cursor: "pointer" }} />
          <Drawer
            placement="right"
            onClose={onClose}
            open={open}
            width={drawerSize}
          >
            <MenuComponent onHeaderClose={onClose} />
          </Drawer>
        </>
      ) : (
        <></>
      )}
    </Header>
  );
};
