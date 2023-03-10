import PropTypes from 'prop-types';
import { useState } from 'react';

// @fullcalendar components
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Custom styles for Calendar
import CalendarRoot from './calendar-root.component';

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from 'context';
import CalendarTooltip from 'components/CalendarTooltip/calendar-tooltip.component';
import MDButton from 'components/MDButton';
import Currency from 'components/Currency/currency.component';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

function Calendar({ header, ...rest }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const validClassNames = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'light',
    'dark'
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventClicked, setEventClicked] = useState({ title: '', amount: '' });

  const toggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEventClick = ({ event, el }) => {
    toggle();
    setEventClicked({ event });
  };

  const events = rest.events
    ? rest.events.map((item) => ({
        title: item.merchantName
          ? item.merchantName
          : item.description?.slice(0, 30),
        date: item.dueDate,
        className:
          item.type.toLowerCase() === 'expense' ? `event-info` : 'event-success'
      }))
    : [];

  const renderEvent = (eventInfo) => {
    return (
      <>
        <MDTypography color="inherit">
          <div className="fc-event-title">{eventInfo.event.title}</div>
        </MDTypography>
      </>
    );
  };

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <MDBox pt={header.title || header.date ? 2 : 0} px={2} lineHeight={1}>
          {header.title ? (
            <MDTypography
              variant="h4"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {header.title}
            </MDTypography>
          ) : null}
          {header.date ? (
            <MDTypography
              component="h4"
              variant="button"
              color="text"
              fontWeight="regular"
            >
              {header.date}
            </MDTypography>
          ) : null}
        </MDBox>
        <CalendarRoot p={2} ownerState={{ darkMode }}>
          <FullCalendar
            {...rest}
            selectable
            editable
            plugins={[dayGridPlugin, interactionPlugin]}
            events={events}
            height="100%"
            views={['dayGridMonth', 'dayGridWeek', 'dayGridDay']}
            displayEventTime={false}
            eventContent={renderEvent}
            eventClick={handleEventClick}
            dayMaxEvents={4}
          />
        </CalendarRoot>
      </Card>
    </>
  );
}

// Setting default values for the props of Calendar
Calendar.defaultProps = {
  header: {
    title: '',
    date: ''
  }
};

// Typechecking props for the Calendar
Calendar.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string
  })
};

export default Calendar;
