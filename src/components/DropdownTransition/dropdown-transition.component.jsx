import { Transition } from 'react-transition-group';
import MDBox from 'components/MDBox';

const DropdownTransition = ({ children, visible }) => {
  const transitionStyles = {
    entering: { height: 'auto', opacity: 1 },
    entered: { height: 'auto', opacity: 1 },
    exiting: { height: '0', opacity: 0 },
    exited: { height: '0', opacity: 0 }
  };

  const duration = 150;

  const defaultStyle = {
    transition: `all ${duration}ms ease-in`,
    opacity: 0,
    height: 0
  };

  return (
    <Transition in={visible} timeout={duration}>
      {(state) => (
        <MDBox
          mb={0}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          {children}
        </MDBox>
      )}
    </Transition>
  );
};

export default DropdownTransition;
