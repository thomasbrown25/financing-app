import PropTypes from 'prop-types';

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
    console.log(eventInfo);
    return (
      <>
        <CalendarTooltip
          title={
            <MDTypography color="inherit">
              {eventInfo.event.title} {eventInfo.event.dueDate}
            </MDTypography>
          }
        >
          <div className="fc-event-title">{eventInfo.event.title}</div>
        </CalendarTooltip>
      </>
    );
  };

  return (
    <Card sx={{ height: '100%' }}>
      <MDBox pt={header.title || header.date ? 2 : 0} px={2} lineHeight={1}>
        {header.title ? (
          <MDTypography
            variant="h6"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {header.title}
          </MDTypography>
        ) : null}
        {header.date ? (
          <MDTypography
            component="p"
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
        />
      </CalendarRoot>
    </Card>
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
