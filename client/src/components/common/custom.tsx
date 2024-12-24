import { cn } from "@/lib/utils";

interface CustomContainerWrapperProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

const CustomContainerWrapper = ({
  children,
  as: WrapperElement = "section",
  className,
}: CustomContainerWrapperProps) => {
  return (
    <WrapperElement
      className={cn("container mx-auto px-8 md:px-6 lg:px-4", className)}
    >
      {children}
    </WrapperElement>
  );
};

export { CustomContainerWrapper };
