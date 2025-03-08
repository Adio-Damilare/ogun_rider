/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import InventoryRecords from "../../component/core/dashboard/InventoryRecords";
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

  const { data: getInstockRecord, isLoading: stockRecordLoading } =
    useGetInstockRecord({
      staff_id: userData?.data?.STAFF_ID,
      region_id: userData?.data?.REGION,
      start_date: "",
      end_date: "",
    });

  const { data: outstoreRecord, isLoading: outstoreRecordLoading } =
    useGetOutstoreRecord({
      staff_id: userData?.data?.STAFF_ID,
      region_id: userData?.data?.REGION,
      start_date: "",
      end_date: "",
    });

  const { data: dashboardData, isLoading: dashboardDataLoading } =
    useGetDashboardData({
      region_id: userData?.data?.REGION,
    });

  const lastSixInflowChartData = formatInflowAndOutflowChartChart(
    dashboardData?.last_six_month_inflow_graph
  );
  const lastSixOutflowChartData = formatInflowAndOutflowChartChart(
    dashboardData?.last_six_month_outflow_graph
  );

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
                  userData={userData}
                  dataCount={{
                    total: {
                      count: formatNaira(dashboardData?.instore_total || 0),
                      loading: dashboardDataLoading,
                    },
                    outstore: {
                      count: outstoreRecord?.length,
                      loading: outstoreRecordLoading,
                    },
                  }}
                />
              </div>
              <div className="col-span-3 flex gap-3 flex-wrap lg:flex-nowrap">
                <div className="border rounded w-full p-3 bg-white">
                  <BarChartStat
                    seriesColor={"#FFDEAD"}
                    legendTitle={["Last Six Month Inflow"]}
                    seriesData={lastSixInflowChartData?.seriesData}
                    xAxisData={lastSixInflowChartData?.xAxis}
                  />
                </div>
                <div className="border rounded w-full p-3 bg-white">
                  <BarChartStat
                    seriesColor={"#7B68EE"}
                    legendTitle={["Last Six Month Outflow"]}
                    seriesData={lastSixOutflowChartData?.seriesData}
                    xAxisData={lastSixOutflowChartData?.xAxis}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <AddStoreCard />
              </div>
            </div>
          </div>
          <div className="md:col-span-1 col-span-3 space-y-5 transition-all duration-300">
            <RecentActivity
              title={"latest inflows"}
              latestData={dashboardData?.latest_inflows}
              isLoading={dashboardDataLoading}
            />
            <RecentActivity
              title={"latest outflows"}
              latestData={dashboardData?.latest_outflows || []}
              isLoading={dashboardDataLoading}
            />
          </div>
        </section>
        <div className="mt-5 flex items-center relative gap-4">
          <h3 className="text-[17px] text-black tracking-[0.5px] leading-[22px]">
            <span>Inventory Record</span>
          </h3>

          <div className="w-full h-[0.1rem] bg-neutral-300 bg-opacity-35 flex-1"></div>
        </div>
        <InventoryRecords userData={userData} />
      </main>
    </>
  );
};

export default Dashboard;
