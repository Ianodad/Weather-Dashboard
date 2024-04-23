import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import useSkySiteStore from "@store";

const ResponsiveGridLayout = WidthProvider(Responsive);
export const MainContent = () => {
  const [state] = useSkySiteStore((state) => [state]);
  // eslint-disable-next-line no-unused-vars
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const responsiveProps = {
    className: "responsive-grid",
    breakpoints: { lg: 1200, md: 960, sm: 720, xs: 480, xxs: 0 },
    cols: { lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 },
    layouts: {
      lg: [
        { i: "a", x: 0, y: 0, w: 2, h: 4 },
        { i: "b", x: 3, y: 4, w: 1, h: 2 },
        { i: "c", x: 2, y: 0, w: 1, h: 2 },
      ],
      md: [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 3, y: 4, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      sm: [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      xs: [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      xxs: [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 2, h: 4 },
        { i: "c", x: 2, y: 0, w: 1, h: 5 },
      ],
      // More layouts for other breakpoints...
    },
  };
  console.log(state);
  return (
    <div className="bg-white p-4">
      <ResponsiveGridLayout {...responsiveProps}>
        <div className="bg-purple-500" key="a">
          a
        </div>
        <div className="bg-green-500" key="b">
          b
        </div>
        <div className="bg-yellow-500" key="c">
          c
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};
