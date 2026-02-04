'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
  { month: 'Janvier', desktop: 186, mobile: 80 },
  { month: 'Février', desktop: 305, mobile: 200 },
  { month: 'Mars', desktop: 237, mobile: 120 },
  { month: 'Avril', desktop: 73, mobile: 190 },
  { month: 'Mai', desktop: 209, mobile: 130 },
  { month: 'Juin', desktop: 214, mobile: 140 },
  { month: 'Juin', desktop: 214, mobile: 140 },
  { month: 'Juin', desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Ordinateur',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-12))',
  },
} satisfies ChartConfig;

export const BarChartGraph = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Données de Vente</CardTitle>
        <CardDescription>Janvier - Juin 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Affichage du total des produits vendus dans la semaine
        </div>
      </CardFooter>
    </Card>
  );
};
