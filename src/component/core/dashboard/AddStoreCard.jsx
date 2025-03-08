import CreateInventorySvg from "../../shared/svg_icons/create_inventory";
import CreateInventoryButton from "../../shared/create/CreateInventoryButton";

const AddStoreCard = () => {
  return (
    <div className="flex lg:flex-wrap flex-wrap justify-center gap-x-10 items-center p-5  gap-y-4 border rounded text-center bg-white">
      <div>
        <CreateInventorySvg />
      </div>
      <div className="py-3 flex flex-col gap-y-8 items-center">
        <div className="flex flex-col gap-y-3">
          <h4 className="text-[18px] font-medium tracking-[0.5px] leading-[23px] text-[#1F384C]">
            Manage Inventory
          </h4>
          <p className="text-[12px] tracking-[0.5px] leading-[20px] text-[#000000] opacity-50">
            Seamlessly manage in and out of your inventory.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <CreateInventoryButton />
        </div>
      </div>
    </div>
  );
};

export default AddStoreCard;
