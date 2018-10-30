export const Members = props => (
  <section className="section__members">
    <table className="members">
      <thead className="members__head-box">
        <tr className="members__head">
          <th>Name</th>
          <th>User Role</th>
          <th>Current Branch</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="member__body">
        <tr className="member">
          <td>Ossaija Thankgod</td>
          <td>Admin</td>
          <td>Apapa</td>
          <td>
            <a className="member__control">
              <span className="member__tooltip">Change Branch</span>
              <span className="member__icon member__icon--edit"></span>
            </a>
            <a className="member__control">
              <span className="member__tooltip">Delete</span>
              <span className="member__icon member__icon--delete"></span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
)