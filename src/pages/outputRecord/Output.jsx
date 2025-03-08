import CreateOutflowButton from "../../component/shared/create-outflow/CreateOutflowButton";
import TopCards from "../../component/shared/topCards/MemoTopCards";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetOutstoreRecord } from "../../services/API/outflow";
import OutputRecordTable from "./OutputRecordTable";

const OutputRecord = () => {
  const { userData } = useCurrentUser();

  const { data, isLoading: isLoading } = useGetOutstoreRecord({
    staff_id: userData?.data?.STAFF_ID,
    region_id: userData?.data?.REGION,
    start_date: "",
    end_date: "",
  });

  return (
    <>
      <main>
        <TopCards
          grid={4}
          dataCount={{
            outstore: {
              count: data?.length,
              loading: isLoading,
            },
          }}
        />
        <div className="flex justify-end mt-3">
          <CreateOutflowButton />
        </div>
        <OutputRecordTable userData={userData} />
      </main>
    </>
  );
};

export default OutputRecord;
