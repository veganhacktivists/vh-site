import BaseButton from "./baseButton";
import { IButton } from "./buttons";

//TODO: define secondary button classes

const SecondaryButton: React.FC<IButton> = (props) => {

    const {
        linkUrl
    } = props;
  
    return (
      <BaseButton linkUrl={linkUrl} style="bg-fuchsia hover:bg-strawberry border-l-8 border-strawberry py-2 transition-transform">
          {props.children}
      </BaseButton>
    );
};
  
export default SecondaryButton;