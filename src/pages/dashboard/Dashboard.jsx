/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import RecentActivity from "../../component/core/dashboard/RecentActivity";
import MemoTopCards from "../../component/shared/topCards/MemoTopCards";
import CreateInventorySvg from "../../component/shared/svg_icons/create_inventory";
import CreateInventoryButton from "../../component/shared/create/CreateInventoryButton";
import useCurrentUser from "../../hooks/useCurrentUser";
import CreateOutputButton from "../../component/shared/createOutputButton";
import { useGetInstockRecord } from "../../services/API/instock";
import { useGetOutstoreRecord } from "../../services/API/outflow";
import { useGetDashboardData } from "../../services/get_data";
import AddStoreCard from "../../component/core/dashboard/AddStoreCard";
import BarChartStat from "../../component/shared/statistics/BarChartStat";
import { formatNaira } from "../../utils/formatNaira";

const formatInflowAndOutflowChartChart = (flowData) => {
  const seriesData = flowData?.map((item) => ({
    value: parseFloat(item?.TOTAL_INSTORE) || parseFloat(item?.TOTAL_OUTSTORE),
  }));
  const xAxis = flowData?.map(
    (item) =>
      `${new Date(item?.YEAR, item?.MONTH - 1).toLocaleString("en-US", {
        month: "short",
      })} ${item?.YEAR}`
  );

  return {
    seriesData,
    xAxis,
  };
};

const Dashboard = () => {
  const { userData } = useCurrentUser();

  const [selected, setSelected] = useState("all");

  return (
    <>
      <main>
        <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-5 gap-y-2">
          <div className="lg:col-span-2 md:col-span-1 col-span-3">
            <div className="grid grid-cols-3 gap-5 items-stretch">
              <div className="col-span-3">
                <MemoTopCards
                  memos={[]}
                  setSelected={setSelected}
                  userData={[]}
                  dataCount={{
                    
                  }}
                />
              </div>
              <div className="col-span-3 flex gap-3 flex-wrap lg:flex-nowrap">
                <div className="border rounded w-full p-3 bg-white">
                  <BarChartStat
                    seriesColor={"#FFDEAD"}
                    legendTitle={["Last Six Month Inflow"]}
                    seriesData={[]}
                    xAxisData={[]}
                  />
                </div>
                <div className="border rounded w-full p-3 bg-white">
                  <BarChartStat
                    seriesColor={"#7B68EE"}
                    legendTitle={["Last Six Month Outflow"]}
                    seriesData={[]}
                    xAxisData={[]}
                  />
                </div>
              </div>
            
            </div>
          </div>
          <div className="md:col-span-1 col-span-3 space-y-5 transition-all duration-300">
            <RecentActivity
              title={"latest inflows"}
              latestData={[]}
              isLoading={[]}
            />
            <RecentActivity
              title={"latest outflows"}
              latestData={[]|| []}
              isLoading={[]}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
