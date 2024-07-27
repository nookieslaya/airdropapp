import { useState, useEffect } from "react";
import moment from "moment";

const Countdown = ({ date, className }) => {
    const [countdown, setCountdown] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = moment();
            const targetDate = moment(date);
            const diff = targetDate.diff(now);

            const duration = moment.duration(diff);
            const days = duration.days();
            const hours = duration.hours();
            const minutes = duration.minutes();
            // const seconds = duration.seconds();

            setCountdown(`${days} days, ${hours} hours ${minutes} minutes`);
        }, 1000);

        return () => clearInterval(interval);
    }, [date]);

    return <div className={`text-orb ${className}`}>{countdown}</div>;
};

export default Countdown;