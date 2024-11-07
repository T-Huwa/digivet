import PropTypes from "prop-types";
import { Box, Paper, Card, CardHeader } from "@mui/material";
import Chart, { useChart } from "@/Components/chart";
import { fNumber } from "@/utils/format-number";

export default function AppRegistrationRates({
    title = "Animal Registration Rates",
    subheader,
    chart,
    ...other
}) {
    const { colors, series, options } = chart;

    // Get registration rates as series data
    const chartSeries = series.map((item) => item.value);

    const chartOptions = useChart({
        colors,
        tooltip: {
            marker: { show: false },
            y: {
                formatter: (value) => fNumber(value),
                title: {
                    formatter: () => "",
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "28%",
                borderRadius: 2,
            },
        },
        xaxis: {
            categories: series.map((item) => item.label), // Animal types as labels
        },
        ...options,
    });

    return (
        <Paper elevation={4}>
            <Card {...other}>
                <CardHeader title={title} subheader={subheader} />

                <Box sx={{ mx: 3 }}>
                    <Chart
                        dir="ltr"
                        type="bar"
                        series={[{ data: chartSeries }]}
                        options={chartOptions}
                        width="100%"
                        height={364}
                    />
                </Box>
            </Card>
        </Paper>
    );
}

AppRegistrationRates.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chart: PropTypes.shape({
        colors: PropTypes.array,
        series: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string, // Animal type
                value: PropTypes.number, // Registration rate
            })
        ),
        options: PropTypes.object,
    }),
};
