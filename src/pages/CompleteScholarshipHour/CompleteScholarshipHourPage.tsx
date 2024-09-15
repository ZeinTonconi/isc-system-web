import { Grid } from "@mui/material";
import { events } from "../../data/events";
import CompleteScholarshipHourEventCard from "../../components/cards/CompleteScholarshipHourEventCard";
import { EventStatus } from "../../models/eventInterface";

const CompleteScholarshipHourPage: React.FC = () => {
    const convertedEvents = events.map(event => ({
        ...event,
        status: event.status as EventStatus
    }));

    return (
        <>
            <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center">
                {convertedEvents.map((event, index) => {
                    return (
                        <Grid item xs={12}>
                            <CompleteScholarshipHourEventCard key={index} event={event} />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default CompleteScholarshipHourPage;