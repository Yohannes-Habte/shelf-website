import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UsersChart = () => {
  const data = [
    {
      month: "January",
      books: 14,
      donatedBooks: 15,
      borrowedBook: 2,
    },
    {
      month: "February",
      books: 23,
      donatedBooks: 16,
      borrowedBook: 2,
    },
    {
      month: "March",
      books: 34,
      donatedBooks: 12,
      borrowedBook: 2,
    },
    {
      month: "April",
      books: 13,
      donatedBooks: 12,
      borrowedBook: 21,
    },
    {
      month: "May",
      books: 31,
      donatedBooks: 13,
      borrowedBook: 2,
    },
    {
      month: "June",
      books: 14,
      donatedBooks: 14,
      borrowedBook: 5,
    },
    {
      month: "July",
      books: 31,
      donatedBooks: 15,
      borrowedBook: 7,
    },

    {
      month: "August",
      books: 41,
      donatedBooks: 31,
      borrowedBook: 12,
    },

    {
      month: "September",
      books: 51,
      donatedBooks: 31,
      borrowedBook: 16,
    },

    {
      month: "October",
      books: 31,
      donatedBooks: 21,
      borrowedBook: 20,
    },

    {
      month: "November",
      books: 61,
      donatedBooks: 21,
      borrowedBook: 12,
    },

    {
      month: "December",
      books: 90,
      donatedBooks: 41,
      borrowedBook: 20,
    },
  ];
  return (
    <section className="users-chart-container">
      <h4 className="chart-title"> Users Bar Chart </h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={15}>
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffefd5",
              borderRadius: "5px",
              color: "dark",
            }}
            labelStyle={{ display: "none" }}
            cursor={{ fill: "none" }}
          />

          <Bar dataKey="books" fill="#8884d8" />
          <Bar dataKey="donatedBooks" fill="#82ca9d" />
          <Bar dataKey="borrowedBook" fill="#a2d2ff" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default UsersChart;
