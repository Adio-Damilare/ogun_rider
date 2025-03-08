import { Avatar, AvatarGroupProvider, useAvatarGroup } from "@nextui-org/react";
import { forwardRef } from "react";




const AvatarGroup = forwardRef((props, ref) => {
    const {
      Component,
      clones,
      context,
      remainingCount,
      renderCount = (count) => (
        <Avatar
          name={`+${count}`}
          classNames={{
            base: "bg-[#f83f37] text-white font-[700] text-[10px]",
          }}
        />
      ),
      getAvatarGroupProps,
    } = useAvatarGroup({
      ref,
      ...props,
    });
  
    return (
      <Component {...getAvatarGroupProps()}>
        <AvatarGroupProvider value={context}>
          {clones}
          {remainingCount > 0 && renderCount(remainingCount)}
        </AvatarGroupProvider>
      </Component>
    );
  });
  
  AvatarGroup.displayName = "AvatarGroup";

  export default AvatarGroup