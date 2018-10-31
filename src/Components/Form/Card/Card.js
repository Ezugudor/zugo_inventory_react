export const FormCard = props => (
  <div className="card">
    <div className="card__box">
      <div className="card__body">
        <span>{props.type.name}</span>
      </div>
      <div className="card__footer">
        <a className="btn btn-text">100 Response</a>
      </div>
    </div>
  </div>
);
