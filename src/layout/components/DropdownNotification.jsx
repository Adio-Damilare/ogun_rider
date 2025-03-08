import { useEffect, useMemo, useRef, useState } from "react";
import useNotification from "../../hooks/useNotification";
import useGetNotificationData from "../../hooks/useGetNotificationData";
import { useSeenNotification } from "../../services/API/notification";
import useCurrentUser from "../../hooks/useCurrentUser";
import { toStringDate } from "../../utils/utilities";
import { Link } from "react-router-dom";
import { BsBellFill } from "react-icons/bs";
import { cn, } from "@nextui-org/react";
import { BiQuestionMark, BiUser } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { Avatar, Button } from "antd";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useViewMemoHook } from "../../hooks/useViewMemoHook";


const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data } = useNotification();
  const { getAvailableNotification } = useGetNotificationData();
  const { mutateAsync: seenNotification } = useSeenNotification();
  const { userData } = useCurrentUser();
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const { handleOpenMemo } = useViewMemoHook()

  const { treated_requests, awaiting_approval } = data || {
    data: { treated_requests: [], awaiting_approval: [] },
  };

  const treated = useMemo(() => {
    const datas = treated_requests?.map((app) => {
      app.dateTreated = app?.DATE_TREATED
        ? toStringDate(app?.DATE_TREATED)
        : null;
      app.title = app?.IS_APPROVED
        ? `Approved`
        : `Declined`;
      app.isAwaiting = false;
      return app;
    });

    return datas;
  }, [treated_requests]);

  const awaiting = useMemo(() => {
    const datas = awaiting_approval?.map((app) => {
      app.title = `${app?.SUBJECT || "Memo"} `;
      app.isAwaiting = true;
      app.requestDate = app?.REQUEST_DATE
        ? toStringDate(app?.REQUEST_DATE)
        : null;
      return app;
    });

    return datas;
  }, [awaiting_approval]);



  const handleSeen = async (reqId) => {
    const json = {
      memo_id: reqId,
      staff_id: userData?.data?.STAFF_ID,
    };
    try {
      const res = await seenNotification(json);
      if (res) {
        console.log(res);
        getAvailableNotification();
      }
    } catch (error) {
      console.log(error);
    }
  };


  const openDrawer = async (memo) => {
    // console.log(memo)
    handleOpenMemo({memo: {...memo}, is_approve:memo?.is_approved})
     await handleSeen(memo?.MEMO_ID)
  };





  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative text-gray-600">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className=" relative"
      >
        <div className="p-1 flex items-center rounded-lg cursor-pointer">
          <BsBellFill
            color="grey"
            size={21}
            className="font-medium text-gray-100"
          />
          <div className={cn(" absolute h-3 w-5 rounded-full bg-[#0f2c1aaa] flex items-center justify-center -right-2 top-[0.4rem] border border-gray-100",(treated_requests?.length + awaiting_approval?.length) === 0 && "hidden")}>
            <span className="flex items-center justify-center text-[0.57rem] font-bold text-white">
              {treated_requests?.length + awaiting_approval?.length}
            </span>
          </div>
        </div>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute md:-right-27 right-0 z-[555]  mt-2.5 flex h-96 max-h-90 w-[19rem] flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto px-2">
          {treated?.map((tappr) => (
            <li key={tappr?.MEMO_ID}>
              <div className="flex flex-col border-t px-4.5 py-3 ">
                <div className="flex gap-2 justify-between items-start">
                  {tappr?.IS_APPROVED ? (
                    <Avatar icon={<IoCheckmarkSharp size={15} />} className="bg-green-500" />
                  ) : (
                    <Avatar icon={<ImCancelCircle />} className="bg-red-400" />
                  )}
                  <div className="flex flex-col flex-1 truncate">
                    <span className="truncate font-bold text-sm">{tappr?.title}</span>
                    <span className="truncate text-xs mb-1">{tappr?.SUBJECT}</span>
                    <span className=" text-default-400 text-xs">
                      {tappr?.dateTreated}
                    </span>
                  </div>
                  <Button
                    onClick={() =>
                      openDrawer(
                        {
                          MEMO_ID:tappr?.MEMO_ID,
                          is_approved: false
                        }
                       
                      )
                    }
                    size="sm"
                    className="bg-btnColor text- w-14 rounded-lg"
                  >
                    View
                  </Button>
                </div>
              </div>
            </li>
          ))}
          {awaiting?.map((tappr) => (
            <li key={tappr?.REQUEST_ID}>
              <div className="flex flex-col border-t px-4.5 py-3 ">
                <div className="flex gap-2 justify-between items-start">
                  <Avatar
                    icon={<BiQuestionMark />}
                    className="bg-default-600"
                  />
                  <div className="flex flex-col flex-1 truncate">
                    <span className="truncate font-bold text-sm">{tappr?.title}</span>
                    <span className=" text-default-400 text-xs">
                      {tappr?.requestDate}
                    </span>
                    <div className="flex gap-1 mt-1 items-center">
                        <Avatar
                        size="small"
                        icon={<BiUser />}
                        className="bg-default-500"
                      />
                      <span className="text-default-500 text-xs truncate">
                        {tappr?.LAST_NAME} {tappr?.FIRST_NAME}
                      </span>
                    </div>
                  </div>
                  <Button
              
                    onClick={() =>
                      openDrawer({
                        MEMO_ID:tappr?.MEMO_ID,
                        is_approved: true
                      }
                      )
                    }
                    size="sm"
                    type="primary"
                    className="bg-[#5A6ACF] w-14 shadow-none rounded-lg"
                  >
                    Treat
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {treated_requests?.length + awaiting_approval?.length ? (
          <div className="flex flex-col  mt-auto py-2">
            <div className="flex items-center justify-center">
              <Link
                to={"/my-approval"}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <button className="border border-gray-400 px-10 py-1  mx-10 rounded-full text-[0.9rem] hover:shadow active:border-gray-800 flex items-center gap-2 justify-center">
                  <span> View More</span>
                </button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DropdownNotification;
