
import { useDeviceInfo } from "@/hooks/use-mobile";
import ExerciseDialogMain from "./dialog/ExerciseDialogMain";

// Create a higher-order component to add responsive props
const ResponsiveExerciseDialog = (props) => {
  const deviceInfo = useDeviceInfo();
  
  return (
    <ExerciseDialogMain 
      {...props} 
      deviceInfo={deviceInfo} 
      fullScreen={deviceInfo.isMobile || deviceInfo.isTablet}
    />
  );
};

export { ResponsiveExerciseDialog as ExerciseDialog };
export default ResponsiveExerciseDialog;
