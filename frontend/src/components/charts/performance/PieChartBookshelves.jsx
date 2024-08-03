import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "./PieChartBookshelves.scss";

const PieChartBookshelves = ({
  countShelves,
  Books,
  BorrowedBooks,
  DonatedBooks,
  Users,
  Comments,
}) => {
  const data = [
    { name: "Bookshelves", value: countShelves },
    { name: "Books", value: Books },
    { name: "Donated Books", value: DonatedBooks },
    { name: "Borrowed Books", value: BorrowedBooks },
    { name: "Users", value: Users },
    { name: "Comments", value: Comments },
  ];

  const COLORS = [
    "#00a6fb",
    "#c77dff",
    "#ff9f1c",
    "#52b788",
    "#81a4cd",
    "#7fdeff",
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30; // Adjust this value for distance
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const labelColor = COLORS[index % COLORS.length];

    return (
      <>
        <text
          x={x}
          y={y}
          fill={labelColor}
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          style={{ fontSize: "16px", fontWeight: "bold" }}
        >
          {`${data[index].name} (${(percent * 100).toFixed(2)}%)`}
        </text>
      </>
    );
  };

  const renderLabelLine = (props) => {
    const { cx, cy, midAngle, outerRadius, index } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x1 = cx + outerRadius * Math.cos(-midAngle * RADIAN);
    const y1 = cy + outerRadius * Math.sin(-midAngle * RADIAN);
    const x2 = cx + radius * Math.cos(-midAngle * RADIAN);
    const y2 = cy + radius * Math.sin(-midAngle * RADIAN);
    const labelColor = COLORS[index % COLORS.length];

    return (
      <path
        d={`M${x1},${y1}L${x2},${y2}`}
        stroke={labelColor}
        fill="none"
        strokeWidth={2}
      />
    );
  };

  return (
    <section
      className="pie-chart-bookshelves pt-5 pb-10"
      style={{ width: "35vw", height: "400px" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            labelLine={renderLabelLine}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <h4 className="box-title text-center py-4">
        Fig.3: Annual Performance Overview{" "}
      </h4>
    </section>
  );
};

export default PieChartBookshelves;
