import { Activity, DollarSign, Package, Users } from 'lucide-react';
import { BarChartGraph } from './BarChart';
import { ProductDataTable } from './DataTable';
import { PieChartGraph } from './PieChart';
import { StatCard } from './StatCard';
import { useDashboardContext } from '../context/useDashboardContext';

export const MainDashboard = () => {
  const { productTotalNumber, productOnOrderTotalNumber } = useDashboardContext();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={productTotalNumber}
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          description="+20.1% from last month"
        />
        <StatCard
          title="Sales"
          value={productOnOrderTotalNumber}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          description="+180.1% from last month"
        />
        <StatCard
          title="New Customers"
          value="2350"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="+25 from last month"
        />
        <StatCard
          title="Active Now"
          value="573"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          description="+201 since last hour"
        />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
            <ProductDataTable />
        </div>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            <BarChartGraph />
            <PieChartGraph />
        </div>
      </div>
    </main>
  );
};
