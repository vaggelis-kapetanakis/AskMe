/* import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | false;
  type?: "button" | "reset" | "submit";
};

const Button = ({ children, onClick, disabled, type }: ButtonProps) => {
  return (
    <button
      className="isolate w-auto rounded-lg bg-white/20 transition-transform ease-in
      shadow-lg ring-1 ring-black/5 px-8 py-2 flex items-center justify-center"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
 */

import React, { forwardRef, useMemo } from "react";
import { type VariantProps } from "tailwind-variants";
import { TbLoader } from "react-icons/tb";
import { outlineButton, solidButton, ghostButton } from "./ButtonStyles";

// define all the button attributes
type BaseButtonAttributes = React.ComponentPropsWithoutRef<"button">;

// define the ref type
type Ref = HTMLButtonElement;

// extend the base button attributes
interface ButtonProps extends BaseButtonAttributes {
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  buttonStyle?: VariantProps<typeof solidButton | typeof outlineButton | typeof ghostButton>;
  className?: string;
  buttonVariant?: "solid" | "outline" | "ghost";
}

const Button = forwardRef<Ref, ButtonProps>(({
  type = "button",
  children,
  buttonStyle = {},
  buttonVariant = "solid",
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  ...rest
}, ref) => {
  // determine icon placement
  const { newIcon: icon, iconPlacement } = useMemo(() => {
    let newIcon = rightIcon || leftIcon;

    if (isLoading) {
      newIcon = <TbLoader className="animate-spin" size={25} />;
    }

    return {
      newIcon,
      iconPlacement: rightIcon ? ("right" as const) : ("left" as const),
    };
  }, [isLoading, leftIcon, rightIcon]);

  const renderButtonVariant = () => {
    if (buttonVariant === "solid") {
      return solidButton({ ...buttonStyle, className });
    } else if (buttonVariant === "outline") {
      return outlineButton({ ...buttonStyle, className });
    } else if (buttonVariant === "ghost") {
      return ghostButton({ ...buttonStyle, className });
    }
  };

  return (
    <button
      className={renderButtonVariant()}
      {...rest}
      type={type}
      ref={ref}
      disabled={disabled || isLoading}
    >
      {icon && iconPlacement === "left" && (
        <span className={`inline-flex shrink-0 self-center ${children && !isLoading ? "mr-2" : ""}`}>
          {icon}
        </span>
      )}
      {!isLoading && children}
      {icon && iconPlacement === "right" && (
        <span className={`inline-flex shrink-0 self-center ${children && !isLoading ? "ml-2" : ""}`}>
          {icon}
        </span>
      )}
    </button>
  );
});

export default Button;
