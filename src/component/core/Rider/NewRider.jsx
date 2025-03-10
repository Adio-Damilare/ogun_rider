import { createElement } from "react";
import {
  TbList,
  TbSettings,
  TbTemplate,
  TbCheck,
} from "react-icons/tb";
import { BiSolidUser } from "react-icons/bi";
import { LuCombine,  } from "react-icons/lu";
import { cn, Drawer, DrawerContent } from "@heroui/react";
import { FaPhoneAlt,FaBriefcase,FaCreditCard } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";
import { BiIdCard } from "react-icons/bi";
import PropTypes from "prop-types";
import riderStore from "@/hooks/newRider.js";
import Personal from "@/component/core/Rider/Personal.jsx";
import Nationality from "@/component/core/Rider/Nationality";
import Contact from "@/component/core/Rider/Contact";
import Work from "@/component/core/Rider/Work";
import Identity from "@/component/core/Rider/Identity";

const steps = [
  {
    key: "personal",
    title: "Personal ",
    icon: <BiSolidUser size="18" />,
    element: Personal,
  },
  {
    key: "nationality",
    title: "Nationality",
    icon: <BiIdCard size="18" />,
    element: Nationality,
  },
  {
    key: "contact",
    title: "Contact Details",
    icon: <FaPhoneAlt size="18" />,
    element: Contact,
  },
  {
    key: "work",
    title: "Work Detail's",
    icon: <FaBriefcase size="18" />,
    element: Work
  },
  {
    key: "identity",
    title: "Identity",
    icon: <HiIdentification size="18" />,
    element: Identity
  },
  {
    key: "payment",
    title: "Payment",
    icon: <FaCreditCard size="18" />,
    element: <></>,
  },
  {
    key: "payment-confirmation",
    title: "Payment Confirmation",
    icon: <FaCreditCard size="18" />,
    element: <></>,
  },
].filter((i) => !i.disabled);

const NewRider = () => {
    const step = riderStore((state) => state.data.step);
    const isOpen = riderStore((state) => state.data.isOpen);
    const updateData = riderStore((state) => state.updateData);

    const current = steps.find((s) => s.key === step);

  const gotoNextStep = (key) => {
    // if (key) return updateRidertore({ step: key });
    // const index = steps.findIndex((s) => s.key === step);
    // const next = steps[index + 1];
    // if (next) return updateRidertore({ step: next.key });
    // handleClose();
  };

  const gotoPreviousStep = () => {
    // const index = steps.findIndex((s) => s.key === step);
    // const prev = steps[index - 1];
    // if (prev) updateRidertore({ step: prev.key });
  };

  const handleClose = () => {
    updateData({ isOpen: false });
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={()=>{}}
      hideCloseButton
      classNames={{ base: "w-[900px]" }}
    >
      <DrawerContent className="grid grid-cols-[250px_1fr] h-full w-[900px] max-w-[auto] p-0">
        <div className="border-r border-default-200 dark:border-default-100 py-9 px-10 h-full bg-[#f4f5f6] dark:bg-[#0b161f]">
          <Stepper
            current={step}
            steps={steps}
            onChange={(key) => updateRidertore({ step: key })}
            classNames={{ circle: "ring-[#f4f5f6] dark:ring-[#0b161f]" }}
          />
        </div>
        {!!current && (
          <div className="flex flex-col overflow-y-auto h-full">
            {createElement(current.element, {
              onNext: gotoNextStep,
              onPrev: gotoPreviousStep,
              onClose: handleClose,
            })}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default NewRider;


const Stepper = ({ current, steps, classNames = {}, onChange, isClickable }) => {
  const index = steps.findIndex((s) => s.key === current);

  return (
    <div className={cn('relative select-none', classNames.base)}>
      <div className="absolute h-[95%] top-1/2 -translate-y-1/2 border-s border-default-200 left-[18px]"></div>
      <ol className="relative space-y-6">
        {steps?.map((step, i) => {
          const isDone = index > i;
          const isCurrent = current === step.key;
          return (
            <li
              key={step.key}
              onClick={() => isClickable && onChange?.(step.key)}
              className={cn('flex items-center cursor-pointer transition-all duration-300', {
                'text-default-400 hover:text-default-600': current !== step.key,
                'text-default-800': isCurrent || isDone,
                'pointer-events-none': !isClickable,
              })}
            >
              <div>
                <span
                  className={cn(
                    'relative flex items-center justify-center w-[36px] h-[36px] mr-4',
                    'bg-default-200 rounded-full ring-4 ring-white dark:ring-default-50 dark:bg-default-100 transition-all duration-300',
                    { '!bg-success-200': isDone },
                    { '!bg-warning-200': isCurrent },
                    classNames.circle
                  )}
                >
                  {isDone ? <TbCheck size="16" /> : step.icon}
                </span>
              </div>
              <div>
                <h3 className={cn('leading-none text-sm', { 'font-semibold': current === step.key })}>{step.title}</h3>
                {!!step.description && <p className="text-md leading-tight mt-1.5 opacity-70">{step.description}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

Stepper.propTypes = {
  current: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.element,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  classNames: PropTypes.shape({
    base: PropTypes.string,
    circle: PropTypes.string,
  }),
  isClickable: PropTypes.bool,
};


