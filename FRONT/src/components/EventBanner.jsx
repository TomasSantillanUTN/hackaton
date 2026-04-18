// Banner de evento y mensajes
export function EventBanner({ event, message }) {
  return (
    <div className="event-banner">
      {event.name && (
        <div className="event-info">
          <span className="event-name">{event.name}</span>
          {event.description && (
            <span className="event-description">{event.description}</span>
          )}
        </div>
      )}
      {message && <div className="message">{message}</div>}
    </div>
  );
}
