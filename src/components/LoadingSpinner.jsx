import { RotatingLines } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="50"
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
