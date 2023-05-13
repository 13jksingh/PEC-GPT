import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme2";
import { useTheme } from "@mui/material";

const PieChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(data);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "pastel1" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      // legends={[
      //   {
      //     anchor: "bottom",
      //     direction: "column",
      //     justify: false,
      //     translateX: 400,
      //     translateY: 100,
      //     itemsSpacing: 7,
      //     itemWidth: 10,
      //     itemHeight: 21,
      //     itemTextColor: "#999",
      //     itemDirection: "left-to-right",
      //     itemOpacity: 1,
      //     symbolSize: 13,
      //     symbolShape: "circle",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: "#000",
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
};

export default PieChart;